# Nimble Gravity - Junior Fullstack Challenge

Este proyecto es la resolución de un technical challenge para la posición de Junior Fullstack Developer en Nimble Gravity. Se trata de una SPA (Single Page Application) que interactúa con la API de la empresa para validar la identidad del candidato, obtener posiciones laborales abiertas y procesar la postulación.

## ✨ Características Principales (Features)

Además de cumplir con los requisitos básicos solicitados, se implementaron mejoras enfocadas en la Experiencia de Usuario y la calidad del código:

* **Flujo de Autenticación Simulado:** Validación del email del candidato mediante un endpoint `GET`, manejando estados de carga y errores de red.
* **Listado Dinámico y Filtrado:** * Búsqueda en tiempo real de puestos disponibles (búsqueda por coincidencia de texto).
    * Ordenamiento alfabético (A-Z y Z-A) para facilitar la navegación.
    * Botón dinámico para limpiar la búsqueda rápidamente.
* **Gestión de Formularios "Inline":** Al aplicar a un puesto, el formulario se despliega dentro de la misma tarjeta. Se implementó el patrón de "estado elevado" (Lifting State Up) para asegurar que solo una tarjeta de postulación esté abierta a la vez.
* **Validaciones y Feedback de UI:** * Alertas de confirmación antes de enviar llamadas `POST` destructivas/finales.
    * Manejo de estados deshabilitados (`disabled`) en botones mientras se esperan respuestas de la API o si los inputs están vacíos.
    * Spinners de carga nativos implementados con CSS.
* **Diseño 100% Responsivo:** Interfaz adaptada "Mobile-First", garantizando una lectura y uso cómodo tanto en dispositivos móviles como en PC.

## 🛠️ Stack Tecnológico

El proyecto fue construido utilizando herramientas modernas para garantizar velocidad, tipado estricto y estilos mantenibles:

* **Core:** [React 18](https://react.dev/)
* **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) (Tipado estricto de interfaces para las respuestas de la API).
* **Build Tool:** [Vite](https://vitejs.dev/) (Tiempos de carga y HMR ultrarrápidos).
* **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) (Plugin nativo para Vite, sin archivos de configuración externos).

## 🏗️ Arquitectura y Estructura del Proyecto

Se optó por una arquitectura modular, separando la lógica de negocio (llamadas a la API) de la interfaz de usuario:

```text
src/
├── components/
│   ├── Login.tsx       # Componente de ingreso y validación inicial
│   ├── JobList.tsx     # Contenedor de la lista, lógica de búsqueda y ordenamiento
│   └── JobCard.tsx     # Tarjeta individual con la lógica del POST para aplicar
├── services/
│   └── api.ts          # Centralización de endpoints usando Fetch API y tipado TS
├── App.tsx             # Componente raíz y orquestador de estados globales
└── main.tsx            # Punto de entrada de la aplicación
```

##Instalación y Uso Local

Sigue estos pasos para correr el proyecto en tu entorno local:

1. **Clonar el repositorio:**
```bash
git clone https://github.com/Andres25ar/Challenge_Nimble_Gravity
```

2. **Navegar al directorio:**
```bash
cd Challenge_Nimble_Gravity
```

3. **Instalar dependencias:**
```bash
npm install
```

4. **Levantar el servidor de desarrollo:**
```bash
npm run dev
```

**La aplicación estará disponible en http://localhost:5173**

Desarrollado por Andres para Nimble Gravity - 2026