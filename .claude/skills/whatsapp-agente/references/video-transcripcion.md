# Transcripción del video de origen

- **Fuente:** TikTok de [@ben_cord](https://www.tiktok.com/@ben_cord) (vertical 576×1024, 30 fps, 60 s, español).
- **Archivo:** `VID-20260923-WA0048.mp4`, recibido por WhatsApp, sin URL pública asociada.
- **Tema:** conectar un agente de IA (Claude) a una cuenta de WhatsApp como bandeja multi-agente, dentro de un producto/curso de pago llamado "Imperio Agéntico".
- **Método:** subtítulos grabados en pantalla, leídos fotograma a fotograma en tiras de 0.5 s (`capsheet_*.jpg`) más fotogramas ampliados en los timestamps con texto en pantalla. No se pudo transcribir el audio con `faster-whisper`: sin red al Hub de Hugging Face desde este entorno (`ProxyError`), así que todo el texto viene de los subtítulos, que coinciden con la voz.

## Texto completo

> Esto es una genialidad. Claude directamente con tu WhatsApp. Se llama WhatsApp SaaS y permite montar una plataforma de agentes en tu propia cuenta sin tener que escribir una sola línea de código. Con un solo comando clonas el repositorio y le pides a Claude que lo instale por ti: en 15 minutos ya lo tienes funcionando.
>
> Prendes o apagas la IA. Derivas la conversación a una persona, dejas notas y puedes ver cuánto te costó cada conversación. Con 40 herramientas para WhatsApp, sin tener que escanear QR, sin librerías que te pueden banear el número — oficial con YCloud.
>
> Por ejemplo, Hennady cobró 860 € por el montaje y 480 € al mes por el mantenimiento. Todo esto dentro de la comunidad, y si quieres entrar y armar el tuyo, comenta "IMPERIO" y te lo mando por DM.

## Lo que se ve en pantalla (cronología)

| Tiempo | Pantalla |
|--------|----------|
| 0–4 s | Ben Cord habla a cámara, logo animado de WhatsApp. |
| 4–12 s | Habla a cámara ("WhatsApp SaaS... sin una sola línea de código"). |
| 8–10 s | Captura: **"Configuración del Workspace"** — pestañas *Agentes, Integraciones, Negocio, Tools, Templates, Knowledge Base, Equipo, Automatizaciones*. Tres agentes configurables (máx. uno activo a la vez): **Carlos** ("Califica leads y agenda citas"), **Sofía** ("Resuelve dudas con precisión", rol Soporte), **Andrés** ("Reserva y confirma citas", rol Agendamiento, marcado *Activo*). |
| 10–12 s | Diagrama: círculo "CLAUDE" conectado a un ícono de WhatsApp. |
| 12–14 s | Terminal: `$ docker compose up -d` → `✔ Container openwa-redis Started` / `✔ Container openwa-api Started`. Los nombres de los contenedores son la pista técnica más concreta del video. |
| 14–17 s | Dos capturas de una conversación de chat con Claude Code (texto no legible con nitidez), sugiriendo que el usuario le pide a Claude que clone el repo y levante el stack. |
| 18–24 s | Vuelve a cámara: "Y esto no es solamente [enviar mensajes], es un inbox tipo... atiende sola, la conversación, cuando quieras". |
| 25–32 s | Animación de contador (0→40) sobre una lista de "pills" verdes con nombres de función: `send_message`, `send_media`, `list_chats`, `get_contacts`, `get_participant` (parcial), `read_mess…`, `get_location` (parcial), `sessions` (parcial), `start_session` (parcial), `send_document` (parcial), `get_group_info`, `leave_group` (parcial), `block_contact`. El rótulo de la tarjeta dice **"FERRAMENTAS DO WHATSAPP"** (portugués: "herramientas de WhatsApp"), indicio de que el panel subyacente fue construido originalmente por un equipo de habla portuguesa. |
| 32–34 s | Captura de WhatsApp Business (app oficial de Meta) pidiendo un código de verificación de Facebook — ilustra la vía "oficial con YCloud" sin escaneo de QR. |
| 34–40 s | Vuelve a captura de WhatsApp Business con contactos — refuerza "sin librerías que te pueden banear el número". |
| 40–46 s | Captura de un mensaje de comunidad: **"Hennady Velychko: De la guía a 6.500 € en un cliente: así implementamos los Agentes de WhatsApp (caso real)"**, con desglose "860 € de montaje" + "480 €/mes de mantenimiento, mínimo 12 meses" para un cliente (una clínica dental). |
| 46–56 s | Vuelve a cámara: "Todo esto dentro de la comunidad, y si quieres entrar y armar el tuyo...". |
| 48–52 s | Captura de la comunidad **"Imperio Agéntico"** (interfaz tipo Skool/Circle): cursos listados — *Empieza Aquí, Claude Code, Dashboard de Agentes de WhatsApp, Agentes de Voz (NUEVO), HighLevel desde cero, Vibe-Coding, Claude Design, OpenClaw, Soporte* — y el curso "Agente de WhatsApp" abierto, con lección "Bienvenida — Lo que vas a construir" y texto: *"plataforma multi-tenant de agentes de WhatsApp con IA... instalable en 15 minutos"*. |
| 56–60 s | Cierre: "Comenta 'IMPERIO' y te lo mando por DM" + branding TikTok. |

## Lo que el video afirma y cómo lo verifica esta skill

| Afirmación del video | Verificación (23 sep 2026) |
|-----------------------|------------------------------------------|
| "Con un solo comando clonas el repositorio y le pides a Claude que lo instale... en 15 minutos" | **No verificable.** El repositorio, el "comando clon" y el dashboard multi-tenant (agentes Carlos/Sofía/Andrés, pestañas de Workspace) son parte de un producto/curso de pago ("Imperio Agéntico"); no hay repo ni documentación pública. El video es en esencia un anuncio: pide comentar "IMPERIO" para recibir el acceso por DM. Esta skill no reproduce ni instala ese producto. |
| Contenedores `openwa-api` / `openwa-redis` levantados con `docker compose up -d` | **Cierto y verificable de forma independiente.** `openwa-api` coincide con el proyecto open-source real **open-wa / wa-automate** (`github.com/open-wa/wa-automate-nodejs`), que expone WhatsApp Web como una API HTTP ("Easy API") y trae imagen Docker oficial (`docker run -p 8080:8080 --init openwa/wa-automate`). El `redis` es un añadido propio del SaaS del curso para sesiones multi-tenant; no forma parte del open-wa base. |
| "40 herramientas para WhatsApp" que Claude puede usar | **El mecanismo es real, el número 40 es del producto del curso.** open-wa v5 trae un **servidor MCP nativo** que expone cada método de su Easy API como herramienta para agentes de IA (Claude, Cursor, Windsurf), documentado en su propio README bajo "AI-agent integration (MCP)". Los nombres visibles en el video (`send_message`, `send_media`, `list_chats`, `get_contacts`, `send_document`, `get_group_info`, `leave_group`, `block_contact`...) son coherentes con los métodos típicos de la Easy API de open-wa, pero el conteo exacto de 40 y el empaquetado como "40 herramientas" es del panel propietario del curso, no un número publicado por open-wa. |
| "Sin tener que escanear QR... oficial con YCloud" | **YCloud es real y es Business Solution Provider (BSP) oficial de Meta**, con estatus "Premier Partner" para WhatsApp Business Platform (Cloud API), confirmado por búsqueda web independiente. Conectar por esa vía evita el flujo QR de automatización no oficial (login por navegador) y sus riesgos de baneo — algo que el propio open-wa advierte en su README: *"This project is unofficial and is not affiliated with WhatsApp or Meta. Use it at your own risk"*. |
| "Sin librerías que te pueden banear el número" | **Riesgo real y documentado por el propio open-wa**, no una exageración: automatizar WhatsApp Web sin la Cloud API oficial viola los Términos de Servicio de WhatsApp y puede terminar en baneo de número, tal como advierte el proyecto. |
| "Hennady cobró 860 € por el montaje y 480 €/mes... más de 6.500 € [con un cliente]" | **No verificable.** Es un testimonio de la comunidad de pago mostrado como prueba social; no hay forma de confirmar cifras ni el caso desde fuera de esa comunidad. Se documenta como ejemplo de cómo se comercializa el servicio, no como un dato técnico. |
| "Plataforma multi-tenant... instalable en 15 minutos" (texto de la lección del curso) | **No verificable / marketing del curso.** El tiempo de instalación depende de credenciales de WhatsApp Business, aprobación de plantillas de Meta y configuración de infraestructura (Docker, Redis, dominio, TLS); 15 minutos es optimista incluso para alguien con el repo privado en mano. |
