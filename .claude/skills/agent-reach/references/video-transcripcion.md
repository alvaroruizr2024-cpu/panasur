# Transcripciones de los videos de origen

Dos videos del mismo creador (revolutia: @revolutia.ai en TikTok, @revolutia-ia en YouTube)
dieron origen y actualización a esta skill. El segundo repite el mensaje del primero con
cifras nuevas y más promesas; la tabla de verificación de cada uno dice qué es cierto hoy.

| | Video 1 | Video 2 |
|---|---|---|
| Plataforma | TikTok @revolutia.ai | YouTube Short @revolutia-ia · https://youtube.com/shorts/hkA2nxNhoQ8 |
| Título | "Claude tiene un problema gordo" | "El Repo Que Le Da A Claude Ojos Para Leer Internet En Directo" |
| Fecha | sept. 2026 | 2026-10-14 |
| Duración | 51 s | 32 s |
| Estrellas que cita | 38 000 | 71 000 |
| Método | subtítulos grabados, leídos fotograma a fotograma | subtítulos automáticos de YouTube (yt-dlp, pista `es-orig`) + storyboard de i.ytimg.com |
| Verificado contra | repositorio del 2026-09-19 (1.5) | repositorio en el commit c70ae6d (v1.6.1, 2026-11-08) y api.github.com el 2026-11-12 |

---

## Video 1 — TikTok "Claude tiene un problema gordo" (sept. 2026)

- **Fuente:** TikTok de @revolutia.ai (vertical 9:16, 51 s, español).
- **Tema:** Agent Reach, repositorio open source `Panniantong/Agent-Reach` (~38 000 estrellas en el momento del video).
- **Método:** los subtítulos venían grabados en el video; se extrajeron fotograma a fotograma cada 0,5 s. No hay transcripción de audio automática porque el modelo de voz no estaba disponible en el entorno.

### Texto completo (subtítulos)

> Claude tiene un problema gordo, y es que no puede leer las plataformas donde de verdad
> está la información, como Twitter, LinkedIn, Reddit. Y alguien acaba de solucionarlo.
> Se llama AgentReach. Es gratis. Es OpenSource y tiene 38.000 estrellas en GitHub.
> El Claude normal no puede tocar plataformas cerradas, pero este sí. Transcripciones de
> YouTube y los [hilos] de Reddit, búsquedas en Twitter, en LinkedIn. Y todo con una sola
> herramienta. Pegas un comando en tu terminal y lo metes en Claude Code y ya está.
> Ahora tu agente puede leer Internet de verdad, no esos web fetches que fallan las
> veces; es acceso real con cero coste de APIs. La mayoría de la gente está parcheando
> cinco scrapers distintos para hacer esto. Así que no seas la mayoría y usa esta
> aplicación. Si quieres el repo de configuración, comunidad donde compartimos
> herramientas como ésta [todas las] semanas, ve al link de la descripción y encuentra
> el acceso.

### Lo que se ve en pantalla (cronología)

| Tiempo | Pantalla |
|--------|----------|
| 0–5 s | Logo de Claude en móvil, código en pantalla: "Claude no puede leer Twitter, LinkedIn, Reddit". |
| 10–17 s | Repositorio GitHub `Panniantong/Agent-Reach`, cartel "FREE", contador de 38.1k estrellas, web `agentreach.ai`. |
| 18–21 s | Iconos de YouTube, Reddit, X y LinkedIn: las plataformas que desbloquea. |
| 26 s | Windows PowerShell, el autor escribe `claude` para abrir Claude Code. |
| 28–29 s | Claude Code abierto (v2.1.197). En el prompt pega: `Install Agent Reach: https://raw.githubusercontent.com/Panniantong/agent-reach/main/docs/install.md`. |
| 30–35 s | Animación "ONE COMMAND — Setup. Register. Connect." con un instalador que registra el agente y conecta plataformas (`installing toolchain… registering with coding agent… running health checks… connecting platforms… agent ready. 4 platforms linked`). |
| 36 s | Animación de un "autonomous coding agent: edit · run · inspect". |
| 48–51 s | Cierre con el usuario de TikTok @revolutia.ai. |

### Lo que el video afirma y cómo lo verifica esta skill

| Afirmación del video | Verificación contra el repositorio (2026-09-19) |
|----------------------|--------------------------------------------------|
| "Gratis y open source" | Licencia MIT. Todas las herramientas aguas arriba son open source. El único coste posible es un proxy residencial (~1 USD/mes) si se despliega en un servidor. |
| "Un solo comando" | Correcto: se pega la frase con la URL de `docs/install.md` y el agente sigue esa guía. Por debajo instala un paquete Python y varias CLI. |
| "Transcripciones de YouTube" | `yt-dlp` extrae subtítulos; sin configuración. |
| "Búsquedas en Twitter" | Requiere cookies de una sesión de X exportadas a mano con Cookie-Editor. Sin cookies solo lee tuits sueltos. |
| "Reddit" | No hay ruta sin login: OpenCLI con la sesión del navegador (escritorio) o `rdt-cli` con cookie. |
| "LinkedIn" | Páginas públicas vía Jina Reader sin configurar; perfiles completos y búsqueda de empleo con `mcp-server-linkedin` (login manual en navegador). |
| "Cero coste de APIs" | Cierto para las rutas por defecto (Jina, yt-dlp, gh, Exa vía MCP). |
| "Acceso real, no web fetches que fallan" | Agent Reach no reemplaza WebFetch: añade CLIs con sesión o rutas específicas por plataforma. Sigue fallando donde la plataforma exige login y el usuario no lo aporta. |

