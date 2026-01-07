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

## 🗄️ Configuración de Supabase

El proyecto está configurado para trabajar directamente con Supabase (PostgreSQL). No necesitas crear endpoints de API adicionales, ya que el código se conecta directamente a Supabase.

### Instalación

1. **Instala las dependencias** (incluye @supabase/supabase-js):
   ```bash
   pnpm install
   ```

2. **Configura las variables de entorno**:
   
   Crea un archivo `.env` en la raíz del proyecto basándote en `env.example`:
   
   ```env
   PUBLIC_SUPABASE_URL=***
   PUBLIC_SUPABASE_ANON_KEY=***
   ```

3. **Configura las políticas de seguridad en Supabase**:
   
   Ve a tu proyecto en Supabase → Authentication → Policies y asegúrate de que las tablas `gifts`, `guests` y `messages` tengan políticas que permitan:
   - **SELECT** (lectura) para todos los usuarios anónimos
   - **INSERT** (crear) para todos los usuarios anónimos
   - **UPDATE** (actualizar) para todos los usuarios anónimos
   
   O puedes usar políticas más restrictivas según tus necesidades de seguridad.

### Operaciones Disponibles

**Gifts (Regalos)**
- `fetchGifts()` - Obtener lista de regalos desde Supabase
- `reserveGift()` - Reservar un regalo (actualiza `reservations` array)

**Guests (Invitados)**
- `fetchGuests()` - Obtener lista de invitados
- `updateGuestConfirmation()` - Actualizar confirmación de invitado

**Messages (Mensajes)**
- `fetchMessages()` - Obtener mensajes ordenados por fecha
- `createMessage()` - Crear nuevo mensaje
- `likeMessage()` - Incrementar likes de un mensaje

### Esquema de Base de Datos

El código está sincronizado con las siguientes tablas:

- **gifts**: `id` (uuid), `name`, `description`, `category`, `price_range`, `icon`, `status`, `reserved_by`, `group_members` (text[]), `reservations` (text[]), `image_url`, `product_url`
- **guests**: `id` (bigint), `name`, `confirmed` (boolean), `confirmed_at`, `created_at`, `category`
- **messages**: `id` (uuid), `author_name`, `content`, `likes` (integer), `created_at`

### Lógica de Estados

- **Gifts**: Si `status === 'available'` o es `null`, el botón de reservar está habilitado. Si tiene `reserved_by` o `reservations`, se muestran los nombres de quienes reservaron.
- **Guests**: `confirmed` es un boolean (true/false), no null.
- **Messages**: Se ordenan por `created_at` descendente (más recientes primero).

## 📝 Notas

- El proyecto se conecta directamente a Supabase usando el cliente JavaScript. No necesitas crear endpoints de API adicionales.
- **Importante**: Configura las políticas de Row Level Security (RLS) en Supabase para permitir las operaciones necesarias.
- Para producción en Vercel, agrega las variables de entorno `PUBLIC_SUPABASE_URL` y `PUBLIC_SUPABASE_ANON_KEY` en la configuración del proyecto.
- Asegúrate de actualizar la fecha del evento en los componentes antes de desplegar.
- Vercel proporciona un dominio gratuito (tu-proyecto.vercel.app) y puedes agregar un dominio personalizado desde el dashboard.

## 🔒 Configuración de Seguridad en Supabase

Para que la aplicación funcione correctamente, necesitas configurar las políticas de seguridad en Supabase:

1. Ve a tu proyecto en [Supabase Dashboard](https://supabase.com/dashboard)
2. Navega a **Authentication** → **Policies**
3. Para cada tabla (`gifts`, `guests`, `messages`), crea políticas que permitan:

   **Para lectura (SELECT):**
   ```sql
   CREATE POLICY "Allow public read access" ON gifts FOR SELECT USING (true);
   CREATE POLICY "Allow public read access" ON guests FOR SELECT USING (true);
   CREATE POLICY "Allow public read access" ON messages FOR SELECT USING (true);
   ```

   **Para inserción (INSERT):**
   ```sql
   CREATE POLICY "Allow public insert" ON gifts FOR INSERT WITH CHECK (true);
   CREATE POLICY "Allow public insert" ON guests FOR INSERT WITH CHECK (true);
   CREATE POLICY "Allow public insert" ON messages FOR INSERT WITH CHECK (true);
   ```

   **Para actualización (UPDATE):**
   ```sql
   CREATE POLICY "Allow public update" ON gifts FOR UPDATE USING (true);
   CREATE POLICY "Allow public update" ON guests FOR UPDATE USING (true);
   CREATE POLICY "Allow public update" ON messages FOR UPDATE USING (true);
   ```

   ⚠️ **Nota de Seguridad**: Estas políticas permiten acceso público completo. Para producción, considera políticas más restrictivas según tus necesidades.

