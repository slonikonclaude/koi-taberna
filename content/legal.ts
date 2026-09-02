/**
 * PÁGINAS LEGALES (solo en español: son los textos con validez jurídica).
 *
 * Estructura correcta según la LSSI-CE, el RGPD y la LOPDGDD, pero con los
 * datos de la empresa sin rellenar. Todo lo que aparece entre corchetes
 * [ASÍ] hay que sustituirlo antes de publicar.
 *
 * TODO: pedir al restaurante razón social, NIF/CIF, domicilio social, correo
 * de contacto y datos registrales, y sustituir todos los corchetes.
 * TODO: revisar el texto final con un asesor antes de publicarlo.
 */

export type LegalBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }

export interface LegalDocument {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  updated: string
  intro: string
  blocks: LegalBlock[]
}

/** TODO: poner la fecha real de publicación. */
export const LEGAL_UPDATED = '2 de septiembre de 2026'

const HOLDER =
  'El titular de este sitio web es [RAZÓN SOCIAL], con NIF [NIF/CIF] y domicilio en ' +
  '[DIRECCIÓN FISCAL COMPLETA], que explota el establecimiento Koi Taberna Japonesa, ' +
  'sito en Carrer Catalunya, 4, 46520 Port de Sagunt (Valencia). ' +
  'Teléfono: +34 962 077 577. Correo electrónico: [CORREO DE CONTACTO].'

export const AVISO_LEGAL: LegalDocument = {
  slug: 'aviso-legal',
  title: 'Aviso legal',
  metaTitle: 'Aviso legal | Koi Taberna Japonesa',
  metaDescription:
    'Aviso legal y condiciones de uso del sitio web de Koi Taberna Japonesa, Puerto de Sagunto.',
  updated: LEGAL_UPDATED,
  intro:
    'Este aviso legal recoge las condiciones de uso de este sitio web y los datos identificativos de su titular, conforme al artículo 10 de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE).',
  blocks: [
    { type: 'h2', text: '1. Datos identificativos' },
    { type: 'p', text: HOLDER },
    {
      type: 'p',
      text: 'Datos registrales: [DATOS DE INSCRIPCIÓN EN EL REGISTRO MERCANTIL, si procede].',
    },

    { type: 'h2', text: '2. Objeto' },
    {
      type: 'p',
      text: 'Este sitio web tiene una finalidad informativa: dar a conocer el restaurante, su carta, su horario y su ubicación, y facilitar el contacto para reservar mesa. No se realiza a través de él ninguna venta ni cobro en línea.',
    },

    { type: 'h2', text: '3. Condiciones de uso' },
    {
      type: 'p',
      text: 'El acceso a este sitio es gratuito y atribuye la condición de usuario. El usuario se compromete a hacer un uso diligente del sitio y a no emplearlo con fines ilícitos o que puedan dañar los derechos de terceros o el propio funcionamiento del sitio.',
    },
    {
      type: 'p',
      text: 'El titular puede modificar en cualquier momento los contenidos, la carta, el horario y la presentación del sitio, así como suspender temporalmente el acceso por motivos técnicos.',
    },

    { type: 'h2', text: '4. Propiedad intelectual e industrial' },
    {
      type: 'p',
      text: 'Los textos, las imágenes, el diseño, el logotipo y el resto de elementos de este sitio pertenecen a su titular o a terceros que han autorizado su uso, y están protegidos por la normativa de propiedad intelectual e industrial. Queda prohibida su reproducción, distribución o transformación sin autorización expresa.',
    },

    { type: 'h2', text: '5. Enlaces a sitios de terceros' },
    {
      type: 'p',
      text: 'Este sitio contiene enlaces a servicios de terceros que se abren en una ventana nueva:',
    },
    {
      type: 'ul',
      items: [
        'Google Maps, para la ubicación, las indicaciones y las reseñas.',
        'Instagram, para el perfil del restaurante.',
        'Glovo, para los pedidos a domicilio.',
        'WhatsApp, para enviar la solicitud de reserva.',
      ],
    },
    {
      type: 'p',
      text: 'El titular no controla ni se responsabiliza de los contenidos, las condiciones ni las políticas de privacidad de esos sitios. El acceso a ellos se rige por sus propias condiciones.',
    },

    { type: 'h2', text: '6. Exclusión de responsabilidad' },
    {
      type: 'p',
      text: 'El titular procura que la información publicada sea correcta y esté actualizada, pero no garantiza la ausencia de errores. La carta, los horarios y la disponibilidad pueden variar; para confirmarlos, lo más fiable es llamar al restaurante.',
    },
    {
      type: 'p',
      text: 'El titular no se responsabiliza de los daños derivados de un uso indebido del sitio ni de fallos de conexión ajenos a su control.',
    },

    { type: 'h2', text: '7. Protección de datos' },
    {
      type: 'p',
      text: 'El tratamiento de los datos personales se explica en la política de privacidad, y el uso de cookies y de almacenamiento local en la política de cookies.',
    },

    { type: 'h2', text: '8. Legislación aplicable' },
    {
      type: 'p',
      text: 'Estas condiciones se rigen por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales del domicilio del consumidor cuando este tenga tal condición y, en su defecto, a los de [LOCALIDAD DEL DOMICILIO SOCIAL].',
    },
  ],
}

