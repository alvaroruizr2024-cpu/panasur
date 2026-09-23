---
name: claude-power-kit
description: Documenta e instala 5 herramientas de terceros para Claude Code vistas en un TikTok de @migue.baena — npx skills (buscar/instalar skills), obra/superpowers (planifica antes de ejecutar), claude-mem (memoria entre sesiones), Impeccable (diseño frontend no genérico) y Task Observer (aprende patrones de uso). Úsala SIEMPRE que pidan "instala lo que vi en el video/TikTok", "dale superpoderes a Claude", "busca skills para...", "que Claude no empiece a picar código sin plan", "que Claude recuerde el proyecto entre sesiones", "que las interfaces no parezcan hechas por IA", "que Claude aprenda cómo trabajamos", instalar skills nuevas, o configurar memoria persistente. También para dejar el entorno de Claude Code de INNOVAQ o PANASUR listo con estas 5 capacidades. Use for any request to install Claude Code skills seen in a video, give Claude persistent memory, enforce a plan-before-code workflow, or improve frontend design quality.
---

# Claude Power Kit — las 5 herramientas del video, verificadas e instalables

Esta skill nace de un TikTok de **@migue.baena**, "Claude tiene +100.000 habilidades" (55 s,
español, España). El video muestra 5 capturas de terminal como si "Claude ya lo hiciera solo":
buscar e instalar skills, planificar antes de programar, recordar sesiones anteriores, diseñar
interfaces menos genéricas y aprender de cómo trabajas. En la realidad **cada una es una
herramienta de terceros que el usuario tiene que instalar y aprobar una por una** — el video
omite justo eso: quién la mantiene, qué datos toca, y que instalar código ajeno siempre es una
decisión humana, nunca automática. Ver `references/video-transcripcion.md` para la transcripción
completa y la tabla afirmación-por-afirmación contra cada fuente oficial (descargadas el
2026-09-23).

---

## 0. Qué son estas 5 herramientas (y qué no son)

