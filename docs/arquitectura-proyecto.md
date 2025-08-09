# 📋 DOCUMENTACIÓN ESTRUCTURADA DE LA ARQUITECTURA DEL PROYECTO AXOWEB DIGITAL

## 1. VISTAS (views)

### 1.1 Vistas Públicas (publicas)

#### 1.1.1 Inicio
**1.1.1.1 InicioView.vue**
- Página principal del sitio web
- Contiene hero section, servicios destacados, creencias y proyectos
- Ruta: '/'
- Componentes utilizados: HeroInicio, ServiciosInicio, CreenciaSeccion, ProyectosSeccion

**1.1.1.2 components/HeroInicio.vue**
- Sección hero principal con logo y mensaje de bienvenida
- Incluye banner con gradiente y efectos visuales
- Usada en: InicioView.vue

**1.1.1.3 components/ServiciosInicio.vue**
- Muestra servicios principales en formato de filas horizontales
- Cada servicio tiene icono, título y descripción
- Usada en: InicioView.vue

**1.1.1.4 components/CreenciaSeccion.vue**
- Sección "CREEMOS TU NEGOCIO DIGITAL" con imagen y call-to-action
- Enlace directo a la página de servicios
- Usada en: InicioView.vue

**1.1.1.5 components/ProyectosSeccion.vue**
- Galería de proyectos con empresas clientes
- Tarjetas con efecto flip 3D mostrando logos y descripciones
- Usada en: InicioView.vue

#### 1.1.2 Servicios
**1.1.2.1 ServiciosView.vue**
- Página principal de servicios con planes y servicios individuales
- Contiene modal de solicitud integrado
- Ruta: '/servicios'
- Componentes utilizados: HeroServicios, PlanesSection, ServiciosIndividualesSection, CTASection

**1.1.2.2 components/HeroServicios.vue**
- Hero section con título, estadísticas y tarjetas flotantes animadas
- Gradiente coral con efectos visuales avanzados
- Usada en: ServiciosView.vue

**1.1.2.3 components/PlanesSection.vue**
- Sección que muestra los planes principales (Huevo, Ajolote, Alebrije)
- Grid responsivo con tarjetas de planes
- Usada en: ServiciosView.vue

**1.1.2.4 components/PlanCard.vue**
- Tarjeta individual para mostrar un plan específico
- Incluye imagen, precio, características y botón de solicitud
- Badge "Más Popular" para planes destacados
- Usada en: PlanesSection.vue

**1.1.2.5 components/ServiciosIndividualesSection.vue**
- Sección de servicios individuales con filtros por categoría
- Sistema de filtrado dinámico
- Usada en: ServiciosView.vue

**1.1.2.6 components/ServicioCard.vue**
- Tarjeta para servicios individuales con icono, descripción y precio
- Información de tiempo estimado e incluye
- Usada en: ServiciosIndividualesSection.vue

**1.1.2.7 components/CTASection.vue**
- Sección de llamada a la acción final
- Botones para WhatsApp y consulta gratuita
- Características destacadas con iconos
- Usada en: ServiciosView.vue

#### 1.1.3 Servicios Detalle (servicios/detalle)
**1.1.3.1 DesarrolloWebView.vue**
- Página detallada del servicio de desarrollo web
- Hero, características, paquetes, proceso y CTA
- Ruta: '/servicios/desarrollo-web'
- Incluye modal de solicitud integrado

**1.1.3.2 EmailMarketingView.vue**
- Página detallada del servicio de email marketing
- Beneficios, servicios específicos y proceso
- Ruta: '/servicios/email-marketing'
- Componente especializado: ServicioEmailCard

**1.1.3.3 DisenoUIUXView.vue**
- Página detallada del servicio de diseño UI/UX
- Proceso de diseño y paquetes especializados
- Ruta: '/servicios/diseno-ui-ux'
- Componente utilizado: PaqueteCard

**1.1.3.4 MarketingDigitalView.vue**
- Página detallada del servicio de marketing digital
- Estrategias y paquetes de marketing
- Ruta: '/servicios/marketing-digital'
- Componente utilizado: PaqueteCard

**1.1.3.5 AutomatizacionView.vue**
- Página detallada del servicio de automatización
- Procesos automatizables y paquetes
- Ruta: '/servicios/automatizacion'
- Componente utilizado: PaqueteCard

#### 1.1.4 Sobre Nosotros
**1.1.4.1 SobreNosotrosView.vue**
- Página institucional con información de la empresa
- Ruta: '/sobre-nosotros'
- Componentes utilizados: MisionSeccion, VisionSeccion, FilosofiaSeccion, ValoresSeccion

