# Configuración Rápida de Supabase

## Paso 1: Instalar Dependencias

```bash
pnpm install
```

## Paso 2: Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
PUBLIC_SUPABASE_URL=***
PUBLIC_SUPABASE_ANON_KEY=***
```

## Paso 3: Configurar Políticas de Seguridad en Supabase

1. Ve a tu proyecto en [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecciona tu proyecto: `ojyewweewbdstognxkje`
3. Ve a **SQL Editor**
4. Ejecuta los siguientes comandos SQL:

### Para la tabla `gifts`:

```sql
-- Habilitar RLS
ALTER TABLE gifts ENABLE ROW LEVEL SECURITY;

-- Política de lectura
CREATE POLICY "Allow public read access" ON gifts FOR SELECT USING (true);

-- Política de inserción
CREATE POLICY "Allow public insert" ON gifts FOR INSERT WITH CHECK (true);

-- Política de actualización
CREATE POLICY "Allow public update" ON gifts FOR UPDATE USING (true);
```

### Para la tabla `guests`:

```sql
-- Habilitar RLS
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;

-- Política de lectura
CREATE POLICY "Allow public read access" ON guests FOR SELECT USING (true);

-- Política de inserción
CREATE POLICY "Allow public insert" ON guests FOR INSERT WITH CHECK (true);

-- Política de actualización
CREATE POLICY "Allow public update" ON guests FOR UPDATE USING (true);
```

### Para la tabla `messages`:

```sql
-- Habilitar RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Política de lectura
CREATE POLICY "Allow public read access" ON messages FOR SELECT USING (true);

-- Política de inserción
CREATE POLICY "Allow public insert" ON messages FOR INSERT WITH CHECK (true);

-- Política de actualización
CREATE POLICY "Allow public update" ON messages FOR UPDATE USING (true);
```

## Paso 4: Probar la Conexión

```bash
pnpm dev
```

Abre tu navegador en `http://localhost:4321` y verifica que:
- La sección de regalos carga los datos
- La sección de confirmación muestra los invitados
- Puedes enviar mensajes

## Paso 5: Desplegar en Vercel

1. En el dashboard de Vercel, ve a tu proyecto
2. Ve a **Settings** → **Environment Variables**
3. Agrega las siguientes variables:
   - `PUBLIC_SUPABASE_URL` = `***`
   - `PUBLIC_SUPABASE_ANON_KEY` = `***`
4. Haz un nuevo deploy

## Solución de Problemas

### Error: "Supabase credentials not found"
- Verifica que el archivo `.env` existe en la raíz del proyecto
- Asegúrate de que las variables comienzan con `PUBLIC_`
- Reinicia el servidor de desarrollo después de crear/modificar `.env`

### Error: "permission denied for table"
- Verifica que las políticas RLS están configuradas correctamente
- Asegúrate de que RLS está habilitado pero las políticas permiten acceso público

### Los datos no se cargan
- Abre la consola del navegador (F12) y revisa los errores
- Verifica en Supabase Dashboard que las tablas tienen datos
- Verifica que los nombres de las tablas coinciden exactamente: `gifts`, `guests`, `messages`