export const PRIVACIDAD: LegalDocument = {
  slug: 'privacidad',
  title: 'Política de privacidad',
  metaTitle: 'Política de privacidad | Koi Taberna Japonesa',
  metaDescription:
    'Cómo trata Koi Taberna Japonesa los datos personales de quienes visitan su sitio web o solicitan una reserva.',
  updated: LEGAL_UPDATED,
  intro:
    'Esta política explica qué datos personales se tratan a través de este sitio web, con qué finalidad y qué derechos tienen las personas afectadas, conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018 (LOPDGDD).',
  blocks: [
    { type: 'h2', text: '1. Responsable del tratamiento' },
    { type: 'p', text: HOLDER },
    {
      type: 'p',
      text: 'Delegado de protección de datos: [NOMBRE Y CONTACTO DEL DPD, o indicar que no es obligatorio designarlo].',
    },

    { type: 'h2', text: '2. Qué datos se tratan y de dónde salen' },
    {
      type: 'p',
      text: 'Este sitio web no tiene formularios que envíen datos a un servidor propio, ni registro de usuarios, ni pasarela de pago. En concreto:',
    },
    {
      type: 'ul',
      items: [
        'El formulario de reserva no guarda nada ni envía nada a este sitio: lo único que hace es componer un mensaje con los datos escritos y abrirlo en WhatsApp para que sea la persona quien decida enviarlo. Hasta ese momento, la información no sale del navegador.',
        'Si se envía el mensaje, el restaurante recibe el nombre, el número de teléfono, la fecha, la hora, el número de comensales y el comentario que se haya escrito.',
        'Si se llama por teléfono, se tratan los datos que se faciliten durante la llamada para gestionar la reserva.',
        'La preferencia de idioma se guarda en el propio navegador y no se envía a ningún sitio. Véase la política de cookies.',
      ],
    },

    { type: 'h2', text: '3. Finalidad' },
    {
      type: 'p',
      text: 'Gestionar y confirmar las reservas de mesa, atender las consultas recibidas y organizar el servicio del restaurante. No se elaboran perfiles ni se toman decisiones automatizadas.',
    },

    { type: 'h2', text: '4. Base jurídica' },
    {
      type: 'ul',
      items: [
        'La aplicación de medidas precontractuales y la ejecución de la reserva solicitada (artículo 6.1.b del RGPD).',
        'El consentimiento de la persona interesada cuando escribe voluntariamente para consultar algo (artículo 6.1.a del RGPD).',
        'El interés legítimo del restaurante en gestionar la ocupación de la sala (artículo 6.1.f del RGPD).',
      ],
    },

    { type: 'h2', text: '5. Plazo de conservación' },
    {
      type: 'p',
      text: 'Los datos de una reserva se conservan el tiempo necesario para prestar el servicio y, después, durante los plazos legales de prescripción que resulten aplicables. Los mensajes recibidos por WhatsApp se eliminan cuando dejan de ser necesarios.',
    },

    { type: 'h2', text: '6. Destinatarios' },
    {
      type: 'p',
      text: 'No se ceden datos a terceros salvo obligación legal. Al usar WhatsApp para comunicarse con el restaurante, la mensajería la presta WhatsApp Ireland Limited (grupo Meta) con sus propias condiciones y su propia política de privacidad, ajenas a este sitio.',
    },
    {
      type: 'p',
      text: 'Si se pulsa el botón para ver el mapa, se carga contenido de Google Maps y Google puede tratar datos técnicos de la conexión conforme a su propia política.',
    },

    { type: 'h2', text: '7. Transferencias internacionales' },
    {
      type: 'p',
      text: 'Los servicios de terceros mencionados pueden implicar transferencias fuera del Espacio Económico Europeo amparadas en los mecanismos previstos en el capítulo V del RGPD. Este sitio no realiza por sí mismo ninguna transferencia internacional.',
    },

    { type: 'h2', text: '8. Derechos' },
    {
      type: 'p',
      text: 'Cualquier persona puede solicitar el acceso a sus datos, su rectificación o supresión, la limitación u oposición al tratamiento y la portabilidad, escribiendo a [CORREO DE CONTACTO] o a la dirección postal indicada arriba, acreditando su identidad.',
    },
    {
      type: 'p',
      text: 'También puede presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es) si considera que sus derechos no se han atendido correctamente.',
    },

    { type: 'h2', text: '9. Seguridad' },
    {
      type: 'p',
      text: 'Se aplican medidas técnicas y organizativas razonables para proteger la información tratada. El sitio se sirve por conexión cifrada (HTTPS).',
    },

    { type: 'h2', text: '10. Cambios en esta política' },
    {
      type: 'p',
      text: 'Esta política puede actualizarse si cambian los servicios o la normativa. La fecha de la última revisión aparece al principio de la página.',
    },
  ],
}

