---
name: agent-reach
description: Instala, configura, diagnostica y usa Agent Reach (repo open source Panniantong/Agent-Reach, gratis) para que Claude Code lea Internet de verdad desde la terminal — transcripciones y búsqueda en YouTube, tuits y búsquedas en X/Twitter, hilos de Reddit, perfiles y empleos de LinkedIn, Instagram, Facebook, GitHub, RSS, cualquier web vía Jina Reader y búsqueda semántica Exa, con un solo comando y sin coste de APIs. Úsala SIEMPRE que el usuario pida instalar, actualizar, reparar o desinstalar Agent Reach; que Claude lea, resuma, transcriba, busque o monitoree contenido de YouTube, TikTok, X, Reddit, LinkedIn, Instagram, Facebook, un podcast o un RSS ("qué dicen en Twitter/Reddit sobre…", "transcribe este video", "qué opina la gente de este producto"); o cuando WebFetch falle con 403, login obligatorio o página vacía. También para social listening e investigación de competencia de INNOVAQ (SIG360, ERP360, FOOD360, etc.) y PANASUR. Use for any Agent Reach or closed-platform reading request.
---

# Agent Reach — que Claude Code lea Internet de verdad

Esta skill nace de un video (TikTok de @revolutia.ai, "Claude tiene un problema gordo"):
Claude no puede leer las plataformas donde de verdad está la información —Twitter,
LinkedIn, Reddit, YouTube— y alguien lo resolvió con **Agent Reach**, un repositorio
open source y gratuito con 38 000 estrellas. Pegas un comando en la terminal, lo metes en
Claude Code y ya está: acceso real, con cero coste de APIs, en vez de "esos web fetches
que fallan". La transcripción completa y lo que aparece en pantalla están en
`references/video-transcripcion.md`.

Aquí reproducimos ese flujo con dos matices que el video omite: la instalación es
**segura por defecto** (solo comprueba; cambiar el sistema exige aprobación explícita del
usuario) y varias plataformas **necesitan una sesión que solo el usuario puede aportar**
(cookies de X, login de Reddit o LinkedIn). El valor no está en un scraper concreto: está
en que una sola herramienta elige, instala y diagnostica el mejor backend de cada
plataforma, y Claude llama a esas herramientas directamente.

---

## 0. Qué es Agent Reach (y qué no es)

- **Capa de capacidad, no un wrapper.** `agent-reach` selecciona, instala, comprueba
  (`doctor`) y enruta. La lectura la hacen herramientas aguas arriba que Claude invoca
  directamente: `yt-dlp`, `gh`, `curl` + Jina Reader, `twitter-cli`, `opencli`, `rdt-cli`,
  `mcporter` (Exa y LinkedIn), `feedparser`, `bili-cli`.
- **Cada plataforma = lista ordenada de backends** (principal + respaldos). Si una ruta
  muere, el proyecto cambia el orden; `agent-reach doctor` siempre dice cuál está activa.
- **Gratis y local.** Todo es open source; las cookies y tokens quedan en
  `~/.agent-reach/` con permisos 600. El único coste posible es un proxy residencial
  (~1 USD/mes) si se despliega en un servidor, nunca en un PC.
- **Compatible con cualquier agente que ejecute comandos:** Claude Code, Cursor,
  Windsurf, OpenClaw.

Qué funciona sin configurar y qué necesita al usuario:

| Plataforma | Sin configurar | Con configuración | Quién la aporta |
|-----------|----------------|-------------------|-----------------|
| Web (cualquier URL) | Leer en Markdown limpio (Jina) | — | nadie |
| YouTube | Subtítulos, metadatos, búsqueda (yt-dlp) | — | nadie |
| GitHub | Repos públicos y búsqueda (gh) | Privados, issues, PR | `gh auth login` |
| RSS / Atom | Leer cualquier feed | — | nadie |
| Búsqueda web | — | Búsqueda semántica Exa (MCP, sin clave) | se configura sola con `--system` |
| Twitter / X | Leer un tuit suelto | Buscar, timeline, artículos | cookies vía Cookie-Editor |
| Reddit | nada (endpoints anónimos bloqueados) | Buscar y leer hilos y comentarios | sesión de Chrome (OpenCLI) o `rdt login` |
| LinkedIn | Páginas públicas (Jina) | Perfiles, empresas, empleos | login manual en navegador |
| Facebook / Instagram | — | Búsqueda, perfiles, feed, grupos | sesión de Chrome (OpenCLI, solo escritorio) |
| Podcasts (Xiaoyuzhou) | — | Transcripción con Whisper | clave gratuita de Groq |

