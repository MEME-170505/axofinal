# 🌳 ESTRUCTURA DE CARPETAS DEL PROYECTO AXOWEB DIGITAL

```
📁 axoweb-digital-frontend/
├── 📄 README.md                                    # Documentación básica del proyecto
├── 📄 package.json                                 # Dependencias y scripts del proyecto
├── 📄 package-lock.json                           # Versiones exactas de dependencias
├── 📄 vite.config.js                              # Configuración de Vite (bundler)
├── 📄 index.html                                   # Template HTML principal
├── 📄 .gitignore                                   # Archivos ignorados por Git
│
├── 📁 public/                                      # Archivos estáticos públicos
│   └── 📄 vite.svg                                # Logo de Vite
│
├── 📁 src/                                         # 🔥 CÓDIGO FUENTE PRINCIPAL
│   ├── 📄 main.js                                 # ⚡ NÚCLEO - Punto de entrada de la aplicación
│   ├── 📄 App.vue                                 # 🏗️ COMPONENTE RAÍZ - Layout principal
│   ├── 📄 style.css                               # 🎨 ESTILOS GLOBALES - Variables CSS y diseño base
│   │
│   ├── 📁 views/                                   # 📄 VISTAS PRINCIPALES
│   │   │
│   │   ├── 📁 publicas/                           # 🌍 VISTAS PÚBLICAS (sin autenticación)
│   │   │   │
│   │   │   ├── 📁 inicio/                         # 🏠 PÁGINA PRINCIPAL
│   │   │   │   ├── 📄 InicioView.vue              # Vista principal del sitio
│   │   │   │   └── 📁 components/                 # Componentes específicos del inicio
│   │   │   │       ├── 📄 HeroInicio.vue          # Sección hero con logo y banner
│   │   │   │       ├── 📄 ServiciosInicio.vue     # Grid de servicios principales
│   │   │   │       ├── 📄 CreenciaSeccion.vue     # Sección "Creemos tu negocio digital"
│   │   │   │       └── 📄 ProyectosSeccion.vue    # Galería de proyectos con flip cards
│   │   │   │
│   │   │   ├── 📁 servicios/                      # 🛠️ SERVICIOS Y PLANES
│   │   │   │   ├── 📄 ServiciosView.vue           # Vista principal de servicios
│   │   │   │   ├── 📁 components/                 # Componentes de servicios
│   │   │   │   │   ├── 📄 HeroServicios.vue       # Hero con tarjetas flotantes animadas
│   │   │   │   │   ├── 📄 PlanesSection.vue       # Sección de planes principales
│   │   │   │   │   ├── 📄 PlanCard.vue            # Tarjeta individual de plan
│   │   │   │   │   ├── 📄 ServiciosIndividualesSection.vue # Servicios con filtros
│   │   │   │   │   ├── 📄 ServicioCard.vue        # Tarjeta de servicio individual
│   │   │   │   │   ├── 📄 CTASection.vue          # Call-to-action final
│   │   │   │   │   └── 📄 ServicioEmailCard.vue   # Tarjeta especializada email marketing
│   │   │   │   │
│   │   │   │   └── 📁 detalle/                    # 🔍 PÁGINAS DETALLE DE SERVICIOS
│   │   │   │       ├── 📄 DesarrolloWebView.vue   # Detalle desarrollo web
│   │   │   │       ├── 📄 EmailMarketingView.vue  # Detalle email marketing
│   │   │   │       ├── 📄 DisenoUIUXView.vue      # Detalle diseño UI/UX
│   │   │   │       ├── 📄 MarketingDigitalView.vue # Detalle marketing digital
│   │   │   │       ├── 📄 AutomatizacionView.vue  # Detalle automatización
│   │   │   │       └── 📄 PaqueteCard.vue         # Componente reutilizable para paquetes
│   │   │   │
│   │   │   ├── 📁 sobre-nosotros/                 # ℹ️ INFORMACIÓN INSTITUCIONAL
│   │   │   │   ├── 📄 SobreNosotrosView.vue       # Vista principal sobre nosotros
│   │   │   │   └── 📁 components/                 # Secciones institucionales
│   │   │   │       ├── 📄 MisionSeccion.vue       # Sección misión empresarial
│   │   │   │       ├── 📄 VisionSeccion.vue       # Sección visión empresarial
│   │   │   │       ├── 📄 FilosofiaSeccion.vue    # Sección filosofía empresarial
│   │   │   │       └── 📄 ValoresSeccion.vue      # Grid de valores con tarjetas
│   │   │   │
│   │   │   └── 📁 contactanos/                    # 📞 CONTACTO Y FORMULARIOS
│   │   │       ├── 📄 ContactanosView.vue         # Vista principal de contacto
│   │   │       └── 📁 components/                 # Componentes de contacto
│   │   │           ├── 📄 ContactForm.vue         # 🔥 FORMULARIO SIN BD → WhatsApp
│   │   │           └── 📄 ContactInfo.vue         # Tarjetas informativas de contacto
│   │   │
│   │   ├── 📁 privadas/                           # 🔐 VISTAS PRIVADAS (requieren autenticación)
│   │   │   │
│   │   │   ├── 📁 clientes/                       # 👤 ÁREA DE CLIENTES
│   │   │   │   ├── 📄 ClienteView.vue             # Panel principal del cliente
│   │   │   │   └── 📁 components/                 # Componentes específicos del cliente
│   │   │   │       ├── 📄 ClienteHeader.vue       # Header con info del usuario
│   │   │   │       ├── 📄 ClienteNavigation.vue   # Navegación por pestañas
│   │   │   │       ├── 📄 ClienteInicio.vue       # Formulario editable de datos
│   │   │   │       └── 📄 ClienteServicios.vue    # Tabla de servicios contratados
│   │   │   │
│   │   │   └── 📁 administradores/                # 👑 ÁREA DE ADMINISTRACIÓN
│   │   │       ├── 📄 AdminView.vue               # Panel principal de admin
│   │   │       └── 📁 components/                 # Componentes administrativos
│   │   │           ├── 📄 AdminHeader.vue         # Header del panel admin
│   │   │           ├── 📄 AdminNavigation.vue     # Navegación principal del admin
│   │   │           ├── 📄 ClientesTab.vue         # Gestión de clientes registrados
│   │   │           ├── 📄 AdministradoresTab.vue  # Gestión de usuarios admin
│   │   │           ├── 📄 ServiciosTab.vue        # Gestión de planes y servicios
│   │   │           └── 📄 PagosTab.vue            # 💰 VISTA MÁS CRÍTICA - Centro financiero
│   │   │
│   │   ├── 📁 ofertas/                            # 🎯 LANDING PAGES ESPECIALIZADAS
│   │   │   ├── 📄 Ecommerce.vue                   # Landing para servicios e-commerce
│   │   │   └── 📄 Marketing.vue                   # Landing para marketing digital
│   │   │
│   │   ├── 📄 Error404.vue                        # 🚨 Página de error personalizada
│   │   └── 📄 PaymentSuccess.vue                  # ✅ Confirmación de pago exitoso
│   │
│   ├── 📁 components/                              # 🧩 COMPONENTES REUTILIZABLES
│   │   │
│   │   ├── 📄 Navbar.vue                          # 🔥 NAVEGACIÓN PRINCIPAL - Con autenticación
│   │   ├── 📄 Footer.vue                          # Footer global con enlaces y redes
│   │   ├── 📄 CustomAlert.vue                     # 🚨 SISTEMA NERVIOSO - Alertas globales
│   │   ├── 📄 ConfirmDialog.vue                   # Modal de confirmación elegante
│   │   ├── 📄 HelloWorld.vue                      # Componente de ejemplo (no usado)
│   │   │
│   │   ├── 📁 ui/                                 # 🎨 COMPONENTES DE UI BASE
│   │   │   ├── 📄 BotonPrimario.vue               # 🔥 COMPONENTE FUNDAMENTAL - Botón universal
│   │   │   ├── 📄 SectionHeader.vue               # Header reutilizable para secciones
│   │   │   ├── 📄 ServicioCard.vue                # Tarjeta universal para servicios/planes
│   │   │   ├── 📄 ListaServicios.vue              # Contenedor inteligente para grids
│   │   │   ├── 📄 ServiceSelector.vue             # Selector avanzado de servicios
│   │   │   ├── 📄 TablaPagos.vue                  # Tabla reutilizable de pagos
│   │   │   ├── 📄 FilaPago.vue                    # Fila individual de pago
│   │   │   ├── 📄 PaymentStatusBadge.vue          # Badge de estado de pago
│   │   │   ├── 📄 PaymentActionButtons.vue        # Grupo de botones para acciones de pago
│   │   │   └── 📄 EmpresaItem.vue                 # Item de empresa para sidebar
│   │   │
│   │   └── 📁 modals/                             # 🎭 MODALES ESPECIALIZADOS
│   │       ├── 📄 SolicitudModal.vue              # 📧 MODAL UNIVERSAL - Solicitar servicios
│   │       ├── 📄 CreatePaymentModal.vue          # Modal básico para crear pagos
│   │       ├── 📄 CreatePaymentSidebar.vue        # 🔥 MODAL PRINCIPAL - Sidebar deslizante
│   │       ├── 📄 PaymentEditModal.vue            # Modal para editar pagos
│   │       ├── 📄 PaymentDetailModal.vue          # Modal de detalles de pago
│   │       ├── 📄 PaymentActionModal.vue          # Modal para liquidar/abonar
│   │       ├── 📄 CompanyEditModal.vue            # Modal para editar empresas
│   │       ├── 📄 PlanModal.vue                   # Modal para crear planes
│   │       ├── 📄 EditPlanModal.vue               # Modal para editar planes
│   │       ├── 📄 ServiceModal.vue                # Modal para crear servicios
│   │       ├── 📄 EditServiceModal.vue            # Modal para editar servicios
│   │       └── 📄 AdminModal.vue                  # Modal para agregar administradores
│   │
│   ├── 📁 stores/                                  # 🏪 GESTIÓN DE ESTADO GLOBAL
│   │   └── 📄 auth.js                             # 🔐 STORE CRÍTICO - Autenticación completa
│   │
│   ├── 📁 composables/                             # 🔧 LÓGICA REUTILIZABLE
│   │   └── 📄 useAlert.js                         # 🔥 COMPOSABLE UNIVERSAL - Sistema de alertas
│   │
│   ├── 📁 assets/                                  # 📦 RECURSOS ESTÁTICOS
│   │   ├── 📄 estiloadmin.css                     # Estilos específicos para vistas admin
│   │   └── 📄 vue.svg                             # Logo de Vue (no usado)
│   │
│   └── 📁 docs/                                    # 📚 DOCUMENTACIÓN DEL PROYECTO
│       ├── 📄 arquitectura-proyecto.md            # Documentación estructurada completa
│       ├── 📄 marco-conceptual-frontend.md        # Marco teórico para tesis
│       └── 📄 evidencias-tesis.md                 # Evidencias completas para tesis
│
└── 📁 public/                                      # 🌐 ARCHIVOS PÚBLICOS
    └── 📄 vite.svg                                # Favicon y recursos públicos
```

