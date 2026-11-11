// Versión de la web y registro de cambios.
// Para añadir una versión nueva, pon la entrada nueva ARRIBA del todo.
window.CHANGELOG = [
  {
    version: '1.8.0',
    fecha: '2026-11-11 15:10',
    titulo: 'Títulos con Amsterdam',
    cambios: ['Los títulos de las secciones, la página de fotos y las novedades usan la letra Amsterdam Four, más informal']
  },
  {
    version: '1.7.1',
    fecha: '2026-11-11 15:10',
    titulo: 'Anillos transparentes',
    cambios: ['El hueco del anillo derecho ahora es transparente, igual que el izquierdo']
  },
  {
    version: '1.7.0',
    fecha: '2026-11-11 15:05',
    titulo: 'Nuevo logo de anillos y plantas de línea fina',
    cambios: [
      'Fuera el monograma P & F: nuevo logo con dos anillos entrelazados, "PAULA Y FANHY" y la fecha',
      'Portada con los anillos, los nombres en mayúsculas espaciadas y la fecha 04/09/2027',
      'Ramas y ramitas redibujadas a trazo fino con florecitas y mancha menta de fondo',
      'Logo nuevo también en la página de fotos, el panel y la imagen de WhatsApp'
    ]
  },
  {
    version: '1.6.0',
    fecha: '2026-11-11 14:50',
    titulo: 'Auditoría y arreglos',
    cambios: [
      'Visita automática a la base de datos cada 3 días para que no se pause',
      'Panel: las respuestas repetidas se marcan y solo cuenta la más reciente de cada persona',
      'Imagen de vista previa al compartir el enlace por WhatsApp',
      'La web no aparece en Google ni en otros buscadores',
      'Un cambio de portada se ve en la web en un minuto',
      'Las fotos que subís desde iPhone en el panel pesan mucho menos',
      'La web pesa la mitad y carga más rápido',
      'Después de la boda, la cuenta atrás da las gracias',
      'Frase de privacidad bajo el formulario',
      'Errores del formulario accesibles para lectores de pantalla',
      'Archivo de calendario con acentos correctos'
    ]
  },
  {
    version: '1.5.2',
    fecha: '2026-11-11 14:30',
    titulo: 'Lugares',
    cambios: [
      'La tarjeta de celebración pasa a llamarse "Celebración y banquete"',
      'Si la ceremonia es en el mismo sitio, se muestra una sola tarjeta: "Ceremonia, celebración y banquete"'
    ]
  },
  {
    version: '1.5.1',
    fecha: '2026-11-11 14:15',
    titulo: 'Carrusel de fotos',
    cambios: [
      'Las fotos de vuestra historia pasan solas cada 4 segundos y vuelven al principio al terminar',
      'Flechas a los lados y puntitos para saltar a cualquier foto',
      'Se pueden seguir deslizando con el dedo; al tocar, se pausa el paso automático un momento',
      'En pantallas grandes el carrusel ocupa todo el ancho'
    ]
  },
  {
    version: '1.5.0',
    fecha: '2026-11-11 14:05',
    titulo: 'Fotos de invitados a Google Drive',
    cambios: [
      'Las fotos que suben los invitados por el QR se guardan en Google Drive de la cuenta de la boda',
      'Hasta 15 GB gratis: espacio para miles de fotos',
      'Panel: botón para abrir la carpeta de Drive con las fotos de los invitados'
    ]
  },
  {
    version: '1.4.1',
    fecha: '2026-11-11 12:25',
    titulo: 'Más limpio y legible',
    cambios: [
      'Quitada la mancha de acuarela de los títulos para que se lean mejor',
      'Las novedades solo se ven desde el panel de administración',
      'La versión sigue visible al pie de la web, sin enlace',
      'Botón "Novedades" y versión en el panel'
    ]
  },
  {
    version: '1.4.0',
    fecha: '2026-11-11 12:20',
    titulo: 'La web se viste de boda',
    cambios: [
      'Ramas de eucalipto decorando las esquinas de las secciones',
      'Separadores con ramita bajo cada título',
      'Manchas de acuarela menta detrás de los títulos',
      'Bordes ondulados entre secciones',
      'Títulos con letra caligráfica, la misma del monograma',
      'Horario con iconos dibujados según el momento (ceremonia, cóctel, banquete, fiesta…)',
      'Fotos de vuestra historia en estilo polaroid',
      'Versión y registro de cambios al pie de la web'
    ]
  },
  {
    version: '1.3.0',
    fecha: '2026-11-11 11:55',
    titulo: 'Ajustes y correcciones',
    cambios: [
      'Corregido el nombre: Fanhy',
      'Más contraste en los colores para que todo se lea bien',
      'Monograma centrado en la corona',
      'Panel: "Salir" vuelve a la web, botón "Ver web" y enlace de vuelta en el login'
    ]
  },
  {
    version: '1.2.0',
    fecha: '2026-11-11 11:43',
    titulo: 'Nuevo monograma',
    cambios: [
      'Monograma con corona de hojas e iniciales caligráficas',
      'Acceso discreto al panel desde el pie de la web'
    ]
  },
  {
    version: '1.1.0',
    fecha: '2026-11-11 11:24',
    titulo: 'Arreglos de diseño',
    cambios: [
      'Monograma corregido (las letras se apilaban)',
      'La web se ve siempre en modo claro, aunque el móvil esté en modo oscuro'
    ]
  },
  {
    version: '1.0.0',
    fecha: '2026-11-11 11:11',
    titulo: 'Primera versión',
    cambios: [
      'Web con portada, cuenta atrás, historia, horario, lugares, información práctica y preguntas',
      'Formulario de confirmación con alergias, acompañantes, dormir, desayuno y comida',
      'Página para que los invitados suban fotos con QR',
      'Panel de administración con contraseña'
    ]
  }
];
window.WEB_VERSION = window.CHANGELOG[0];

window.fechaBonita = function (f) {
  const [d, h] = f.split(' ');
  const txt = new Date(d + 'T12:00:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
  return h ? `${txt} · ${h}` : txt;
};