Nota 1.6 (2026-10-23): los canales con sesión ya no piden cookies exportadas; la persona
inicia sesión en el navegador dedicado de Reach con `agent-reach login <canal>`. RSS y
Exa pasaron a formar parte del canal web.

---

## 1. Cuándo aplicar esta skill y qué ruta tomar

1. **"Instala / configura Agent Reach"** → sección 2 (instalación).
2. **"Lee / resume / busca en YouTube, X, Reddit, LinkedIn…"** → primero
   `agent-reach doctor` (o `scripts/check_env.sh` si ni siquiera está instalado); si el
   canal está ✅, sección 3 (uso); si no, ofrece instalar o configurar ese canal.
3. **"Actualiza / arregla / desinstala"** → sección 4.
4. **WebFetch falló (403, login, HTML vacío)** → no insistas con WebFetch: propón la ruta
   de Agent Reach para esa plataforma y explica qué necesitaría del usuario.

Si Agent Reach no está instalado y el usuario solo quería un dato rápido, dilo en una
línea y ofrece la instalación; no la lances sin preguntar, porque el paso `--system`
instala CLI globales y toca su máquina.

---

## 2. Instalación (el "un solo comando" del video, hecho bien)

Desde la versión 1.6 (2026-10-23) el proyecto cambió el instalador: ya no es pipx ni
venv sino `uv`, y `agent-reach setup` sustituye a `install --env=auto --system`. La ruta
1.5 sigue en `references/comandos.md` por si una máquina ya la tiene; `agent-reach update`
la migra sola a uv conservando claves y configuración.

### Paso 1 — El comando que se pega en Claude Code

Lo que el video muestra es, literalmente, pegar esta frase en el prompt de Claude Code:

```
Install Agent Reach: https://raw.githubusercontent.com/Panniantong/agent-reach/main/docs/install.md
```

Descarga siempre la guía vigente antes de actuar; desde 1.6 una sola guía cubre instalar,
actualizar y migrar desde 1.5, y los backends cambian de mes en mes:

```bash
curl -s https://raw.githubusercontent.com/Panniantong/agent-reach/main/docs/install.md
```

Sin red, `references/install-guide-1.6.md` es la copia del 2026-10-31 (commit 14c2134).

### Paso 2 — Chequeo de solo lectura y aviso al usuario

```bash
bash .claude/skills/agent-reach/scripts/check_env.sh   # no instala nada
agent-reach version                                     # si existe: JSON = 1.6+, texto plano = 1.5
```

