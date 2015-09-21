/*******************************/
/****** CONSIDERACIONES ********/
/*******************************/
Esta aplicación debe ser montada en un servidor para funcionar correctamente. Al momento de desarrollar corre sobre un server Apache.
Está optimizada únicamente para 1080p, pudiendo desarmarse o tener comportamientos inesperados en pantallas con resoluciones distintas.

/*******************************/
/****** TECNOLOGÍAS ************/
/*******************************/
HTML5
CSS3
JavaScript
JSON
Jquery
RequireJS
Require !text (plugin)
Require !json (modificado)
Underscore
Apache

HTML5
Aunque no ampliamente utilizado, cabe destacar la inclusión de varios elementos de HTML5 para la estructuración de la página, cómo son aside, figure/figcaption, header/footer y section. También se utiliza Web Storage (localStorage) para el total del almacenamiento de datos.

CSS3
Se incluye una amplia variedad de efectos estáticos y animados con CSS3. Por falta de tiempo y a propósitos del proyecto sólo está diseñado para verse bien en desktop y está preparado para una resolución de 1920x1080.

JavaScript
Dentro de otras cosas, incluye: 
   * Funciones anidadas
   * Closures
   * Consideración de hoisting declarando todas las variables al comienzo de las funciones
   * Manejo de localStorage con su correspondiente parseo
   * Comparación de datos siempre con '===', manejo del evento que dispara un handler (como prevenir recarga en un submit o manejar la data en él)
   * Extensión de funciones a través de prototype.

JSON
Tanto los comics como los usuarios están guardados en archivos JSON. Al recuperar los datos de localStorage se parsean estos datos de String a Object con el objecto JSON propio de JavaScript.

Jquery
Ampliamente utilizado para la manipulación del DOM y la asignación de eventos.

RequireJS (con plugins 'text' y 'json')
Utilizado para cargar cada dependencia de html, javascript y objetos json.

Underscore
Esta librería facilita la manipulación de datos con funciones como 'each', 'filter' y 'find'.

Apache
La versión del servidor de Apache Lounge para Windows (2.4.16 Win64) fue utlizada con el fin de servir archivos cross domain.

/*******************************/
/****** EL CONCEPTO ************/
/*******************************/

Master of Comics (MOC) es el proyecto final para el curso de Web UI Módulo 1. Es una aplicación font-end del tipo single page application que corre sobre un servidor, en mi caso Apache. La carga dentro de los componentes de la página se lleva a cabo importando módulos (templates, librerías y datos) dentro del componente padre y luego manipulando el contenido individualmente. Debido a esto, y a que se utiliza Web Storage como base de datos para contenido liviano, el usuario tiene una experiencia fluida y rápida, al no tener que servir URIs enteras por cada funcionalidad y sólo recargando una porción de la página.

/*******************************/
/****** USABILIDAD ************/
/*******************************/
Lo que el usuario puede hacer en el sitio.
Al tratar de ingresar al sitio, si el usuario no está logueado, será redirigido a la pantalla de login. Del mismo modo, si intenta ingresar al login y ya está logueado, se lo redirige a la aplicación.