## 🔥 **ANÁLISIS ESTRUCTURAL PROFUNDO:**

### **📊 MÉTRICAS DEL PROYECTO:**
- **Total de archivos Vue**: 47 componentes
- **Vistas principales**: 15 páginas
- **Componentes reutilizables**: 32 elementos
- **Modales especializados**: 12 interfaces
- **Niveles de anidación**: 5 niveles máximo

### **🏗️ ARQUITECTURA POR CAPAS:**

#### **CAPA 1 - CONFIGURACIÓN BASE:**
```
📄 main.js          → Configuración central
📄 App.vue          → Layout principal
📄 style.css        → Identidad visual
📄 package.json     → Dependencias
```

#### **CAPA 2 - VISTAS PRINCIPALES:**
```
📁 views/publicas/     → Páginas sin autenticación
📁 views/privadas/     → Páginas con autenticación
📁 views/ofertas/      → Landing pages especializadas
```

#### **CAPA 3 - COMPONENTES REUTILIZABLES:**
```
📁 components/ui/      → Elementos básicos de UI
📁 components/modals/  → Interfaces de interacción
📄 Navbar.vue         → Navegación global
📄 Footer.vue         → Footer global
```

#### **CAPA 4 - LÓGICA Y ESTADO:**
```
📁 stores/            → Estado global (Pinia)
📁 composables/       → Lógica reutilizable
📁 assets/            → Recursos estáticos
```

