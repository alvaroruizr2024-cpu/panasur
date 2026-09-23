# open-wa / wa-automate — extracto oficial (descargado 23 sep 2026)

Copia literal de las secciones relevantes de `README.md` en
`https://github.com/open-wa/wa-automate-nodejs` (rama `master`), obtenida con
`curl https://raw.githubusercontent.com/open-wa/wa-automate-nodejs/master/README.md`.
Es la única pieza pública y verificable detrás de lo que el video muestra como
"WhatsApp SaaS" (ver `video-transcripcion.md`). Las herramientas cambian de mes en
mes: antes de dar por buena esta copia, vuelve a descargar el README y compara.

> [!WARNING]
> When you use this project, you explicitly agree to the Terms of Service.
> This project is unofficial and is not affiliated with WhatsApp or Meta. Use it at your own risk.

> [!CAUTION]
> This repository is currently on version 5, which is still in alpha and can have issues.
> Use version 4 unless you are testing or contributing to v5.
> The last stable version is **4.76.0**: `npx @open-wa/wa-automate@4.76.0`

## Qué es

`@open-wa/wa-automate` es un toolkit de Node.js para automatizar WhatsApp Web (no
oficial, basado en el navegador). Permite montar una API local, un runtime de bot, un
puente de webhooks, un host de plugins o un servidor MCP para agentes de IA.

Casos de uso que el propio proyecto lista: bandejas de soporte al cliente, notificaciones
de pedidos/reservas, bots reactivos a mensajes/grupos, puentes de webhook para CRMs, y
flujos de IA vía su servidor MCP incorporado.

## Arrancar la API en Docker

```bash
docker run -p 8080:8080 --init openwa/wa-automate
```

(El video muestra un `docker compose up -d` con contenedores `openwa-api` y
`openwa-redis`; el segundo — Redis para sesiones multi-tenant — es un añadido del
producto del curso, no de open-wa base.)

## Integración con agentes de IA (MCP)

> MCP exposes each Easy API method as a tool. AI agents such as Claude, Cursor, and
> Windsurf can call these tools directly.

Configuración (`wa.config.mjs`):

```js
export default {
  apiKey: process.env.WA_API_KEY,
  port: 8080,
  mcp: {
    enabled: true,
    path: '/mcp',
    exposeToolsMeta: true,
  },
};
```

Arranque:

```bash
WA_API_KEY="your-secure-key" npx @open-wa/wa-automate@alpha --config ./wa.config.mjs
```

Cliente MCP apuntando a `http://localhost:8080/mcp`. Para Claude Desktop, en
`claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "open-wa": {
      "url": "http://localhost:8080/mcp",
      "headers": { "X-API-Key": "your-secure-key" }
    }
  }
}
```

Notas de seguridad del propio README:
- MCP es una función **solo de Easy API** (no disponible vía `createClient()`).
- La API key es **obligatoria**; MCP se niega a arrancar sin ella.
- El descubrimiento y la ejecución de herramientas requieren autenticación.

Sin MCP, la Easy API también expone documentación interactiva en
`http://localhost:8080/api-docs/`, `http://localhost:8080/meta/swagger.json` y
`http://localhost:8080/meta/postman.json`.

## Alternativa oficial: WhatsApp Business Platform vía un BSP

open-wa es **no oficial** (automatización de WhatsApp Web). La alternativa que el video
llama "oficial con YCloud" es la **WhatsApp Business Platform (Cloud API) de Meta**,
contratada a través de un Business Solution Provider (BSP). Confirmado por búsqueda web
independiente (23 sep 2026): YCloud es BSP oficial de Meta con estatus "Premier
Partner" — ofrece onboarding embebido, alta de WABA y número, plantillas, webhooks y
soporte de integración sobre la Cloud API oficial. Otros BSP equivalentes: Twilio,
360dialog, MessageBird/Bird, Gupshup.

La diferencia práctica para decidir cuál usar:

| | open-wa (no oficial) | Cloud API vía BSP (YCloud, Twilio, 360dialog...) |
|---|---|---|
| Login | Escaneo de QR, sesión de navegador | Verificación oficial del número, sin QR |
| Riesgo | Viola los ToS de WhatsApp; riesgo real de baneo (advertencia del propio proyecto) | Cero riesgo de baneo por automatización; es el canal soportado por Meta |
| Coste | Gratis (self-hosted) | Tarifas por conversación/plantilla del BSP + Meta |
| Ventanas de mensajería | Sin restricción de plantillas | Plantillas aprobadas por Meta para abrir conversación fuera de la ventana de 24 h |
| Uso recomendado | Prototipos, pruebas internas, volumen bajo | Cualquier uso de cara a clientes reales o a escala |