**1.1.4.2 components/MisionSeccion.vue**
- Sección de misión empresarial con imagen y texto
- Layout de dos columnas responsivo
- Usada en: SobreNosotrosView.vue

**1.1.4.3 components/VisionSeccion.vue**
- Sección de visión empresarial con orden invertido
- Imagen a la derecha, texto a la izquierda
- Usada en: SobreNosotrosView.vue

**1.1.4.4 components/FilosofiaSeccion.vue**
- Sección de filosofía empresarial
- Layout estándar con imagen y contenido
- Usada en: SobreNosotrosView.vue

**1.1.4.5 components/ValoresSeccion.vue**
- Grid de tarjetas con valores empresariales
- 5 valores con iconos y descripciones
- Efectos hover y animaciones
- Usada en: SobreNosotrosView.vue

#### 1.1.5 Contacto
**1.1.5.1 ContactanosView.vue**
- Página de contacto con formulario y información
- Ruta: '/contactanos'
- Componentes utilizados: ContactForm, ContactInfo

**1.1.5.2 components/ContactForm.vue**
- Formulario de contacto con validación completa
- Integración con WhatsApp para envío de mensajes
- Campos: nombre, apellido, email, teléfono, asunto, mensaje
- Usada en: ContactanosView.vue

**1.1.5.3 components/ContactInfo.vue**
- Tarjetas informativas con métodos de contacto
- WhatsApp, email y horarios de atención
- Botones de acción directa
- Usada en: ContactanosView.vue

### 1.2 Vistas Privadas (privadas)

#### 1.2.1 Clientes
**1.2.1.1 ClienteView.vue**
- Panel principal para usuarios con rol de cliente
- Sistema de pestañas para navegación interna
- Ruta: '/cliente' (requiere autenticación y rol 'client')
- Componentes utilizados: ClienteHeader, ClienteNavigation, ClienteInicio, ClienteServicios

**1.2.1.2 components/ClienteHeader.vue**
- Header personalizado con información del usuario
- Muestra nombre, apellido y empresa del cliente
- Icono de usuario con animaciones
- Usada en: ClienteView.vue

**1.2.1.3 components/ClienteNavigation.vue**
- Navegación por pestañas estilo píldoras
- Pestañas: Inicio y Servicios
- Diseño responsivo con colapso vertical en móviles
- Usada en: ClienteView.vue

**1.2.1.4 components/ClienteInicio.vue**
- Formulario editable de datos personales del cliente
- Modo lectura/edición con validación
- Campos: nombre, apellido, teléfono, email, empresa
- Usada en: ClienteView.vue

**1.2.1.5 components/ClienteServicios.vue**
- Tabla de servicios contratados por el cliente
- Estados: Activo, Por vencer, Vencido
- Acciones: Renovar y Cancelar servicios
- Usada en: ClienteView.vue

#### 1.2.2 Administradores
**1.2.2.1 AdminView.vue**
- Panel principal de administración con sistema de pestañas
- Ruta: '/admin' (requiere autenticación y rol 'admin')
- Componentes utilizados: AdminHeader, AdminNavigation, ClientesTab, AdministradoresTab, ServiciosTab, PagosTab

**1.2.2.2 components/AdminHeader.vue**
- Header del panel administrativo con icono de escudo
- Título y descripción del panel
- Usada en: AdminView.vue

**1.2.2.3 components/AdminNavigation.vue**
- Navegación principal del admin con 4 pestañas
- Pestañas: Clientes, Administradores, Servicios, Pagos
- Diseño responsivo con colapso vertical
- Usada en: AdminView.vue

**1.2.2.4 components/ClientesTab.vue**
- Gestión completa de clientes registrados
- Tabla con búsqueda, agregar, editar y eliminar
- Modal integrado para formularios
- Usada en: AdminView.vue

**1.2.2.5 components/AdministradoresTab.vue**
- Gestión de usuarios administradores
- Protección especial para admin principal
- Roles: Super Admin, Admin, Moderador
- Usada en: AdminView.vue

**1.2.2.6 components/ServiciosTab.vue**
- Gestión de planes y servicios ofrecidos
- Sub-pestañas para Planes y Servicios
- CRUD completo con modales especializados
- Usada en: AdminView.vue

**1.2.2.7 components/PagosTab.vue**
- **VISTA MÁS CRÍTICA**: Centro de control financiero
- Layout dual: sidebar de empresas + tabla de pagos
- Filtros avanzados y búsqueda en tiempo real
- Acciones: crear, editar, liquidar, abonar, eliminar pagos
- Múltiples modales especializados
- Usada en: AdminView.vue