export const COOKIES: LegalDocument = {
  slug: 'cookies',
  title: 'Política de cookies',
  metaTitle: 'Política de cookies | Koi Taberna Japonesa',
  metaDescription:
    'Qué cookies y qué almacenamiento local usa el sitio web de Koi Taberna Japonesa y cómo gestionarlos.',
  updated: LEGAL_UPDATED,
  intro:
    'Esta política explica qué información se guarda en el navegador al visitar este sitio, conforme al artículo 22.2 de la LSSI-CE y a las directrices de la Agencia Española de Protección de Datos.',
  blocks: [
    { type: 'h2', text: '1. Qué son las cookies' },
    {
      type: 'p',
      text: 'Son pequeños archivos que un sitio web guarda en el navegador para recordar información entre visitas. Junto a ellas existen otras tecnologías equivalentes, como el almacenamiento local del navegador.',
    },

    { type: 'h2', text: '2. Qué usa este sitio' },
    {
      type: 'p',
      text: 'Este sitio no utiliza cookies de analítica, de publicidad ni de seguimiento. No hay perfilado ni medición de audiencia.',
    },
    {
      type: 'p',
      text: 'Se usa una única entrada de almacenamiento local, de carácter técnico:',
    },
    {
      type: 'ul',
      items: [
        'koi-taberna:lang — guarda el idioma elegido (español o inglés) para no volver a preguntarlo en la siguiente visita. Se queda en el dispositivo, no se envía a ningún servidor y se puede borrar en cualquier momento desde el navegador.',
      ],
    },
    {
      type: 'p',
      text: 'Al tratarse de almacenamiento estrictamente necesario para prestar un servicio pedido expresamente por la persona usuaria, está exento de la obligación de consentimiento previo.',
    },

    { type: 'h2', text: '3. Contenido de terceros' },
    {
      type: 'p',
      text: 'El mapa de Google no se carga de entrada: en su lugar se muestra una imagen propia con un botón. Solo si se pulsa ese botón se carga el mapa y Google puede instalar sus propias cookies. Es una decisión consciente para que nadie reciba cookies de terceros sin haberlo pedido.',
    },
    {
      type: 'p',
      text: 'Lo mismo ocurre con los enlaces a Instagram, Glovo y WhatsApp: solo al pulsarlos se abre el servicio correspondiente, con sus propias políticas.',
    },

    { type: 'h2', text: '4. Cómo gestionarlas o eliminarlas' },
    {
      type: 'p',
      text: 'Desde la configuración del navegador se pueden consultar, bloquear y eliminar las cookies y el almacenamiento local de cualquier sitio. Los pasos concretos están en la ayuda de Chrome, Firefox, Safari, Edge u Opera, según el que se utilice.',
    },
    {
      type: 'p',
      text: 'Borrar el almacenamiento local de este sitio solo tiene un efecto: la próxima visita volverá a mostrarse en español.',
    },

    { type: 'h2', text: '5. Cambios' },
    {
      type: 'p',
      text: 'Si en el futuro se añade alguna herramienta que use cookies, esta política se actualizará y, cuando la ley lo exija, se pedirá el consentimiento previo mediante un aviso.',
    },
  ],
}

export const LEGAL_DOCUMENTS = [AVISO_LEGAL, PRIVACIDAD, COOKIES]
