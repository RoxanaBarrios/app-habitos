# app-habitos

Aplicación para crear y mantener hábitos durante 21 días consecutivos. Cuando completes un hábito durante 21 días seguidos, se marca como adquirido y se agrega a tu historial.

## 🚀 Configuración inicial

### Paso 1: Instalar dependencias
```bash
npm install
```

### Paso 2: Configurar Supabase

1. Ve a [supabase.com](https://supabase.com) y crea/inicia sesión en tu proyecto
2. Abre el archivo [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
3. Copia TODO el SQL que aparece ahí
4. Ve a tu proyecto en Supabase → **SQL Editor** → **New Query**
5. Pega el SQL y ejecuta
6. Espera a que se creen todas las tablas

### Paso 3: Configurar variables de entorno

1. Ve a tu proyecto en Supabase → **Project Settings** → **API**
2. Copia el **Project URL** (ej: `https://xxxxx.supabase.co`)
3. Copia el **anon public key**
4. Crea un archivo `.env` en la raíz (copia desde `.env.example`)
5. Pega tus credenciales:
```
EXPO_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

### Paso 4: Ejecutar la app

```bash
npx expo start -c
```

Luego presiona:
- `w` para abrir en el navegador (recomendado para probar)
- `a` para Android (requiere emulador)
- `i` para iOS (requiere Mac)

## 📋 Características

✅ **Crear hábitos** con nombre, descripción, categoría y color
✅ **Racha individual** - Cuenta días consecutivos por hábito
✅ **Racha general** - Cuenta días seguidos con al menos 1 hábito completado
✅ **21 días** - Automáticamente se marca como adquirido al completar 21 días
✅ **Métricas** - Progreso del día, racha general, hábitos adquiridos
✅ **Autenticación** - Login/Registro seguro con Supabase
✅ **Persistencia** - Todo guardado en base de datos

## 📁 Estructura del proyecto

```
src/
├── components/       # Componentes UI
├── controllers/      # Lógica de negocio
├── lib/             # Configuración Supabase
├── models/          # Interfaces de datos
├── screens/         # Pantallas principales
└── storage/         # Servicios de almacenamiento
```

## 🔐 Seguridad

- RLS (Row Level Security) activado en todas las tablas
- Cada usuario solo puede ver/editar sus propios datos
- Autenticación con Supabase Auth

## 🐛 Troubleshooting

**Error: "Cannot find EXPO_PUBLIC_SUPABASE_URL"**
- Verifica que el archivo `.env` existe en la raíz
- Reinicia Expo: `npx expo start -c`

**Error: "Tables don't exist"**
- Ejecuta el SQL de `SUPABASE_SETUP.md` en el SQL Editor de Supabase

**Error: "Cannot use JSX"**
- Asegúrate que los archivos `.tsx` tienen la extensión correcta (no `.ts`)
