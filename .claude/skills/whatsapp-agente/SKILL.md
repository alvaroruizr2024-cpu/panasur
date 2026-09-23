---
name: whatsapp-agente
description: 'Diseña o monta un agente de IA que conteste WhatsApp (bandeja multi-agente, handoff a humano, notas, coste por conversación) separando lo real y verificable (open-wa + MCP, YCloud/Cloud API oficial) del marketing de un curso de pago. Úsala SIEMPRE que pidan "conectar Claude a WhatsApp", "un bot de WhatsApp con IA", "un inbox de WhatsApp con agentes", "automatizar WhatsApp Business", "qué es open-wa", "evitar que baneen mi WhatsApp por bot", "es real el WhatsApp SaaS de Ben Cord / Imperio Agéntico", o al pegar un video/TikTok de agentes de WhatsApp para analizarlo o replicarlo. También al dudar entre WhatsApp Web no oficial (QR) y la Cloud API oficial vía un BSP (YCloud/Twilio/360dialog). Casos INNOVAQ/PANASUR - recordatorios de inducción o EPP por WhatsApp, soporte de SIG360/ERP360 con derivación a humano, agenda de visitas de obra. Use for any request to connect Claude/an AI agent to WhatsApp, build a WhatsApp bot/inbox, or evaluate a WhatsApp-AI course video.'
---

# Agente de WhatsApp con Claude — qué es real y cómo montarlo