---

## Video 2 — YouTube Short "El Repo Que Le Da A Claude Ojos Para Leer Internet En Directo" (2026-10-14)

- **Fuente:** YouTube Short de revolutia (@revolutia-ia, canal `UCX8HFSzf4HbbzrihdGovJhQ`),
  vertical 1080×1920, 32 s, español. ID `hkA2nxNhoQ8`. El 2026-11-12 tenía 28 287 vistas,
  961 "me gusta" y 21 comentarios.
- **Tema:** Agent Reach otra vez (repositorio `Panniantong/agent-reach`), ahora con
  "71 000 estrellas" y "17 plataformas".
- **Método:** `yt-dlp --write-auto-subs --sub-langs es,es-orig --skip-download` (pista
  `es-orig`, generada por YouTube a partir de la voz; coincide palabra por palabra con la
  descripción que publicó el autor, así que no hay dudas de transcripción). No se descargó
  el video: la red de la sesión no llega a googlevideo.com. Lo que se ve en pantalla sale
  del storyboard (`-f sb0`: 33 fotogramas de 50×90 px, uno por segundo, servidos por
  i.ytimg.com) y de las dos miniaturas oficiales; a esa resolución se reconoce la escena,
  no el texto.

### Texto completo (subtítulos automáticos `es-orig`)

> Anthropic no le dio ojos a Claude. Este repositorio lo arregla. Le da a Claude la
> capacidad de leer internet en vivo y lleva por las 71.000 estrellas. Esto es lo que
> resuelve. Muchísimas plataformas tienen su información encerrada detrás de un muro de
> registro, de un límite de peticiones o de una API de 500 dólares. Con este repositorio
> entras a 17 de las plataformas más grandes y todas ellas gratis. Puedes sacar contactos
> de LinkedIn, analizar vídeos de YouTube, revisar publicaciones virales en X o ver qué es
> lo que está funcionando en Instagram. El repositorio lo tienes en nuestra bóveda. Ve al
> link de nuestra bio y encuentra el link.

Descripción publicada con el video (añade tres frases que la voz no dice):

> Lo que más me llama la atención es que convierte a Claude en un analista con datos
> frescos. Ya no trabajas con lo que el modelo sabía hace meses, trabajas con lo que está
> pasando hoy. Claude con datos de hoy, no de hace meses.

### Lo que se ve en pantalla (cronología)

Formato: ventana superior con animación o captura, ventana inferior con el creador a
cámara (gorra negra, estantería con plantas) y la palabra clave del subtítulo en una
pastilla morada entre ambas.

| Tiempo | Pantalla superior | Voz |
|--------|-------------------|-----|
| 0–3 s | Caja naranja (mascota tipo Claude) sin cara; en el tercer fotograma le aparecen los ojos. | "Anthropic no le dio ojos a Claude." |
| 3–5 s | Página oscura de GitHub del repositorio Agent Reach con su README. | "Este repositorio lo arregla." |
| 5–8 s | Caja naranja con ojos sobre fondo blanco. | "…leer internet en vivo…" |
| 8–10 s | Vuelve la página de GitHub; se enfoca el contador de estrellas. | "…71.000 estrellas." |
| 10–11 s | Terminal oscura con texto denso (instalación o comandos). | "Esto es lo que resuelve." |
| 11–14 s | Documento con candado rojo; después un bloque rojo (pantalla de registro). | "…muro de registro, …límite de peticiones…" |
| 15–17 s | Bloque rojo con iconos de monedas y la palabra API. | "…una API de 500 dólares." |
| 17–19 s | Candado rosa que un martillo rompe (es la miniatura vertical oficial, pastilla "entras a"). | "Con este repositorio entras a…" |
| 19–21 s | Lista vertical de logos de plataformas (iconos rojo, azul y negro). | "…17 de las plataformas más grandes y todas ellas gratis." |
| 21–23 s | Página con el logo azul de LinkedIn y una lista. | "Puedes sacar contactos de LinkedIn…" |
| 23–25 s | Página con el logo de YouTube y una cuadrícula de videos. | "…analizar vídeos de YouTube…" |
| 25–26 s | Tarjeta blanca con una publicación de X. | "…revisar publicaciones virales en X…" |
| 27–28 s | Cuadrícula de mosaicos de colores (perfil de Instagram). | "…qué es lo que está funcionando en Instagram." |
| 28–32 s | Solo el creador a cámara con la pastilla morada de la llamada a la acción. | "El repositorio lo tienes en nuestra bóveda. Ve al link de nuestra bio…" |