### 1.3 Vistas Especiales

#### 1.3.1 Ofertas
**1.3.1.1 Ecommerce.vue**
- Landing page especializada para servicios de e-commerce
- Paquetes: Básico, Profesional, Empresarial
- Ruta: '/ecommerce'
- Integración directa con WhatsApp

**1.3.1.2 Marketing.vue**
- Landing page para servicios de marketing digital
- Paquetes especializados en marketing
- Ruta: '/marketing-digital'
- Integración directa con WhatsApp

#### 1.3.2 Estados Especiales
**1.3.2.1 Error404.vue**
- Página de error 404 personalizada
- Elementos flotantes animados y enlaces útiles
- Ruta: '/404' y captura de rutas no encontradas
- Logo con expresión de error

**1.3.2.2 PaymentSuccess.vue**
- Página de confirmación de pago exitoso
- Animación de confeti y detalles de transacción
- Ruta: '/pago-exitoso'
- Pasos siguientes y información de contacto

## 2. COMPONENTES (components)

### 2.1 Componentes de UI Base

#### 2.1.1 Botones y Acciones
**2.1.1.1 ui/BotonPrimario.vue**
- **COMPONENTE FUNDAMENTAL**: Botón reutilizable en toda la aplicación
- 8 variantes de color, 3 tamaños, estados de carga
- Props: variant, size, type, disabled, loading, icon, rounded, block
- Usado en: TODA la aplicación (más de 50 implementaciones)

**2.1.1.2 ui/PaymentActionButtons.vue**
- Grupo especializado de botones para acciones de pago
- Botones: Liquidar, Abonar, Ver, Editar, Eliminar
- Lógica condicional según estado del pago
- Usado en: FilaPago.vue

#### 2.1.2 Tablas y Listas
**2.1.2.1 ui/TablaPagos.vue**
- Tabla reutilizable para mostrar historial de pagos
- Paginación, filtros y estados vacíos
- Header configurable y acciones personalizables
- Usado en: Vistas administrativas

**2.1.2.2 ui/FilaPago.vue**
- Fila individual de la tabla de pagos
- Información completa: usuario, plan, monto, estado, fecha, ID, notas
- Integración con PaymentActionButtons
- Usado en: TablaPagos.vue, PagosTab.vue

**2.1.2.3 ui/EmpresaItem.vue**
- Item individual para lista de empresas
- Información: nombre, cliente, estadísticas de pagos
- Estados de selección y acciones dropdown
- Usado en: PagosTab.vue (sidebar de empresas)

#### 2.1.3 Tarjetas y Contenedores
**2.1.3.1 ui/ServicioCard.vue**
- Tarjeta universal para mostrar servicios/planes
- Adaptable: plan, service, admin modes
- Imagen/icono, título, precio, descripción, acciones
- Usado en: ListaServicios.vue, vistas de servicios

**2.1.3.2 ui/PaymentStatusBadge.vue**
- Badge especializado para estados de pago
- Estados: Pagado, Pendiente, Abono, Liquidado
- Colores e iconos específicos por estado
- Usado en: FilaPago.vue, modales de pago

#### 2.1.4 Formularios y Selectores
**2.1.4.1 ui/ServiceSelector.vue**
- Selector avanzado de servicios predefinidos vs personalizados
- Modal interno para selección múltiple
- Cálculo automático de totales
- Usado en: Modales de creación/edición de pagos

**2.1.4.2 ui/SectionHeader.vue**
- Header reutilizable para secciones
- Título, subtítulo, icono, línea decorativa
- Tamaños y colores configurables
- Usado en: Múltiples vistas para consistencia visual

#### 2.1.5 Listas Especializadas
**2.1.5.1 ui/ListaServicios.vue**
- Contenedor inteligente para grids de servicios
- Configuración de columnas, estados vacíos, acciones
- Integración con ServicioCard
- Usado en: Vistas administrativas y públicas

### 2.2 Modales Especializados

#### 2.2.1 Modales de Gestión de Datos
**2.2.1.1 modals/CreatePaymentModal.vue**
- Modal completo para crear nuevos pagos
- Formulario multi-sección con validaciones
- Selector de servicios integrado
- Usado en: PagosTab.vue

**2.2.1.2 modals/CreatePaymentSidebar.vue**
- **MODAL PRINCIPAL**: Sidebar deslizante para crear pagos
- Layout complejo con múltiples secciones
- Servicios predefinidos vs personalizados
- Botones de liquidar/abonar con estados visuales
- Usado en: PagosTab.vue