| # | Nombre en el video | Qué es de verdad | Fuente oficial |
|---|---------------------|-------------------|-----------------|
| 1 | "Find skills" | CLI **`skills`** de Vercel Labs: busca e instala skills de cualquier repo público de GitHub en 75+ agentes, incluido Claude Code | [github.com/vercel-labs/skills](https://github.com/vercel-labs/skills) |
| 2 | "Superpowers" | Plugin **`obra/superpowers`**: metodología de desarrollo (brainstorm → plan → ejecuta con subagentes → TDD → revisión) que Claude sigue en vez de picar código directo | [github.com/obra/superpowers](https://github.com/obra/superpowers) |
| 3 | "ClaudeMem" | **`claude-mem`** de thedotmack: captura lo que Claude hace, lo resume y lo reinyecta en la siguiente sesión del mismo proyecto | [github.com/thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) |
| 4 | "Impeccable for FrontEnd" | Skill **`impeccable`** de Paul Bakaus: vocabulario y reglas de diseño para que Claude deje de producir interfaces "IA genérica" | [impeccable.style](https://impeccable.style) / [github.com/pbakaus/impeccable](https://github.com/pbakaus/impeccable) |
| 5 | "Task Observer" | Skill comunitaria que registra patrones de tus sesiones en archivos locales para sugerir mejoras a otras skills | [github.com/iamneilroberts/claude-skills](https://github.com/iamneilroberts/claude-skills/blob/main/skills/task-observer/SKILL.md) — **el dashboard en vivo `localhost:37777` que muestra el video no tiene fuente pública verificada**, ver aviso en la sección 2.5 |

Ninguna de las 5 es un producto de Anthropic ni viene con Claude Code: son proyectos de
terceros (algunos de una sola persona) que se instalan aparte. Todas menos "Task Observer"
tienen repositorio público, licencia abierta (MIT o Apache 2.0) y comando de instalación
verificable; "Task Observer" es la única con una discrepancia real entre lo que muestra el
video y lo que hay documentado en público.

## 1. Cuándo aplicar esta skill y qué ruta tomar

1. "Instala/busca una skill para X" (ej. diseño mobile, PDFs, Stripe...) → sección 2.1
2. "Que Claude planifique antes de tocar código" / "que no se lance solo" → sección 2.2
3. "Que Claude recuerde el proyecto entre sesiones" → sección 2.3
4. "Las interfaces que genera Claude parecen todas iguales / genéricas" → sección 2.4
5. "Que Claude aprenda cómo trabajamos y mejore con el tiempo" → sección 2.5 (con el aviso)
6. "Instala las 5 del video" → recorre 2.1 a 2.5 en orden, confirmando cada instalación con
   el usuario antes de ejecutarla (ver límites, sección 5)
7. NO instales nada de esto sin que el usuario lo pida o apruebe explícitamente: son paquetes
   de terceros que ejecutan código y tocan la sesión de Claude Code del usuario.

## 2. Las 5 herramientas, paso a paso

### 2.1 — `skills` (Vercel Labs): buscar e instalar skills

```bash
npx skills find "<lo que necesitas, ej. mobile app design>"   # busca en repos públicos de GitHub
npx skills add <owner>/<repo>@<skill>                          # ej: majiayu000/claude-arsenal@app-ui-design
npx skills list                                                 # ver qué quedó instalado
npx skills remove <skill>                                       # desinstalar
```

Instala por symlink (recomendado) o copia, en `.claude/skills/` del proyecto o en el perfil
global. Hay que **reiniciar la sesión de Claude Code** para que la skill nueva quede disponible
(el video lo muestra: "Restart Claude Code session to pick up new skill"). El CLI en sí no
escanea el código de la skill en busca de vulnerabilidades — el video muestra un chequeo
"Safe (Gen), 0 alerts (Socket), Low Risk (Snyk)" que viene de que ese ejemplo concreto
(`majiayu000/claude-arsenal@app-ui-design`) ya estaba auditado en su ficha de
[agentskills.so](https://agentskills.so/skills/majiayu000-claude-arsenal-app-ui-design), no de
una función del CLI `skills`. Antes de instalar cualquier skill de un repo que no conoces,
**lee su SKILL.md** (o pídele a Claude que lo lea) para confirmar qué hace.

### 2.2 — `obra/superpowers`: que Claude planifique antes de programar

```bash
# dentro de Claude Code
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers
```

Añade skills que se disparan solas (brainstorming, planificación por tareas, dispatch de
subagentes, TDD RED-GREEN-REFACTOR, revisión de código, git worktrees) en vez de que Claude
ataque el código directamente. Es la explicación real de lo que el video resume como "pare,
planifique, revise su trabajo y después ejecute": no es magia, es un conjunto de skills que
Claude sigue porque están instaladas y documentadas como obligatorias. MIT, mantenido por
Jesse Vincent (@obra), es el repo de skills para Claude Code con más estrellas en GitHub.

### 2.3 — `claude-mem`: memoria entre sesiones

```bash
npx claude-mem install                 # o: /plugin install claude-mem
```

Cada sesión guarda observaciones en SQLite local y las resume con IA; la siguiente sesión del
mismo proyecto las recupera vía MCP ("Recalled 3 memories" en el video). Requiere Node ≥20
(instala Bun y `uv` solo si faltan). El login por email es opcional: sin él sigue funcionando
localmente, pero el resumen con IA consume la cuota/plan de Anthropic del usuario salvo que se
suscriba aparte al servicio (`cmem.ai`) — el video no lo menciona. Apache 2.0. Para excluir
datos sensibles de un proyecto, se envuelven en etiquetas `<private>`.

### 2.4 — `impeccable`: que el frontend no parezca genérico

```bash
npx impeccable install
# dentro de Claude Code, en cada proyecto nuevo:
/impeccable init
```

`/impeccable init` inspecciona el proyecto y genera `PRODUCT.md` (audiencia, propósito,
restricciones, voz) para que los 24 comandos de diseño (`craft`, `audit`, `critique`, `polish`,
`animate`, `bolder`, `quieter`...) trabajen con contexto real en vez de inventar. 61 reglas
detectoras deterministas más revisión por LLM. Apache 2.0, de Paul Bakaus, funciona en 17+
agentes de código. El "antes/después" del video (paneles financieros genéricos vs. con
personalidad) es el caso de uso real de esta skill.

### 2.5 — "Task Observer": aviso antes de instalar nada

La skill **`task-observer`** que sí está documentada en público (por ejemplo en
[iamneilroberts/claude-skills](https://github.com/iamneilroberts/claude-skills/blob/main/skills/task-observer/SKILL.md))
es un archivo Markdown que Claude sigue durante la sesión: anota patrones, correcciones del
usuario y candidatos a nuevas skills en `skill-observations/log.md` **del propio repo del
proyecto**, sin levantar ningún servidor. Se instala copiando la carpeta de la skill a
`.claude/skills/task-observer/` y añadiendo una línea en `CLAUDE.md` que le diga a Claude que
la revise al empezar sesión.

El video, en cambio, muestra un panel web en vivo (`http://localhost:37777`, "Reading your
patterns 128 files", "Learning your style 42 signals") — **no encontramos una fuente pública
que documente ese dashboard con ese puerto**; puede ser una build interna, un producto de pago
sin publicar, o una demo. **No instales nada a partir de esa captura**: si el usuario quiere un
panel en vivo de lo que hace Claude Code, las alternativas con repositorio público verificable
son [`simple10/agents-observe`](https://github.com/simple10/agents-observe) o
[`L1AD/claude-task-viewer`](https://github.com/L1AD/claude-task-viewer) — ninguna "aprende" ni
edita skills por sí sola, solo visualizan.

## 3. Uso diario: qué comando para cada pedido

| Pedido del usuario | Qué hacer |
|---------------------|-----------|
| "Busca una skill para [tarea]" | `npx skills find "<tarea>"`, leer el SKILL.md del resultado antes de instalar |
| "Instala esa skill" | `npx skills add <owner>/<repo>@<skill>`, avisar que hace falta reiniciar Claude Code |
| "Que Claude no programe sin plan" | Instalar `obra/superpowers` (2.2) |
| "Dale memoria a Claude entre sesiones" | Instalar `claude-mem` (2.3), avisar del consumo de cuota si usa resumen con IA |
| "Mejora el diseño, que no parezca hecho por IA" | Instalar `impeccable` (2.4) y correr `/impeccable init` en el proyecto |
| "Que Claude aprenda de cómo trabajamos" | Instalar `task-observer` de archivo (2.5); si piden el panel web del video, avisar de que no está verificado y ofrecer las alternativas |
| "Instala lo del video/TikTok" | Repasar 2.1–2.5 con el usuario, una por una, confirmando cada instalación |

### Casos INNOVAQ / PANASUR
- **Nuevo proyecto de un producto (SIG360, ERP360, PANASUR...)**: instalar `superpowers` +
  `claude-mem` de entrada, para que Claude planifique antes de tocar código de producción y no
  pierda el contexto de una sesión a otra durante una implementación larga.
- **Landing pages o dashboards de INNOVAQ**: `impeccable` antes de pedir cualquier UI, para
  evitar el "aspecto genérico" que ya se vio en otras piezas hechas con IA.
- **Onboarding de un nuevo repo del equipo**: `npx skills find` para localizar skills ya
  hechas (PDF, Excel, Stripe, etc.) en vez de reinventar prompts cada vez.

## 4. Mantener, reparar, desinstalar

- **Actualizar**: `npx skills add` / `npx claude-mem install` / `npx impeccable install` se
  pueden re-ejecutar para traer la versión más reciente; `superpowers` se actualiza con
  `/plugin update superpowers` (o el comando equivalente del harness).
- **Diagnóstico**: si una skill instalada no aparece, reiniciar la sesión de Claude Code
  (todas las 5 lo requieren tras instalar o actualizar). Si `claude-mem` no recuerda nada,
  comprobar que el proyecto ya tuvo una sesión previa completa (la memoria se inyecta a partir
  de la segunda sesión, no la primera).
- **Desinstalar**: `npx skills remove <skill>`; para `claude-mem`, `impeccable` o
  `superpowers`, borrar la carpeta correspondiente en `.claude/skills/` o `.claude/plugins/` y
  reiniciar.

## 5. Límites que no se negocian

- Nunca instales ninguna de estas 5 herramientas sin que el usuario lo pida o lo apruebe: todas
  ejecutan código de terceros dentro de la sesión de Claude Code.
- Antes de instalar una skill de un repo que el usuario no nombró explícitamente (resultado de
  `npx skills find`), lee su SKILL.md y resume qué hace y qué toca antes de instalarla.
- No repliques el dashboard `localhost:37777` de "Task Observer": no hay fuente pública que lo
  documente. Si el usuario insiste en tenerlo, dilo explícitamente y ofrece las alternativas
  verificadas de la sección 2.5.
- `claude-mem` guarda datos del proyecto en SQLite local y, si el usuario se loguea, en
  `cmem.ai`: para código o clientes de INNOVAQ/PANASUR bajo NDA, usar las etiquetas `<private>`
  o mantener la cuenta sin loguear.
- Todo archivo de configuración que estas herramientas creen (`CLAUDE.md`, `PRODUCT.md`,
  `skill-observations/`, `.claude/skills/...`) va dentro del repo del proyecto en el que se
  instalan, nunca fuera de él.

## Archivos de esta skill

| Archivo | Cuándo leerlo |
|---------|---------------|
| `references/video-transcripcion.md` | Para ver la transcripción completa, la cronología de pantalla y la tabla afirmación-por-afirmación contra cada fuente. |
