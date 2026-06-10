# ISS-013 — Setup .env.local y documentar configuración

**Estado:** 🔴 OPEN  
**Prioridad:** 🟡 Media  
**Etiquetas:** `config`, `docs`  

---

## Descripción

La aplicación requiere una `GROQ_API_KEY` para funcionar, pero no existe ningún archivo `.env.local.example` ni documentación sobre cómo obtenerla. El chat de Blado falla silenciosamente si no está configurado.

## Lo que falta

1. **`.env.local.example`** — Archivo de template con las variables requeridas
2. **Validación en startup** — Advertencia clara si falta la API key
3. **Documentación** — Cómo obtener la key y dónde ponerla

## Archivos a crear

### `.env.local.example`
```env
# Blado_Cavern — Variables de entorno
# Copiar este archivo a .env.local y completar los valores

# Groq AI API Key (requerida para el chat con Blado)
# Obtener en: https://console.groq.com/keys
GROQ_API_KEY=gsk_TU_API_KEY_AQUI
```

### Validación en `route.ts`
```typescript
// Verificar al inicio del handler
if (!process.env.GROQ_API_KEY) {
  return NextResponse.json(
    { reply: "⚠️ Blado está dormido... (GROQ_API_KEY no configurada)" },
    { status: 200 }  // No es un error del cliente
  );
}
```

### Agregar a `.gitignore`
Verificar que `.env.local` ya está en `.gitignore` (debería estar por defecto con Next.js).

## Criterios de aceptación

- [ ] `.env.local.example` creado con todas las variables documentadas
- [ ] `route.ts` valida la presencia de `GROQ_API_KEY` y devuelve mensaje amigable si falta
- [ ] `.env.local` está en `.gitignore`
- [ ] README principal documenta el paso de configuración del `.env`

## Estimación

~30 minutos
