# Baby Shower Website

Un sitio web moderno de una sola página construido con Astro y React para un baby shower.

## 🚀 Inicio Rápido
### Instalación

```bash
pnpm install
```

### Desarrollo

```bash
pnpm dev
```

El sitio estará disponible en `http://localhost:4321`

### Build

```bash
pnpm build
```

### Preview

```bash
pnpm preview
```

## 🛠️ Tecnologías

- **Astro** - Framework web moderno
- **React** - Para componentes interactivos
- **Tailwind CSS** - Para estilos
- **TypeScript** - Para tipado estático

## 📁 Estructura del Proyecto

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── Countdown.tsx
│   │   ├── EventInfo.astro
│   │   └── RSVP.tsx
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## 🎨 Personalización

### Cambiar la fecha del evento

Edita el archivo `src/components/Countdown.tsx` y modifica la variable `eventDate`:

```typescript
const eventDate = new Date('2024-12-31T18:00:00').getTime();
```

### Modificar información del evento

Edita el archivo `src/components/EventInfo.astro` para cambiar la ubicación, fecha y detalles.

### Personalizar colores

Los colores están definidos usando clases de Tailwind CSS. Puedes modificar los gradientes y colores en los componentes.

## 🚀 Despliegue en Vercel

### Opción 1: Desde la Interfaz Web de Vercel

1. **Sube tu código a GitHub** (si aún no lo has hecho):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/tu-usuario/baby-shower.git
   git push -u origin main
   ```

2. **Importa el proyecto en Vercel**:
   - Ve a [vercel.com](https://vercel.com) e inicia sesión
   - Haz clic en "Add New Project"
   - Selecciona tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto Astro

3. **Configuración** (Vercel debería detectar esto automáticamente):
   - **Framework Preset**: Astro
   - **Root Directory**: `./`
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install`

4. **Haz clic en "Deploy"**

### Opción 2: Usando Vercel CLI

1. **Instala Vercel CLI**:
   ```bash
   pnpm add -g vercel
   ```

2. **Despliega**:
   ```bash
   vercel
   ```

3. **Para producción**:
   ```bash
   vercel --prod
   ```

### Configuración Automática

El proyecto incluye un archivo `vercel.json` con la configuración optimizada para Astro y pnpm. Vercel debería detectar automáticamente:
- ✅ Framework: Astro
- ✅ Package Manager: pnpm
- ✅ Build Command: `pnpm build`
- ✅ Output Directory: `dist`

## 📝 Notas

- El formulario RSVP actualmente solo muestra un mensaje de confirmación. Para producción, necesitarás conectar un backend o servicio de formularios.
- Asegúrate de actualizar la fecha del evento en los componentes antes de desplegar.
- Vercel proporciona un dominio gratuito (tu-proyecto.vercel.app) y puedes agregar un dominio personalizado desde el dashboard.