### **🎯 PATRONES ARQUITECTÓNICOS IDENTIFICADOS:**

#### **1. SEPARACIÓN POR RESPONSABILIDAD:**
- **Vistas**: Páginas completas con layout
- **Componentes**: Elementos reutilizables
- **Modales**: Interfaces de interacción específicas
- **UI**: Componentes base del sistema de diseño

#### **2. ORGANIZACIÓN JERÁRQUICA:**
- **Públicas vs Privadas**: Separación por nivel de acceso
- **Componentes locales**: Dentro de carpetas de vistas específicas
- **Componentes globales**: En carpeta components raíz

#### **3. MODULARIDAD EXTREMA:**
- **Un archivo = Una responsabilidad**
- **Componentes especializados** para cada función
- **Reutilización máxima** de código

#### **4. ESCALABILIDAD PLANIFICADA:**
- **Estructura extensible** para nuevas funcionalidades
- **Separación clara** entre lógica y presentación
- **Documentación integrada** para mantenimiento

### **🚀 INNOVACIONES ESTRUCTURALES:**

#### **SISTEMA DE FORMULARIOS SIN BD:**
```
ContactForm.vue → Procesamiento local → WhatsApp API
SolicitudModal.vue → Validación cliente → Mensaje estructurado
```

#### **GESTIÓN DE ESTADO CENTRALIZADA:**
```
auth.js → Estado global → Todos los componentes
useAlert.js → Comunicación universal → Sistema de eventos
```

#### **MODALES ESPECIALIZADOS:**
```
CreatePaymentSidebar.vue → Sidebar complejo
PaymentActionModal.vue → Acciones específicas
ServiceSelector.vue → Selector avanzado
```

### **📱 RESPONSIVE DESIGN INTEGRAL:**
- **Breakpoints**: 576px, 768px, 992px, 1200px
- **Layouts adaptativos** en todos los componentes
- **Navegación colapsable** en dispositivos móviles
- **Grids flexibles** que se reorganizan automáticamente

Esta estructura representa un **ECOSISTEMA COMPLETO** de desarrollo frontend con **ARQUITECTURA PROFESIONAL** y **ESCALABILIDAD EMPRESARIAL**.