Explica en dos líneas qué hay (Python ≥ 3.10, uv, Node, gh, ffmpeg) y qué vas a hacer.
Si falta `uv`, dilo ("instalo uv, un instalador de programas de terminal, sin contraseña
de administrador") y ejecútalo: `curl -LsSf https://astral.sh/uv/install.sh | sh`
(Windows: `powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"`).

### Paso 3 — Instalar y configurar (toca la máquina: solo con aprobación)

```bash
uv tool install https://github.com/Panniantong/Agent-Reach/releases/latest/download/agent-reach.zip
agent-reach setup
```

`setup` activa los canales por defecto (web con Exa y RSS, YouTube, GitHub, V2EX,
Bilibili), instala sus herramientas bajo `~/.agent-reach/` sin sudo y registra la skill
oficial en los agentes que detecta (`~/.agents/skills/agent-reach/`, enlazada desde
`~/.claude/skills/`). Si `agent-reach` no aparece: `uv tool update-shell` y otra terminal.
Nunca `pip install agent-reach` desde PyPI: es otro paquete con el mismo nombre.

Muestra al usuario `result.installation_report.markdown` tal cual; la guía pide no
reescribirlo ni reordenarlo.

### Paso 4 — Canales opcionales, a elección del usuario

En 1.6 cada canal se añade con una frase y trae sus herramientas. Los que requieren
sesión usan un navegador dedicado de Agent Reach (nunca el Chrome del usuario) y el login
lo hace la persona en una ventana que abre el propio comando:

```bash
agent-reach add twitter          # o reddit, linkedin, instagram, facebook, xiaohongshu…
agent-reach login twitter        # abre la ventana; el usuario inicia sesión él mismo
agent-reach configure groq-key   # clave gratuita de Groq: transcribir audio (YouTube sin subtítulos, podcasts)
```

Recomienda cuenta secundaria para X, Reddit, Facebook e Instagram. Acciones y requisitos
de cada canal: `agent-reach channels` y `references/comandos.md`, sección 3.

### Paso 5 — Doctor y reporte

```bash
agent-reach doctor --text          # estado local, sin red
agent-reach check youtube --text   # prueba en vivo de un canal
```

Termina con un reporte corto: versión, canales listos sobre el total y qué queda
pendiente del usuario (logins, claves).

### Dónde se puede instalar y dónde no

- PC del usuario, o entorno cloud con red de confianza: ruta completa.
- Sesión cloud de Claude con red limitada (caso PANASUR, 2026-10-31): el clasificador de
  seguridad bloquea ejecutar código recién clonado (`uv tool install` o `pip install` del
  clon) y la política de red corta youtube.com y googlevideo.com. Clonar y documentar sí;
  instalar y leer YouTube no. Pide al usuario permitir los dominios o usar su máquina, y
  no busques rodeos: otra sesión u otro sandbox para saltarse la red también se bloquean.

---

## 3. Uso diario: qué comando para cada pedido

Desde 1.6 el propio comando lee y devuelve un JSON (`ok`, `items`, `error.code`,
`error.hint`): `agent-reach read URL` elige el canal por la URL y
`agent-reach <canal> <acción> [args]` lo fija; `agent-reach channels` lista acciones y
parámetros. Las herramientas aguas arriba (`yt-dlp`, `gh`, `curl` + Jina) siguen valiendo
a mano. Tabla ampliada en `references/comandos.md`, sección 4; contrato JSON y códigos de
error en `references/skill-oficial-1.6-en.md`.

| Pedido del usuario | Comando |
|--------------------|---------|
| "¿Qué dice este video de YouTube?" | `agent-reach youtube subtitle URL --lang es,es-orig,en` (texto completo de subtítulos manuales o automáticos); sin subtítulos, `agent-reach youtube transcribe URL` (requiere clave Groq); metadatos con `agent-reach youtube read URL`. A mano: `yt-dlp --write-auto-sub --sub-lang es,en --skip-download URL` |
| "Busca videos sobre X" | `yt-dlp "ytsearch10:consulta" --dump-json --flat-playlist` |
| "Lee esta página" (WebFetch falló) | `curl -s "https://r.jina.ai/URL"` |
| "Busca en Internet…" | `mcporter call exa.web_search_exa query="..." numResults=5` |
| "¿Qué dicen en Twitter de…?" | `twitter search "consulta" -n 20` (con `TWITTER_AUTH_TOKEN` y `TWITTER_CT0` exportadas); sin cookies, `exa` con `site:x.com` |
| "¿Qué dicen en Reddit de…?" | `opencli reddit search "consulta" -f yaml` o `rdt read POST_ID` |
| "Perfil de LinkedIn de…" | `mcporter call linkedin.get_person_profile linkedin_username="..."`; página pública con Jina |
| "¿Qué publica esta cuenta de Instagram?" | `opencli instagram user cuenta -f yaml` |
| "¿De qué va este repo / qué issues tiene?" | `gh repo view owner/repo` · `gh issue list -R owner/repo` |
| "Sigue estas fuentes RSS" | `feedparser` en una línea de Python |

Al entregar resultados, cita la fuente (URL del tuit, hilo, video) y la fecha; el usuario
va a reutilizar eso en informes o piezas de redes.

### Casos típicos en INNOVAQ y PANASUR

Los prompts completos, listos para pegar, y el ritmo sugerido (semanal, mensual,
trimestral) están en `references/casos-innovaq.md`. Resumen:

- **Social listening de un producto** ("qué opina la gente de los ERP para restaurantes",
  para FOOD360): Exa para el panorama, `twitter search` y `opencli reddit search` para
  la conversación real, y una tabla final con fuente, fecha, cita y sentimiento.
- **Investigación de competencia:** `curl r.jina.ai` sobre la web del competidor, `gh`
  si tiene repos, LinkedIn para tamaño de equipo y vacantes.
- **Convertir videos en material propio** (como este mismo video → skill, o un video
  técnico → post para `campaigns/`): `yt-dlp` para subtítulos y luego `launch-kit` si el
  resultado es una campaña. Para TikTok, `yt-dlp` también descarga el video; los
  subtítulos grabados en la imagen se leen extrayendo fotogramas.
- **Vigilancia normativa:** `scripts/vigilancia_rss.py` lee MTPE, SUNAFIL, MINEM,
  OSINERGMIN, INACAL y El Peruano, filtra por SST, ISO, minería, construcción y
  alimentos, y escribe un digest Markdown. Solo biblioteca estándar; corre en cualquier PC.
- **Monitoreo semanal:** una tarea programada que corra el digest y `agent-reach watch`, y
  avise solo si hay novedades, ❌ o versión nueva.

---

## 4. Mantener, reparar, desinstalar

- **Actualizar:** `agent-reach update` (o la frase `Update Agent Reach: https://raw.githubusercontent.com/Panniantong/agent-reach/main/docs/install.md`).
  Solo con el visto bueno del usuario: actualiza el programa, las herramientas de los
  canales añadidos y la skill, y cuenta en `result.user_actions` lo que cambió.
  `agent-reach update --check` solo mira si hay versión nueva. Una instalación 1.5 por
  pip o pipx se pasa sola a uv. Pasos antiguos en `references/update-guide.md`.
- **Reparar:** `agent-reach doctor --text` (estado local) y `agent-reach check <canal>
  --text` (prueba en vivo). Cada fallo trae `error.code` y `error.hint` con el siguiente
  paso; códigos y estados en `references/troubleshooting-1.6.md`. Ante
  `PLATFORM_BLOCKED`, `RATE_LIMITED`, `NEED_LOGIN` o `BUSY` se para y se avisa: nada de
  reintentar en bucle ni cambiar de cuenta o backend. Problemas de la ruta 1.5 en
  `references/comandos.md`, sección 7.
- **Volver atrás:** `uv tool install --force https://github.com/Panniantong/Agent-Reach/archive/refs/tags/v<anterior>.zip`
  y `agent-reach update --sync-only`.
- **Desinstalar:** `agent-reach uninstall --dry-run` para ver el alcance y luego
  `agent-reach uninstall`. Borra solo lo que Reach instaló (`~/.agent-reach/`, skills
  registradas); el programa se quita con `uv tool uninstall agent-reach`.

---

## 5. Límites que no se negocian

- Instalar es cambiar la máquina del usuario: el modo por defecto es solo lectura y
  `--system` solo con su aprobación en esa conversación.
- Las credenciales las exporta el usuario a mano (Cookie-Editor, login en navegador).
  No automatices logins, no leas cookies del navegador por tu cuenta, no pidas
  contraseñas.
- Nada de Agent Reach se crea dentro del repositorio de trabajo: todo va a
  `~/.agent-reach/`, `~/.agent-reach-venv/` o `/tmp/`.
- Si `agent-reach setup` registra la skill oficial del proyecto en `~/.claude/skills/`
  o `~/.agents/skills/`, es normal; esta skill vive también en el repo
  (`.claude/skills/agent-reach/`) y las dos conviven.

---

## Archivos de esta skill

| Archivo | Cuándo leerlo |
|---------|---------------|
| `references/comandos.md` | Referencia rápida en español: rutas de instalación, modos, canales, comando por plataforma, cookies, diagnóstico, problemas frecuentes. Léelo al instalar o al usar un canal por primera vez. |
| `references/install-guide.md` | Copia literal de la guía oficial `docs/install.md` (2026-09-19). Úsala si no hay red; si hay, descarga la vigente. |
| `references/update-guide.md` | Copia literal de `docs/update.md`. Para actualizar. |
| `references/video-transcripcion.md` | Transcripción y cronología del video de origen, con cada afirmación contrastada con el repositorio. |
| `scripts/check_env.sh` | Chequeo de solo lectura del entorno (Python, pipx, Node, gh, CLIs, credenciales). Ejecútalo antes de proponer una ruta de instalación. |
| `references/casos-innovaq.md` | Siete casos de uso de INNOVAQ y PANASUR con el prompt exacto, los canales que necesita cada uno y el ritmo sugerido. Léelo cuando el pedido sea de escucha social, competencia, prospección, normativa o monitoreo de marca. |
| `scripts/vigilancia_rss.py` | Digest de novedades normativas y sectoriales desde feeds RSS/Atom peruanos, filtrado por palabras clave. `--hours`, `--feeds`, `--keywords`, `--out`. |
| `references/install-guide-1.6.md` | Copia literal de la guía oficial 1.6 (`docs/install.md`, commit 14c2134, 2026-10-31): instalar con uv, actualizar y migrar desde 1.5. Manda sobre `install-guide.md`. |
| `references/troubleshooting-1.6.md` | Copia literal de `docs/troubleshooting.md` 1.6: códigos de error, estados de `doctor`, volver a una versión anterior, proxy. |
| `references/skill-oficial-1.6-en.md` | La skill que `agent-reach setup` instala en los agentes (inglés): contrato JSON, rutas de lectura, login en el navegador dedicado. Léela para interpretar una respuesta del comando. |
