/**
 * ============================================
 * OURLABS — Pengumpulan Tugas
 * Google Apps Script Backend
 * ============================================
 *
 * SETUP:
 * 1. Buka Google Sheet yang berisi data_siswa dan data_tugas
 * 2. Pastikan sheet "data_siswa" punya header: nama, kelas
 * 3. Pastikan sheet "data_tugas" punya header: mapel, judul_tugas, kelas
 * 4. Buka Extensions > Apps Script
 * 5. Copy-paste seluruh kode ini ke Code.gs
 * 6. Ganti CONFIG.SPREADSHEET_ID dan CONFIG.DRIVE_FOLDER_ID
 * 7. Deploy > New deployment > Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 8. Copy URL deployment, paste ke variabel SCRIPT_URL di tugas_page/index.html
 *
 * STRUKTUR SHEET:
 * ┌─────────────────────────────────────────────────────────┐
 * │ Sheet: data_siswa                                       │
 * │ Kolom: nama | kelas                                     │
 * ├─────────────────────────────────────────────────────────┤
 * │ Sheet: data_tugas                                       │
 * │ Kolom: mapel | judul_tugas | kelas                      │
 * ├─────────────────────────────────────────────────────────┤
 * │ Sheet: rekap_tugas (otomatis dibuat oleh script)        │
 * │ Kolom: timestamp | nama | kelas | mapel | judul_tugas   │
 * │        | nama_file | link_file                          │
 * └─────────────────────────────────────────────────────────┘
 *
 * STRUKTUR FOLDER GOOGLE DRIVE:
 * 📁 [Root Folder]
 *   └── 📁 [Mapel]
 *       └── 📁 [Judul Tugas]
 *           └── 📁 [Kelas]
 *               └── 📄 NamaSiswa_NamaFile.ext
 */

// =============================================
// KONFIGURASI — GANTI SESUAI MILIKMU
// =============================================
const CONFIG = {
  SPREADSHEET_ID: 'GANTI_DENGAN_ID_SPREADSHEET',
  DRIVE_FOLDER_ID: 'GANTI_DENGAN_ID_FOLDER_DRIVE',
  SHEET_SISWA: 'data_siswa',
  SHEET_TUGAS: 'data_tugas',
  SHEET_REKAP: 'rekap_tugas',
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
};

// =============================================
// HANDLER UTAMA
// =============================================

/**
 * Handle GET requests
 * Actions: getMapelTugas, getKelas, getSiswa, getRekap
 */
function doGet(e) {
  try {
    const action = e.parameter.action;
    let result;

    switch (action) {
      case 'getMapelTugas':
        result = getMapelTugas();
        break;
      case 'getKelas':
        result = getKelasList();
        break;
      case 'getSiswa':
        result = getSiswaByKelas(e.parameter.kelas);
        break;
      case 'getRekap':
        result = getRekap(
          e.parameter.mapel,
          e.parameter.tugas,
          e.parameter.kelas
        );
        break;
      default:
        result = { success: false, error: 'Action tidak valid: ' + action };
    }

    return sendJson(result);
  } catch (err) {
    return sendJson({ success: false, error: err.message });
  }
}

/**
 * Handle POST requests (file upload)
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const result = uploadTugas(data);
    return sendJson(result);
  } catch (err) {
    return sendJson({ success: false, error: err.message });
  }
}

/**
 * Helper: Return JSON response with CORS headers
 */
function sendJson(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}

// =============================================
// FUNGSI DATA
// =============================================

/**
 * Ambil daftar mapel, tugas, dan kelas dari sheet data_tugas
 * Return: { success: true, data: { "Mapel A": { "Tugas 1": ["XI RPL 1", "XI RPL 2"], ... }, ... } }
 */
function getMapelTugas() {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = ss.getSheetByName(CONFIG.SHEET_TUGAS);

  if (!sheet) {
    return { success: false, error: 'Sheet "' + CONFIG.SHEET_TUGAS + '" tidak ditemukan' };
  }

  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) {
    return { success: true, data: {} };
  }

  // Header: mapel, judul_tugas, kelas
  const headers = data[0].map(function (h) { return h.toString().toLowerCase().trim(); });
  const mapelIdx = headers.indexOf('mapel');
  const tugasIdx = headers.indexOf('judul_tugas');
  const kelasIdx = headers.indexOf('kelas');

  if (mapelIdx === -1 || tugasIdx === -1 || kelasIdx === -1) {
    return { success: false, error: 'Header "mapel", "judul_tugas", atau "kelas" tidak ditemukan di sheet data_tugas' };
  }

  // Struktur: { mapel: { judul_tugas: [kelas1, kelas2, ...] } }
  var grouped = {};
  for (var i = 1; i < data.length; i++) {
    var mapel = data[i][mapelIdx].toString().trim();
    var tugas = data[i][tugasIdx].toString().trim();
    var kelas = data[i][kelasIdx].toString().trim();
    if (mapel && tugas && kelas) {
      if (!grouped[mapel]) {
        grouped[mapel] = {};
      }
      if (!grouped[mapel][tugas]) {
        grouped[mapel][tugas] = [];
      }
      if (grouped[mapel][tugas].indexOf(kelas) === -1) {
        grouped[mapel][tugas].push(kelas);
      }
    }
  }

  return { success: true, data: grouped };
}