Miniatura horizontal (`maxresdefault.jpg`): el creador sobre un fondo de ojo azul con el
logo de GitHub y un globo terráqueo, rótulo "EL REPO QUE LE DA OJOS A CLAUDE".

### Lo que el video afirma y cómo lo verifica esta skill

Fuentes: clon del repositorio en el commit `c70ae6d` (2026-11-08; `pyproject.toml` dice
1.6.1), `docs/README_en.md`, `CHANGELOG.md`, `agent_reach/channels/` y la API pública de
GitHub (`api.github.com/repos/Panniantong/agent-reach`) consultada el 2026-11-12.

| Afirmación del video | Verificación |
|----------------------|--------------|
| "Anthropic no le dio ojos a Claude" | Media verdad. Claude tiene búsqueda y lectura web propias; lo que no alcanza son las plataformas con login o límite de peticiones (X, Reddit, Instagram…), y ahí aporta Reach. La skill oficial 1.6 lo dice al revés que el video: "usa primero tus propias herramientas; Reach rellena los huecos". |
| "Lleva por las 71.000 estrellas" (14-10-2026) | Plausible y hoy superado: 111 147 estrellas y 9 956 forks el 2026-11-12. El TikTok de septiembre decía 38 000. |
| "Entras a 17 de las plataformas más grandes" | Exagerado. El README del 2026-11-08 lista 14 canales y el código registra los mismos 14: github, youtube, web, v2ex, bilibili (por defecto); reddit, linkedin, xiaohongshu, xueqiu, boss, xiaoyuzhou (opcionales); twitter, facebook, instagram (experimentales). Seis son plataformas chinas (V2EX, Bilibili, Xiaohongshu, Xueqiu, Boss, Xiaoyuzhou): para un usuario en Perú quedan 8 útiles. |
| "Todas ellas gratis" | Cierto para el programa (licencia MIT, sin cobro por API). Pero 9 de los 14 canales piden una sesión iniciada por el usuario para todas o parte de sus acciones, y pasar audio a texto (YouTube sin subtítulos, podcasts) necesita una clave de Groq u OpenAI. X, Facebook e Instagram están marcados "experimental" por el propio proyecto. |
| "Muro de registro, límite de peticiones o una API de 500 dólares" | Descripción genérica del problema. El video no dice de qué API habla y la cifra no sale de ninguna fuente del repositorio. |
| "Puedes sacar contactos de LinkedIn" | No en 1.6.1. El canal `linkedin` hace "search jobs, read job details": ofertas públicas sin login y búsqueda dentro del sitio con login. No lee perfiles ni extrae contactos; eso era la ruta 1.5 con `mcp-server-linkedin`, retirada del canal. Extraer contactos además incumple las condiciones de uso de LinkedIn: no se promete a un cliente. |
| "Analizar vídeos de YouTube" | Cierto: información del video, búsqueda y subtítulos sin login (`agent-reach youtube subtitle URL`); audio a texto con clave Groq u OpenAI. Es exactamente lo que se usó para transcribir este Short (con `yt-dlp` a mano). |
| "Revisar publicaciones virales en X" | Con condiciones: canal `twitter` experimental, exige login en el navegador dedicado de Reach; busca tuits, perfiles, tuits de un usuario e hilos. No hay un ranking de "virales": se busca por palabras y se ordena después. |
| "Ver qué está funcionando en Instagram" | Con condiciones: canal `instagram` experimental, con login; busca usuarios, lee perfiles y publicaciones de un usuario. No hay métricas de tendencia. |
| "El repositorio lo tienes en nuestra bóveda, ve al link de la bio" | Innecesario. El repositorio es público en github.com/Panniantong/agent-reach y la instalación es la frase de `docs/install.md`. La "bóveda" es el embudo de captación del creador, no una fuente. |

### Qué cambió en el repositorio desde la copia 1.6 de esta skill (14c2134 → c70ae6d)

- Versión **1.6.1** (2026-11-01): arregla búsquedas que fallaban aunque el contenido
  fuera accesible (Exa bloqueaba al cliente; ahora cada petición se identifica como
  `agent-reach/<versión>`); Reddit cae a la web pública cuando la herramienta del sitio
  falla; un login copiado que falla ya no se reporta como éxito; enlaces de Xiaohongshu
  con `&` en Windows.
- Nuevo `agent-reach configure browser-port <puerto>` para cuando otro programa ocupa el
  9222 del navegador dedicado (sección "Browser port" en `troubleshooting.md`).
- Nuevo `agent-reach skill unlink <carpeta>` para que un agente no reciba la skill a nivel
  de usuario (y `setup`/`update` no la vuelvan a poner).
- `docs/install.md` no cambió: la copia `install-guide-1.6.md` sigue vigente.
