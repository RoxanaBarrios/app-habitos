# app-habitos

## Configuración inicial

1. Instala dependencias:

```bash
npm install
```

2. Crea tu archivo `.env` desde la plantilla:

```bash
copy .env.example .env
```

3. En Supabase abre `Project Settings > API` y pega en `.env`:

- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`

4. Inicia Expo limpiando caché:

```bash
npx expo start -c
```