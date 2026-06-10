# ISS-023 — Aviso de Privacidad

**Estado:** 🔴 OPEN  
**Prioridad:** 🟢 Baja  
**Etiquetas:** `legal`, `ui`, `accesibilidad`  
**Depende de:** ISS-022 (Visitor Analytics — sin este, no hay tracking que informar)

---

## Descripción

Una vez que ISS-022 esté implementado, el sitio recopilará datos de visita (país, ciudad, dispositivo, browser). La **Ley 25.326 de Protección de Datos Personales** de Argentina (equivalente al GDPR europeo) requiere informar a los usuarios sobre esta recopilación.

Para un sitio de portafolio personal de escala pequeña, un **aviso discreto en el footer** es suficiente. No se requiere un banner de cookies ni consentimiento explícito, dado que:
- No se almacena la IP directamente.
- Solo se recopilan datos de origen geográfico y técnicos (país, ciudad, browser).
- El propósito es exclusivamente estadístico/personal del creador.
- No se comparten datos con terceros.

---

## Implementación

### Texto propuesto para el footer

```
Este sitio recopila datos anónimos de visita (país, dispositivo, referrer)
con fines estadísticos. No se almacenan IPs ni datos de identificación personal.
```

### Componente Footer

Agregar o modificar el footer en el layout principal. Si no existe un componente Footer, crearlo:

**Opción A — Agregar a `src/app/layout.tsx`:**
```tsx
<footer className="fixed bottom-0 left-0 right-0 py-1 px-4 text-center text-[10px] text-gray-600 bg-black/50 backdrop-blur-sm z-50">
  Este sitio registra datos anónimos de visita con fines estadísticos.{' '}
  <span className="text-gray-700">No se almacenan IPs ni datos de identificación personal.</span>
</footer>
```

**Opción B — Toast discreto (recomendada para UX):**
Mostrar el aviso como un toast pequeño en la primera visita (guardado en `localStorage`), que desaparece automáticamente luego de 5 segundos:

```typescript
// En AppShell.tsx, junto al tracking:
const [showPrivacyNotice, setShowPrivacyNotice] = useState(false);

useEffect(() => {
  const seen = localStorage.getItem('blado_privacy_seen');
  if (!seen) {
    setShowPrivacyNotice(true);
    localStorage.setItem('blado_privacy_seen', '1');
    setTimeout(() => setShowPrivacyNotice(false), 5000);
  }
}, []);
```

Con el JSX correspondiente:
```tsx
{showPrivacyNotice && (
  <div className="fixed bottom-4 left-4 z-50 max-w-xs bg-gray-900/90 border border-gray-700 
                  rounded-lg px-4 py-3 text-xs text-gray-400 backdrop-blur-sm 
                  animate-fade-in shadow-lg">
    🔒 Este sitio registra datos anónimos de visita (país, dispositivo) con fines estadísticos.
  </div>
)}
```

---

## Archivos a crear/modificar

| Archivo | Acción |
|---|---|
| `src/components/AppShell.tsx` | Modificar (añadir lógica de aviso) |
| `src/app/layout.tsx` | Modificar si se elige la opción footer fijo |

---

## Criterios de aceptación

- [ ] En la primera visita, se muestra el aviso de privacidad
- [ ] En visitas posteriores (misma sesión de browser), el aviso NO se muestra
- [ ] El aviso no interfiere con la interacción principal de la Visual Novel
- [ ] El texto cumple con los requisitos mínimos de la Ley 25.326 (informar propósito y ausencia de IP)

---

## Referencia Legal

- **Ley 25.326** — Ley de Protección de los Datos Personales de Argentina
- **Resolución AAIP 47/2018** — Buenas prácticas para tratamiento de datos en plataformas digitales
- El sitio no requiere registro ante la AAIP dado que el tratamiento es exclusivamente personal/estadístico del propio creador.

---

## Estimación

~15 minutos
