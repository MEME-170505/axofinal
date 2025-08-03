# 2.3 Marco Conceptual - Frontend

## 2.3.1 Arquitectura Cliente-Servidor (Perspectiva del Cliente/Frontend)

La arquitectura cliente-servidor constituye el paradigma fundamental sobre el cual se desarrolló la plataforma frontend de AxoWeb Digital. Desde la perspectiva del cliente, esta arquitectura define una clara separación de responsabilidades donde el frontend actúa como la capa de presentación e interacción del usuario, mientras que el servidor se encarga del procesamiento de datos y la lógica de negocio.

En el contexto de este proyecto, el frontend implementado con Vue.js funciona como un cliente rico (Rich Client) que ejecuta en el navegador web del usuario. Esta aproximación permite una experiencia de usuario más fluida y responsiva, ya que gran parte de la lógica de presentación y validación se ejecuta localmente en el dispositivo del cliente, reduciendo la latencia y mejorando la percepción de rendimiento.

El frontend se comunica con el servidor a través de APIs RESTful, utilizando el protocolo HTTP/HTTPS para el intercambio de datos en formato JSON. Esta comunicación asíncrona permite que la interfaz de usuario permanezca responsiva mientras se procesan las solicitudes en segundo plano, implementando patrones de carga progresiva y feedback visual inmediato al usuario.

La arquitectura adoptada facilita la escalabilidad horizontal del sistema, permitiendo que múltiples instancias del frontend puedan conectarse al mismo backend, y posibilita la implementación futura de aplicaciones móviles o de escritorio que consuman los mismos servicios del servidor.

## 2.3.2 Vue.js

Vue.js se seleccionó como el framework principal para el desarrollo del frontend debido a su curva de aprendizaje progresiva, su arquitectura reactiva y su ecosistema maduro. En el proyecto AxoWeb Digital, Vue.js 3 con Composition API proporciona la base tecnológica para crear una aplicación de página única (SPA) altamente interactiva y mantenible.

La implementación aprovecha las características fundamentales de Vue.js, incluyendo el sistema de reactividad bidireccional que permite la sincronización automática entre el estado de la aplicación y la interfaz de usuario. Los componentes Vue se estructuran utilizando Single File Components (SFC), encapsulando la lógica, el template y los estilos en archivos individuales con extensión .vue.

El proyecto utiliza la Composition API de Vue 3, que ofrece una mejor organización del código y reutilización de lógica a través de composables personalizados. Esta aproximación facilita el mantenimiento del código y permite una mejor tipificación cuando se integra con TypeScript en futuras iteraciones.

La reactividad de Vue.js se aprovecha extensivamente en funcionalidades como filtros en tiempo real, validación de formularios, actualización dinámica de estados de pago, y sincronización de datos entre componentes padre e hijo. El sistema de directivas de Vue (v-model, v-if, v-for) simplifica la manipulación del DOM y la renderización condicional de elementos.

## 2.3.3 Vue Router

Vue Router constituye la solución oficial de enrutamiento para aplicaciones Vue.js, implementada en el proyecto para gestionar la navegación entre diferentes vistas y controlar el acceso basado en roles de usuario. La configuración del router establece un sistema de rutas jerárquico que diferencia entre rutas públicas y privadas.

Las rutas públicas incluyen las páginas de marketing y información general (inicio, servicios, sobre nosotros, contacto), accesibles para cualquier visitante sin autenticación. Estas rutas implementan lazy loading para optimizar el tiempo de carga inicial de la aplicación.

Las rutas privadas requieren autenticación y validación de roles específicos. El sistema implementa guards de navegación (beforeEach) que verifican el estado de autenticación del usuario y su rol correspondiente antes de permitir el acceso a vistas restringidas. Los administradores acceden al panel de gestión completo, mientras que los clientes tienen acceso limitado a su área personal.