/**
 * Ambil daftar kelas unik dari sheet data_siswa
 * Return: { success: true, data: ["XI RPL 1", "XI RPL 2", ...] }
 */
function getKelasList() {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = ss.getSheetByName(CONFIG.SHEET_SISWA);

  if (!sheet) {
    return { success: false, error: 'Sheet "' + CONFIG.SHEET_SISWA + '" tidak ditemukan' };
  }

  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) {
    return { success: true, data: [] };
  }

  const headers = data[0].map(function (h) { return h.toString().toLowerCase().trim(); });
  const kelasIdx = headers.indexOf('kelas');

  if (kelasIdx === -1) {
    return { success: false, error: 'Header "kelas" tidak ditemukan di sheet data_siswa' };
  }

  var kelasSet = [];
  for (var i = 1; i < data.length; i++) {
    var kelas = data[i][kelasIdx].toString().trim();
    if (kelas && kelasSet.indexOf(kelas) === -1) {
      kelasSet.push(kelas);
    }
  }

  kelasSet.sort();
  return { success: true, data: kelasSet };
}

/**
 * Ambil daftar siswa berdasarkan kelas
 * Return: { success: true, data: ["Ahmad", "Budi", ...] }
 */
function getSiswaByKelas(kelas) {
  if (!kelas) {
    return { success: false, error: 'Parameter "kelas" diperlukan' };
  }

  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = ss.getSheetByName(CONFIG.SHEET_SISWA);

  if (!sheet) {
    return { success: false, error: 'Sheet "' + CONFIG.SHEET_SISWA + '" tidak ditemukan' };
  }

  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) {
    return { success: true, data: [] };
  }

  const headers = data[0].map(function (h) { return h.toString().toLowerCase().trim(); });
  const namaIdx = headers.indexOf('nama');
  const kelasIdx = headers.indexOf('kelas');

  if (namaIdx === -1 || kelasIdx === -1) {
    return { success: false, error: 'Header "nama" atau "kelas" tidak ditemukan' };
  }

  var siswaList = [];
  for (var i = 1; i < data.length; i++) {
    var rowKelas = data[i][kelasIdx].toString().trim();
    var rowNama = data[i][namaIdx].toString().trim();
    if (rowKelas === kelas && rowNama) {
      siswaList.push(rowNama);
    }
  }

  siswaList.sort();
  return { success: true, data: siswaList };
}

/**
 * Ambil rekap pengumpulan tugas
 * Return: { success: true, data: { siswa: [...], rekap: [...] } }
 */
function getRekap(mapel, tugas, kelas) {
  if (!mapel || !tugas || !kelas) {
    return { success: false, error: 'Parameter mapel, tugas, dan kelas diperlukan' };
  }

  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);

  // Ambil daftar siswa di kelas
  const siswaResult = getSiswaByKelas(kelas);
  if (!siswaResult.success) return siswaResult;
  const allSiswa = siswaResult.data;

  // Ambil data rekap
  const rekapSheet = ss.getSheetByName(CONFIG.SHEET_REKAP);
  var rekapMap = {};

  if (rekapSheet) {
    const rekapData = rekapSheet.getDataRange().getValues();
    if (rekapData.length > 1) {
      const headers = rekapData[0].map(function (h) { return h.toString().toLowerCase().trim(); });
      const tIdx = headers.indexOf('timestamp');
      const nIdx = headers.indexOf('nama');
      const kIdx = headers.indexOf('kelas');
      const mIdx = headers.indexOf('mapel');
      const jIdx = headers.indexOf('judul_tugas');
      const fIdx = headers.indexOf('nama_file');
      const lIdx = headers.indexOf('link_file');

      for (var i = 1; i < rekapData.length; i++) {
        var row = rekapData[i];
        if (
          row[mIdx].toString().trim() === mapel &&
          row[jIdx].toString().trim() === tugas &&
          row[kIdx].toString().trim() === kelas
        ) {
          var nama = row[nIdx].toString().trim();
          // Simpan yang terbaru (index lebih besar = lebih baru)
          rekapMap[nama] = {
            timestamp: row[tIdx],
            nama_file: row[fIdx].toString(),
            link_file: row[lIdx].toString(),
          };
        }
      }
    }
  }

  // Gabungkan: semua siswa + status pengumpulan
  var result = [];
  for (var j = 0; j < allSiswa.length; j++) {
    var nama = allSiswa[j];
    var submitted = rekapMap[nama];
    result.push({
      nama: nama,
      sudah: !!submitted,
      timestamp: submitted ? submitted.timestamp : null,
      nama_file: submitted ? submitted.nama_file : null,
      link_file: submitted ? submitted.link_file : null,
    });
  }

  var totalSudah = result.filter(function (r) { return r.sudah; }).length;

  return {
    success: true,
    data: {
      rekap: result,
      total_siswa: allSiswa.length,
      total_sudah: totalSudah,
    },
  };
}