Esta skill nace de un TikTok de [@ben_cord](https://www.tiktok.com/@ben_cord) ("Esto es
una genialidad. Claude directamente con tu WhatsApp..."): muestra un panel propio
("WhatsApp SaaS") con tres agentes configurables, 40 herramientas de WhatsApp y un
`docker compose up -d` que levanta contenedores `openwa-api` / `openwa-redis`, todo
vendido como acceso a una comunidad de pago ("Imperio Agéntico", comentar "IMPERIO" para
recibir el repo por DM). El video omite justo lo que importa para decidir si esto sirve:
que el "comando clonas el repo" es privado y de pago, que el motor real detrás
(`openwa-api`) es un proyecto open-source con advertencia explícita de riesgo de baneo, y
que existe una vía oficial (Cloud API + BSP) sin ese riesgo. Aquí se restituye eso.

---

## 0. Qué es real y qué no (léelo antes de prometer nada al usuario)

| Afirmación del video | Es... |
|---|---|
| Contenedores `openwa-api`/`openwa-redis`, "40 herramientas para WhatsApp" | **Real y verificable**: es **open-wa / wa-automate** (`github.com/open-wa/wa-automate-nodejs`), un toolkit open-source que expone WhatsApp Web como API y trae un **servidor MCP nativo** que convierte cada método de su API en una herramienta para Claude. Ver `references/openwa-mcp-guia-oficial.md`. |
| "Oficial con YCloud", sin QR | **Real**: YCloud es Business Solution Provider (BSP) oficial de Meta ("Premier Partner") para la WhatsApp Business Platform (Cloud API). Alternativas equivalentes: Twilio, 360dialog, Gupshup. |
| "Sin librerías que te pueden banear el número" | **Riesgo real**, no exageración: el propio open-wa advierte que es "unofficial... use it at your own risk" porque automatiza el navegador de WhatsApp Web, lo que viola sus Términos de Servicio. |
| El repo del panel, el "comando clonas y en 15 min funciona", el dashboard multi-tenant (agentes Carlos/Sofía/Andrés) | **No verificable / producto de pago.** Es contenido privado de la comunidad "Imperio Agéntico"; no hay documentación pública. Esta skill **no lo instala ni lo reproduce** — construye el equivalente con piezas públicas. |
| "Hennady cobró 860 €+ 480 €/mes" | **Testimonio de venta**, no un dato técnico verificable. |

La tabla completa afirmación-por-afirmación, con las citas exactas y cómo se contrastó
cada una, está en `references/video-transcripcion.md`.

## 1. Cuándo aplicar esta skill y qué ruta tomar

1. "Quiero que Claude conteste mi WhatsApp" / "monta un bot de WhatsApp con IA" → sección 2.
2. "¿Es real lo del WhatsApp SaaS de Ben Cord / Imperio Agéntico?" / "analiza este video" → sección 0 y la tabla de `video-transcripcion.md`; deja claro que el producto en sí es privado y de pago, y ofrece la alternativa pública de la sección 2.
3. "¿QR o API oficial?" → tabla comparativa en `references/openwa-mcp-guia-oficial.md`, sección "Alternativa oficial".
4. No uses esta skill para dar de alta tú mismo un número de WhatsApp Business, aceptar los ToS de open-wa, o desplegar contra un cliente real sin que el usuario lo apruebe explícitamente: son decisiones de negocio y de riesgo (baneo, coste por conversación) que le tocan a él.

## 2. Flujo principal: montar el equivalente con piezas públicas

### Paso 1 — Elegir el canal según el riesgo aceptable
- **Prototipo interno / bajo volumen, sin presupuesto:** open-wa (QR, gratis, riesgo de baneo). Nunca para un número que el negocio no puede permitirse perder.
- **Cara a clientes reales, cualquier escala:** Cloud API oficial vía un BSP (YCloud u otro). Requiere alta de WhatsApp Business Account (WABA), verificación del negocio ante Meta y plantillas aprobadas para abrir conversación.

### Paso 2 — Levantar el motor de WhatsApp (si se elige open-wa)
```bash
docker run -p 8080:8080 --init openwa/wa-automate
```
Primer arranque pide escanear QR desde el WhatsApp del número a usar. Revisa
`references/openwa-mcp-guia-oficial.md` para la versión estable (`4.76.0`) frente a la
v5 alpha antes de comprometerse a producción.

### Paso 3 — Exponerlo a Claude como MCP
Crea `wa.config.mjs` con `mcp.enabled: true` y una `apiKey` propia, arranca la Easy API
apuntando a ese config, y añade el servidor MCP resultante (`http://localhost:8080/mcp`,
header `X-API-Key`) a Claude Desktop o a Claude Code. El comando exacto y el JSON de
configuración están copiados literalmente en `references/openwa-mcp-guia-oficial.md`.

### Paso 4 — Diseñar el inbox multi-agente (lo que el video muestra, no lo que vende)
El panel del video (Carlos/Sofía/Andrés, "prender/apagar IA", derivar a humano, notas,
coste por conversación) es un patrón de diseño válido y replicable, no exclusivo del
curso:
- Un único "agente activo" por conversación, con un `system prompt` propio por rol (venta, soporte, agendamiento).
- Un campo de estado por chat (`ia_activa: true/false`) que un humano puede togglear — usa `list_chats`/`send_message` de la Easy API de open-wa, o el equivalente de tu BSP.
- Notas internas separadas del hilo de WhatsApp (una tabla o colección propia, no un mensaje enviado al cliente).
- Coste por conversación: súmalo tú mismo a partir de los tokens de cada llamada a Claude, no viene gratis de open-wa ni de la Cloud API.

No hay script determinista que automatizar aquí: cada paso depende de credenciales y
decisiones de infraestructura del usuario.

## 3. Uso diario: qué hacer para cada pedido

| Pedido del usuario | Qué hacer |
|--------------------|-----------|
| "Conecta Claude a mi WhatsApp" | Preguntar QR (open-wa) vs. oficial (BSP) según a quién le va a hablar el bot; seguir sección 2. |
| "¿Puedo clonar lo del video de Ben Cord?" | No: es privado y de pago. Ofrecer sección 0 (qué es real) y sección 2 (equivalente público). |
| "¿Me van a banear el número?" | Explicar el riesgo real de open-wa (ToS) frente a cero riesgo con Cloud API/BSP; tabla en `openwa-mcp-guia-oficial.md`. |
| "Quiero un inbox con varios agentes y traspaso a humano" | Sección 2, Paso 4. |

### Casos INNOVAQ / PANASUR
- **PANASUR:** recordatorios de vencimiento de inducción/EPP o de fecha de renovación de documentos por WhatsApp, con traspaso a un supervisor SSOMA si el trabajador responde con una duda que el bot no puede resolver.
- **INNOVAQ (SIG360/ERP360):** bandeja de soporte de primer nivel por WhatsApp que agenda una llamada o deriva a un humano cuando detecta una queja, dejando nota interna del caso — igual al patrón "Sofía / Andrés" del video, con piezas públicas.

## 4. Mantener, reparar, desinstalar
- **Actualizar el conocimiento de esta skill:** vuelve a descargar `README.md` de `open-wa/wa-automate-nodejs` (cambia de mes en mes, ahora mismo v5 está en alpha) y repite la búsqueda web sobre el estatus BSP de YCloud u otro proveedor antes de dar por buena esta guía.
- **Diagnóstico:** si `docker run openwa/wa-automate` no expone `/mcp`, revisa que `wa.config.mjs` tenga `mcp.enabled: true` y que `WA_API_KEY` esté seteada — MCP se niega a arrancar sin API key.
- **Desinstalar:** `docker rm -f <container>`; sin rastro fuera del contenedor.

## 5. Límites que no se negocian
- Nunca se instaló ni se probó el producto del video (repo privado, de pago); todo lo de esta skill fuera de la tabla de verificación es una reconstrucción con piezas públicas, no una copia validada.
- Dar de alta un número de WhatsApp Business, aceptar los Términos de Servicio de open-wa, o pagar un BSP son decisiones y acciones del usuario, nunca de Claude.
- Los archivos de esta skill se crean en `.claude/skills/whatsapp-agente/`; nunca fuera del repo o del perfil de skills sin que el usuario lo pida.

## Archivos de esta skill
| Archivo | Cuándo leerlo |
|---------|---------------|
| `references/video-transcripcion.md` | Para responder "¿es real esto?" — transcripción completa, cronología de pantalla y tabla afirmación-por-afirmación. |
| `references/openwa-mcp-guia-oficial.md` | Antes de montar cualquier cosa: copia oficial de open-wa, comandos de Docker/MCP, y comparación open-wa vs. Cloud API/BSP. |
