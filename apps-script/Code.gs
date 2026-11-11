// Buzón de fotos de la boda de Paula & Fanhy
// Recibe las fotos que suben los invitados desde fotos.html y las guarda en una carpeta de Drive.

const NOMBRE_CARPETA = 'Fotos invitados · Boda Paula & Fanhy';
const MAX_MB = 25;

// 1) Ejecuta esta función UNA vez para crear la carpeta y autorizar el script.
function configurar() {
  const carpeta = obtenerCarpeta_();
  Logger.log('Carpeta lista: ' + carpeta.getUrl());
}

function obtenerCarpeta_() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty('CARPETA_ID');
  if (id) {
    try { return DriveApp.getFolderById(id); } catch (e) {}
  }
  const carpeta = DriveApp.createFolder(NOMBRE_CARPETA);
  props.setProperty('CARPETA_ID', carpeta.getId());
  return carpeta;
}

// 2) La página de fotos envía aquí cada foto.
function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    const tipo = String(d.tipo || '');
    if (!d.data || !/^image\//.test(tipo)) return json_({ ok: false, error: 'tipo' });

    const bytes = Utilities.base64Decode(d.data);
    if (bytes.length > MAX_MB * 1024 * 1024) return json_({ ok: false, error: 'grande' });

    const quien = String(d.nombre || '').replace(/[^\p{L}\p{N} _-]/gu, '').trim().slice(0, 40) || 'invitado';
    const ext = String(d.ext || 'jpg').replace(/[^a-z0-9]/gi, '').slice(0, 5).toLowerCase() || 'jpg';
    const fecha = Utilities.formatDate(new Date(), 'Europe/Madrid', 'yyyy-MM-dd HH.mm.ss');
    const nombre = `${fecha} · ${quien} · ${Math.random().toString(36).slice(2, 6)}.${ext}`;

    obtenerCarpeta_().createFile(Utilities.newBlob(bytes, tipo, nombre));
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet() {
  return json_({ ok: true, servicio: 'Fotos boda Paula & Fanhy' });
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