// =============================================
// UPLOAD TUGAS
// =============================================

/**
 * Upload file tugas ke Google Drive dan catat di sheet rekap
 * Expects: { nama, kelas, mapel, judul_tugas, fileName, fileData (base64), mimeType }
 */
function uploadTugas(data) {
  // Validasi
  if (!data.nama || !data.kelas || !data.mapel || !data.judul_tugas) {
    return { success: false, error: 'Data tidak lengkap. Pastikan semua field terisi.' };
  }
  if (!data.fileName || !data.fileData) {
    return { success: false, error: 'File tidak ditemukan. Silakan pilih file.' };
  }

  // Decode file dari base64
  var fileBlob;
  try {
    var decoded = Utilities.base64Decode(data.fileData);
    fileBlob = Utilities.newBlob(decoded, data.mimeType || 'application/octet-stream', data.fileName);
  } catch (err) {
    return { success: false, error: 'Gagal memproses file: ' + err.message };
  }

  // Buat struktur folder: Root > Mapel > Judul Tugas > Kelas
  var rootFolder = DriveApp.getFolderById(CONFIG.DRIVE_FOLDER_ID);
  var mapelFolder = getOrCreateFolder(rootFolder, data.mapel);
  var tugasFolder = getOrCreateFolder(mapelFolder, data.judul_tugas);
  var kelasFolder = getOrCreateFolder(tugasFolder, data.kelas);

  // Nama file: NamaSiswa_NamaFile
  var safeNama = data.nama.replace(/[^a-zA-Z0-9]/g, '_');
  var ext = data.fileName.split('.').pop();
  var baseName = data.fileName.replace('.' + ext, '');
  var finalFileName = safeNama + '_' + baseName + '.' + ext;

  // Cek apakah sudah ada file lama dari siswa ini, hapus jika ada
  var existingFiles = kelasFolder.getFilesByName(finalFileName);
  while (existingFiles.hasNext()) {
    var old = existingFiles.next();
    old.setTrashed(true);
  }

  // Upload file
  fileBlob.setName(finalFileName);
  var uploadedFile = kelasFolder.createFile(fileBlob);
  uploadedFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  var fileUrl = uploadedFile.getUrl();

  // Catat di sheet rekap
  var ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  var rekapSheet = ensureRekapSheet(ss);

  var timestamp = Utilities.formatDate(
    new Date(),
    Session.getScriptTimeZone(),
    'dd/MM/yyyy HH:mm:ss'
  );

  rekapSheet.appendRow([
    timestamp,
    data.nama,
    data.kelas,
    data.mapel,
    data.judul_tugas,
    finalFileName,
    fileUrl,
  ]);

  return {
    success: true,
    message: 'Tugas berhasil dikumpulkan!',
    data: {
      fileName: finalFileName,
      fileUrl: fileUrl,
      timestamp: timestamp,
    },
  };
}

// =============================================
// HELPER FUNCTIONS
// =============================================

/**
 * Get or create a subfolder by name
 */
function getOrCreateFolder(parentFolder, folderName) {
  var folders = parentFolder.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  }
  return parentFolder.createFolder(folderName);
}

/**
 * Ensure rekap_tugas sheet exists with proper headers
 */
function ensureRekapSheet(ss) {
  var sheet = ss.getSheetByName(CONFIG.SHEET_REKAP);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_REKAP);
    sheet.appendRow([
      'timestamp',
      'nama',
      'kelas',
      'mapel',
      'judul_tugas',
      'nama_file',
      'link_file',
    ]);
    // Format header
    var headerRange = sheet.getRange(1, 1, 1, 7);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#FACC15');
    sheet.setFrozenRows(1);
  }
  return sheet;
}
