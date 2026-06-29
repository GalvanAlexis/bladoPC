# ISS-089: Sistema de seguridad para panel admin (JWT + bcrypt + middleware)

## Resumen
El panel admin actual no tiene seguridad real: pass en texto plano, sin tokens, sin sesion, sin proteccion en rutas. Este ISS implementa autenticacion robusta con bcrypt para hash de password, JWT para sesion via httpOnly cookie, y middleware de Next.js para proteger rutas admin.

## Arquitectura de red (contexto)

```
Usuario Internet
  -> Vercel Edge Network (CDN / Load Balancer nativo)
    -> Next.js App
      -> /api/admin/login  (POST - publico, genera JWT)
      -> /api/admin/*      (GET/POST/PUT/DELETE - protegido por middleware JWT)
      -> Supabase/DB       (solo accesible desde server-side, nunca desde el cliente)
```

El edge network de Vercel actua como CDN/load balancer: termina SSL, filtra DDoS basico, distribuye a regiones. Ningun cliente golpea directo a la DB o al servidor de aplicacion sin pasar por esa capa.

## Archivos nuevos
- src/middleware.ts

## Archivos a modificar
- src/app/api/admin/login/route.ts
- src/lib/auth.ts (nuevo, utilidades JWT + bcrypt)
- src/components/home/AdminLogin.tsx
- .env.local
- .env.local.example

## Tareas

### 1. Generar hash bcrypt de la password
- [x] Generar hash de la password actual con bcrypt (salt rounds 12)
- [x] Guardar en .env.local como ADMIN_PASS_HASH_B64 (base64 para evitar que $ se expanda en dotenv)
- [x] Documentar en .env.local.example
- [x] NOTA: dotenv expande $var en valores. bcrypt hash contiene $. Se usa base64 como workaround.
      `getAdminHash()` en auth.ts decodifica base64 o usa ADMIN_PASS_HASH raw si existe.

### 2. Crear lib/auth.ts (utilidades compartidas)
- [ ] `verifyPassword(plain: string, hash: string): boolean` - bcrypt.compare
- [ ] `signToken(payload: object): string` - jwt.sign con exp 24h
- [ ] `verifyToken(token: string): payload | null` - jwt.verify
- [ ] `JWT_SECRET` desde env var con fallback a generado en memoria
- [ ] `setAuthCookie(response: NextResponse, token: string)` - setea httpOnly cookie
- [ ] `clearAuthCookie(response: NextResponse)` - elimina cookie
- [ ] `getTokenFromRequest(request: NextRequest): string | null` - extrae de cookie

### 3. Refactor /api/admin/login/route.ts
- [ ] Recibir username + password del body
- [ ] Verificar username contra ADMIN_USER (env var)
- [ ] Verificar password con bcrypt.compare contra ADMIN_PASS_HASH (env var)
- [ ] Si ok: firmar JWT con { username, role: 'admin', iat, exp }
- [ ] Setear httpOnly cookie segura (Secure, SameSite=Lax, Path=/, maxAge=86400)
- [ ] Devolver { success: true }
- [ ] Si no: 401 con error generico (no revelar cual campo fallo)

### 4. Crear src/middleware.ts
- [ ] Matcher: /api/admin/:path* (excepto /api/admin/login)
- [ ] Extraer JWT de cookie 'admin_token'
- [ ] Si valido: pasar request (agregar header x-admin-authenticated)
- [ ] Si invalido/expirado: 401

### 5. Actualizar AdminLogin.tsx
- [ ] En success, guardar token en memoria (opcional, la cookie httpOnly ya maneja sesion)
- [ ] callback onSuccess se ejecuta normalmente
- [ ] El dashboard se muestra si el usuario esta autenticado via cookie

### 6. Seguridad adicional (futuro)
La cookie httpOnly impide acceso via JS (XSS). SameSite=Lax protege contra CSRF basico.
Para proteccion completa a futuro: CSRF token, rate limiting, IP-based access list.

## QA
- [ ] npm test (13 tests deben seguir pasando)
- [ ] npm run build (build exitoso)
- [ ] Verificar login con credenciales correctas -> 200 + cookie set
- [ ] Verificar login con credenciales incorrectas -> 401
- [ ] Verificar request a /api/admin/* sin cookie -> 401
- [ ] Verificar request a /api/admin/login sin cookie -> 200 (publico)

## Branch
feature/ISS-089-seguridad-admin-token-jwt