**2.2.1.3 modals/PaymentEditModal.vue**
- Modal para editar pagos existentes
- Carga datos previos y permite modificaciones
- Selector de servicios dinámico
- Usado en: PagosTab.vue

**2.2.1.4 modals/PaymentDetailModal.vue**
- Modal de solo lectura para ver detalles completos del pago
- Timeline de actividad y información estructurada
- Botón para editar desde la vista de detalles
- Usado en: PagosTab.vue

**2.2.1.5 modals/PaymentActionModal.vue**
- Modal especializado para acciones de liquidar/abonar
- Formularios específicos según la acción
- Validaciones de montos y confirmaciones
- Usado en: PagosTab.vue

#### 2.2.2 Modales de Servicios y Planes
**2.2.2.1 modals/PlanModal.vue**
- Modal para crear nuevos planes
- Checkboxes para servicios incluidos
- Generación automática de HTML para detalles
- Usado en: ServiciosTab.vue

**2.2.2.2 modals/EditPlanModal.vue**
- Modal para editar planes existentes
- Carga datos previos de servicios incluidos
- Actualización de detalles HTML
- Usado en: ServiciosTab.vue

**2.2.2.3 modals/ServiceModal.vue**
- Modal para crear servicios individuales
- Upload de imágenes con preview
- Formulario completo con validaciones
- Usado en: ServiciosTab.vue

**2.2.2.4 modals/EditServiceModal.vue**
- Modal para editar servicios existentes
- Carga imagen y datos previos
- Actualización completa de información
- Usado en: ServiciosTab.vue

#### 2.2.3 Modales de Empresas y Usuarios
**2.2.3.1 modals/CompanyEditModal.vue**
- Modal para editar información de empresas
- Campos: nombre, cliente, email, teléfono, dirección, industria
- Usado en: PagosTab.vue

**2.2.3.2 modals/AdminModal.vue**
- Modal para agregar nuevos administradores
- Formulario completo con validaciones de rol
- Usado en: AdministradoresTab.vue

#### 2.2.4 Modales de Solicitudes
**2.2.4.1 modals/SolicitudModal.vue**
- **MODAL UNIVERSAL**: Para solicitar planes/servicios
- Formulario de contacto completo
- Integración directa con WhatsApp
- Usado en: ServiciosView.vue, vistas de detalle de servicios

### 2.3 Componentes de Layout

#### 2.3.1 Navegación Principal
**2.3.1.1 Navbar.vue**
- **COMPONENTE CRÍTICO**: Navegación principal del sitio
- Dropdown de servicios con enlaces directos
- Sistema de autenticación integrado
- Modal de login/registro incorporado
- Responsive con colapso en móviles
- Usado en: App.vue (global)

**2.3.1.2 Footer.vue**
- Footer global con enlaces, redes sociales y logo
- Tres columnas: navegación, redes sociales, información
- Responsive con reorganización en móviles
- Usado en: App.vue (global)

#### 2.3.2 Sistemas Globales
**2.3.2.1 CustomAlert.vue**
- **SISTEMA NERVIOSO**: Alertas globales de la aplicación
- 4 tipos: success, error, warning, info
- Animaciones de entrada/salida
- Auto-dismiss con barra de progreso
- Usado en: App.vue (global)

**2.3.2.2 ConfirmDialog.vue**
- Modal de confirmación elegante
- Reemplaza confirm() nativo del navegador
- Integración con useAlert composable
- Usado en: App.vue (global)

### 2.4 Componentes Especializados

#### 2.4.1 Servicios Específicos
**2.4.1.1 servicios/components/ServicioEmailCard.vue**
- Tarjeta especializada para servicios de email marketing
- Diseño específico con colores púrpura
- Badge "Más Popular" integrado
- Usado en: EmailMarketingView.vue

**2.4.1.2 servicios/components/PaqueteCard.vue**
- Tarjeta reutilizable para paquetes de servicios
- Badge de popularidad, características listadas
- Efectos hover y escalado
- Usado en: Múltiples vistas de detalle de servicios

#### 2.4.2 Componentes Legacy
**2.4.2.1 HelloWorld.vue**
- Componente de ejemplo de Vue (no utilizado en producción)
- Mantiene estructura básica de Vue
- No integrado en rutas principales

## 3. OTROS DIRECTORIOS

### 3.1 Stores (Estado Global)
**3.1.1 Propósito General**
- Gestión centralizada del estado de la aplicación usando Pinia
- Manejo de autenticación y datos de usuario

