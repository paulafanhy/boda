// Buzón de fotos de la boda de Paula & Fanhy
// - Recibe las fotos que suben los invitados desde fotos.html y las guarda en una carpeta de Drive.
// - Da la lista de fotos a la web para el carrusel "Fotos de los invitados".

const NOMBRE_CARPETA = 'Fotos invitados · Boda Paula & Fanhy';
const MAX_MB = 25;
const FOTOS_EN_LISTA = 60;   // cuántas fotos (las más recientes) se muestran en el carrusel
const CACHE_SEG = 60;        // la lista se guarda 60 s para no recalcularla en cada visita

// 1) Ejecuta esta función tras pegar el código: autoriza el script y deja la carpeta
//    y todas sus fotos visibles para "cualquier persona con el enlace" (solo lectura).
function configurar() {
  const carpeta = obtenerCarpeta_();
  carpeta.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  const it = carpeta.getFiles();
  let n = 0;
  while (it.hasNext()) { publicar_(it.next()); n++; }
  CacheService.getScriptCache().remove('lista');
  Logger.log('Carpeta pública (solo lectura): ' + carpeta.getUrl() + ' · fotos: ' + n);
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

function publicar_(archivo) {
  try { archivo.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); } catch (e) {}
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

    const archivo = obtenerCarpeta_().createFile(Utilities.newBlob(bytes, tipo, nombre));
    publicar_(archivo);
    CacheService.getScriptCache().remove('lista');   // que la foto nueva salga enseguida en la web
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

// 3) La web pide la lista de fotos con ?lista=1
function doGet(e) {
  if (e && e.parameter && e.parameter.lista) return json_(lista_(), true);
  return json_({ ok: true, servicio: 'Fotos boda Paula & Fanhy' });
}

function lista_() {
  const cache = CacheService.getScriptCache();
  const guardada = cache.get('lista');
  if (guardada) return guardada;
  const carpeta = obtenerCarpeta_();
  const it = carpeta.getFiles();
  const fotos = [];
  while (it.hasNext()) {
    const f = it.next();
    if (f.isTrashed() || !/^image\//.test(f.getMimeType())) continue;   // las fotos en la papelera no salen
    fotos.push({ id: f.getId(), n: f.getName(), t: f.getDateCreated().getTime() });
  }
  fotos.sort((a, b) => b.t - a.t);
  const texto = JSON.stringify({ ok: true, carpeta: carpeta.getUrl(), total: fotos.length, fotos: fotos.slice(0, FOTOS_EN_LISTA) });
  try { cache.put('lista', texto, CACHE_SEG); } catch (e) {}
  return texto;
}

function json_(o, yaTexto) {
  return ContentService.createTextOutput(yaTexto ? o : JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