El router utiliza el modo history de HTML5, proporcionando URLs limpias sin el símbolo hash (#), mejorando la experiencia de usuario y el SEO. La configuración incluye manejo de rutas no encontradas (404) y redirecciones automáticas basadas en el estado de autenticación del usuario.

La navegación programática se implementa para redireccionar usuarios después de acciones específicas como login exitoso, logout, o completar formularios, manteniendo un flujo de navegación coherente y predecible.

## 2.3.4 Bootstrap y Animate.css

La implementación del diseño visual combina Bootstrap 5 como framework CSS principal con Animate.css para efectos de animación, creando una interfaz moderna y visualmente atractiva.

Bootstrap proporciona el sistema de grid responsivo fundamental, utilizando su sistema de 12 columnas para crear layouts adaptativos que funcionan correctamente en dispositivos móviles, tablets y escritorio. Los componentes de Bootstrap como cards, modals, forms, buttons y navigation se personalizan mediante variables CSS custom para mantener la identidad visual de AxoWeb Digital.

El sistema de utilidades de Bootstrap se aprovecha extensivamente para espaciado (margin, padding), tipografía, colores y posicionamiento, reduciendo la necesidad de CSS personalizado y manteniendo consistencia visual en toda la aplicación.

Animate.css se integra para proporcionar animaciones de entrada y transición entre elementos. Las animaciones se aplican estratégicamente en elementos como cards de servicios (fadeInUp), modales (fadeIn), y transiciones de página, mejorando la percepción de calidad y profesionalismo de la interfaz.

La combinación de ambas librerías se optimiza mediante la importación selectiva de componentes necesarios, reduciendo el tamaño del bundle final y mejorando los tiempos de carga. Las animaciones se configuran con delays escalonados para crear efectos visuales sofisticados sin comprometer el rendimiento.

## 2.3.5 Pinia

Pinia se implementa como la solución de gestión de estado global para la aplicación, reemplazando a Vuex como el store oficial recomendado para Vue 3. En el proyecto AxoWeb Digital, Pinia maneja principalmente el estado de autenticación y la información del usuario activo.

El store de autenticación centraliza toda la lógica relacionada con el login, logout, y verificación de permisos de usuario. Utiliza la Composition API de Pinia para definir estado reactivo, getters computados y actions que modifican el estado de manera predecible.

La implementación incluye computed properties para determinar el estado de autenticación (isAuthenticated), el rol del usuario (isAdmin, isClient), y la información completa del perfil. Estas propiedades reactivas se consumen en toda la aplicación para mostrar u ocultar elementos de la interfaz basados en los permisos del usuario.

Pinia facilita la persistencia del estado de autenticación durante la sesión del navegador y proporciona herramientas de desarrollo integradas para debugging y monitoreo del estado. La arquitectura modular de Pinia permite la extensión futura del sistema de estado para incluir otros dominios como gestión de pagos, configuraciones de usuario, o cache de datos.

## 2.3.6 EmailJS

EmailJS se integra como la solución para el envío de correos electrónicos desde el frontend sin requerir un servidor backend dedicado para esta funcionalidad. Esta implementación permite que los formularios de contacto y solicitudes de servicios envíen emails directamente desde el navegador del cliente.

La configuración de EmailJS incluye la creación de templates de email personalizados que estructuran la información enviada desde los formularios de contacto. Los templates incluyen datos del cliente como nombre, email, teléfono, tipo de servicio solicitado, y mensaje personalizado.

La integración se implementa de manera asíncrona, proporcionando feedback visual al usuario durante el proceso de envío mediante estados de carga y mensajes de confirmación. El sistema incluye manejo de errores robusto que informa al usuario sobre el estado del envío y proporciona alternativas en caso de fallo.

La implementación de EmailJS reduce la complejidad del backend y los costos de infraestructura, mientras mantiene la funcionalidad completa de comunicación con clientes potenciales. Los emails se envían a través de servicios como Gmail o Outlook, configurados previamente en la plataforma EmailJS.

## 2.3.6 Sistema de Formularios sin Base de Datos

El proyecto AxoWeb Digital implementa un sistema innovador de gestión de formularios que opera completamente sin base de datos tradicional, utilizando WhatsApp como canal principal de comunicación y procesamiento de solicitudes. Esta aproximación elimina la complejidad de infraestructura backend mientras mantiene funcionalidad completa para la captación y gestión de leads.

**Arquitectura de Formularios:**
La implementación se basa en el procesamiento local de datos del formulario en el navegador del cliente, seguido de la generación automática de mensajes estructurados que se envían directamente a WhatsApp Business. Los formularios capturan información del cliente incluyendo datos personales, tipo de servicio solicitado, presupuesto estimado, y requerimientos específicos.

**Flujo de Procesamiento:**
Cuando un usuario completa un formulario (contacto, solicitud de servicio, o cotización), el sistema JavaScript procesa los datos localmente, valida la información ingresada, y genera un mensaje preformateado que incluye toda la información relevante. Este mensaje se estructura utilizando markdown para WhatsApp, incluyendo emojis y formato que facilita la lectura y procesamiento por parte del equipo comercial.

**Integración con WhatsApp Business:**
La integración utiliza la API de WhatsApp Web (wa.me) para generar enlaces directos que abren la aplicación de WhatsApp con el mensaje precompuesto. El sistema construye URLs dinámicas que incluyen el número de teléfono empresarial y el mensaje codificado en formato URL, permitiendo que el usuario envíe la solicitud con un solo clic.

**Ventajas del Sistema:**
Esta implementación ofrece múltiples beneficios: eliminación de costos de infraestructura de base de datos, respuesta inmediata al cliente a través de un canal familiar, procesamiento directo por el equipo comercial sin intermediarios técnicos, y mantenimiento simplificado sin dependencias de servidor. Además, WhatsApp proporciona confirmación de entrega y lectura automática, garantizando que las solicitudes lleguen al destinatario.

**Estructura de Mensajes:**
Los mensajes generados siguen un formato estandarizado que incluye identificación del tipo de solicitud, datos completos del cliente, detalles del servicio solicitado, presupuesto estimado, y timestamp de la solicitud. Esta estructura facilita el procesamiento manual y permite la creación de un CRM informal utilizando las funcionalidades nativas de WhatsApp Business.

**Validación y Experiencia de Usuario:**
El sistema implementa validación completa del lado del cliente antes del envío, incluyendo verificación de campos requeridos, formato de email, y longitud de mensajes. La experiencia de usuario se optimiza mediante feedback visual inmediato, estados de carga durante el procesamiento, y confirmaciones de envío exitoso que guían al usuario a través del proceso completo.
## 2.3.7 Figma

Figma se utilizó como la herramienta principal de diseño y prototipado durante la fase de conceptualización y diseño de la interfaz de usuario. Esta plataforma colaborativa permitió la creación de wireframes, mockups de alta fidelidad, y sistemas de diseño antes de la implementación en código.

El proceso de diseño en Figma incluyó la definición de la paleta de colores corporativa de AxoWeb Digital, la tipografía, el sistema de espaciado, y los componentes de interfaz reutilizables. Se crearon artboards para diferentes tamaños de pantalla, asegurando un diseño responsivo desde la fase de conceptualización.

Los prototipos interactivos desarrollados en Figma facilitaron la validación de flujos de usuario, navegación entre pantallas, y comportamientos de componentes antes de la implementación. Esto redujo significativamente el tiempo de desarrollo y minimizó las iteraciones de diseño durante la fase de codificación.

El sistema de componentes diseñado en Figma se tradujo directamente a componentes Vue reutilizables, manteniendo consistencia visual y funcional entre el diseño conceptual y la implementación final. Los assets exportados desde Figma, incluyendo iconos, imágenes optimizadas, y especificaciones de diseño, se integraron seamlessly en el proyecto Vue.

## 2.3.8 Visual Studio Code

Visual Studio Code se estableció como el entorno de desarrollo integrado (IDE) principal para el desarrollo del frontend, proporcionando las herramientas y extensiones necesarias para un flujo de trabajo eficiente con Vue.js y tecnologías relacionadas.

La configuración del IDE incluye extensiones específicas para Vue.js como Vetur o Volar, que proporcionan syntax highlighting, autocompletado inteligente, y detección de errores en tiempo real para archivos .vue. Estas extensiones mejoran significativamente la productividad del desarrollo y reducen errores de sintaxis.

Las extensiones adicionales incluyen soporte para CSS/SCSS, formateo automático de código con Prettier, linting con ESLint, y integración con Git para control de versiones. La configuración de snippets personalizados acelera la creación de componentes Vue y reduce la escritura repetitiva de código boilerplate.

El terminal integrado de VS Code facilita la ejecución de comandos npm, scripts de build, y herramientas de desarrollo como el servidor de desarrollo de Vite. La integración con el debugger permite la depuración directa de código JavaScript y Vue components desde el IDE.

La funcionalidad de IntelliSense proporciona autocompletado contextual para APIs de Vue, props de componentes, y métodos disponibles, mejorando la velocidad de desarrollo y reduciendo errores de tipeo.

## 2.3.9 Estructura del Proyecto

La estructura del proyecto AxoWeb Digital sigue las mejores prácticas de organización para aplicaciones Vue.js, implementando una arquitectura modular y escalable que facilita el mantenimiento y la colaboración en equipo.

**Directorio src/**: Contiene todo el código fuente de la aplicación, organizado en subdirectorios especializados según su función y responsabilidad.

**src/views/**: Almacena los componentes de página principal, organizados jerárquicamente en subdirectorios que reflejan la estructura de rutas. Se divide en vistas públicas (accesibles sin autenticación) y privadas (requieren login y roles específicos). Cada vista compleja se subdivide en componentes más pequeños dentro de carpetas 'components' locales.

**src/components/**: Contiene componentes reutilizables organizados por categoría funcional. Los componentes UI básicos (botones, formularios, alertas) se separan de componentes más complejos como modales y tablas especializadas. Esta organización facilita la reutilización y el mantenimiento.

**src/stores/**: Implementa los stores de Pinia para gestión de estado global, principalmente el store de autenticación que maneja sesiones de usuario y permisos de acceso.

**src/composables/**: Contiene funciones composables que encapsulan lógica reutilizable, como el sistema de alertas globales y utilidades de validación de formularios.

**src/assets/**: Almacena recursos estáticos como hojas de estilo CSS personalizadas, imágenes, y archivos de configuración de diseño.

**src/router/**: Aunque la configuración de rutas se centraliza en main.js para este proyecto, esta estructura permite la expansión futura hacia un sistema de rutas más complejo con múltiples archivos de configuración.

La estructura implementa el principio de separación de responsabilidades, donde cada directorio tiene una función específica y bien definida. Los componentes se organizan siguiendo el patrón de composición, donde componentes complejos se construyen combinando componentes más simples y reutilizables.

Esta organización facilita la escalabilidad del proyecto, permitiendo que nuevos desarrolladores comprendan rápidamente la arquitectura y contribuyan efectivamente al desarrollo. La estructura también soporta herramientas de build modernas como Vite, que pueden optimizar automáticamente la carga de módulos y el tree-shaking basándose en la organización del código.