**3.1.1.1 auth.js**
- **STORE CRÍTICO**: Manejo completo de autenticación
- Estados: user, isAuthenticated, isAdmin, isClient
- Métodos: login(), logout()
- Credenciales de prueba integradas
- Usado en: TODA la aplicación para control de acceso

### 3.2 Composables (Lógica Reutilizable)
**3.2.1 Propósito General**
- Funciones reutilizables que encapsulan lógica compleja
- Patrón de Composition API para compartir funcionalidad

**3.2.1.1 useAlert.js**
- **COMPOSABLE UNIVERSAL**: Sistema de alertas globales
- Funciones: showSuccess(), showError(), showWarning(), showInfo(), showConfirm()
- Comunicación mediante eventos personalizados
- Usado en: Todos los componentes que necesitan mostrar notificaciones

### 3.3 Assets (Recursos Estáticos)
**3.3.1 Propósito General**
- Archivos de estilos, imágenes y recursos estáticos

**3.3.1.1 estiloadmin.css**
- **ESTILOS ESPECIALIZADOS**: CSS específico para vistas administrativas
- Clases para cards, botones, tablas y formularios de admin
- Sistema de colores y espaciado consistente
- Usado en: AdminView.vue y componentes administrativos

### 3.4 Configuración del Proyecto

#### 3.4.1 Archivos de Configuración
**3.4.1.1 package.json**
- Dependencias del proyecto: Vue 3, Vue Router, Pinia, Bootstrap, Animate.css
- Scripts de desarrollo: dev, build, preview
- Configuración de tipo módulo ES6

**3.4.1.2 vite.config.js**
- Configuración de Vite como bundler
- Plugin de Vue integrado
- Configuración de desarrollo y build

**3.4.1.3 index.html**
- Template HTML base de la aplicación
- Integración de Bootstrap Icons CDN
- Favicon personalizado de AxoWeb
- Punto de montaje de la aplicación Vue

#### 3.4.2 Documentación
**3.4.2.1 docs/marco-conceptual-frontend.md**
- Documentación académica completa del frontend
- Marco teórico y conceptual del proyecto
- Explicación de tecnologías y decisiones arquitectónicas

**3.4.2.2 README.md**
- Documentación básica del template Vue + Vite
- Información sobre IDE support y configuración

## 4. RELACIONES CRÍTICAS ENTRE COMPONENTES

### 4.1 Flujo de Autenticación
- **Navbar.vue** → **auth.js** → **AdminView.vue/ClienteView.vue**
- Modal de login en Navbar conecta con store de auth
- Redirección automática según rol de usuario

### 4.2 Sistema de Pagos
- **PagosTab.vue** → **CreatePaymentSidebar.vue** → **ServiceSelector.vue**
- **FilaPago.vue** → **PaymentActionButtons.vue** → **PaymentActionModal.vue**
- Flujo completo de gestión financiera

### 4.3 Sistema de Alertas
- **useAlert.js** → **CustomAlert.vue** → **ConfirmDialog.vue**
- Comunicación global mediante eventos personalizados
- Usado en TODOS los componentes para feedback

### 4.4 Formularios de Contacto
- **ContactForm.vue** → **WhatsApp API** (sin backend)
- **SolicitudModal.vue** → **WhatsApp API** (sin backend)
- Procesamiento local y envío directo a WhatsApp

### 4.5 Navegación y Rutas
- **main.js** → **Vue Router** → **Vistas específicas**
- Protección por roles y redirecciones automáticas
- Guards de navegación para seguridad

## 5. CARACTERÍSTICAS ARQUITECTÓNICAS DESTACADAS

### 5.1 Modularidad Extrema
- Cada componente tiene una responsabilidad específica
- Reutilización máxima de código
- Separación clara de concerns

### 5.2 Sistema de Comunicación
- Props para datos descendentes
- Eventos para comunicación ascendente
- Store global para estado compartido
- Composables para lógica reutilizable

### 5.3 Responsive Design Integral
- Breakpoints: 576px, 768px, 992px, 1200px
- Layouts que se adaptan inteligentemente
- Componentes que cambian comportamiento según pantalla

### 5.4 Integración WhatsApp
- **INNOVACIÓN CLAVE**: Formularios sin backend
- Generación automática de mensajes estructurados
- Integración directa con WhatsApp Business
- Eliminación completa de infraestructura de servidor

Esta arquitectura representa un **ECOSISTEMA COMPLETO** de gestión empresarial con **MODULARIDAD EXTREMA** y **ESCALABILIDAD PROFESIONAL**.