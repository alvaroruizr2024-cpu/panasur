# Transcripción del video de origen

- **Fuente:** TikTok de @migue.baena (vídeo vertical, 576×1024, 55.5 s, español de España,
  subido como `2cccab9b-VID-20260923-WA0044.mp4`).
- **Tema:** 5 herramientas/skills de terceros para Claude Code.
- **Método:** subtítulos grabados en pantalla, leídos fotograma a fotograma sobre hojas de
  contacto (`sheet_*.jpg`, un fotograma cada 2 s) y tiras de subtítulos (`capsheet_*.jpg`, dos
  por segundo) generadas con `scripts/extract_frames.py`. El video no tiene voz en off propia
  aparte del creador hablando a cámara entre bloques; todo el contenido técnico va en texto
  superpuesto, así que no se transcribió audio con `faster-whisper`.

## Texto completo (reconstruido de los subtítulos)

> Claude tiene +100.000 habilidades. En realidad, la mayoría [de las horas se van] buscando
> herramientas, pero estas 5 hacen casi todo el trabajo pesado por ti.
>
> **1° Find skills.** [Con el comando] `/find-skills`, y Claude [busca la que sirve] para tu
> caso [y la] instala automáticamente.
>
> **2° Superpowers.** Hace que Claude pare, planifique, revise su trabajo y después ejecute.
>
> **3° ClaudeMem.** Le da memoria entre sesiones, para recordar proyectos, archivos y
> contexto.
>
> **4° Impeccable for FrontEnd.** Mejora el diseño: [que] tus interfaces no parezcan
> genéricas y tengan un acabado más profesional.
>
> **5° Task Observer.** Aprende cómo trabajas y optimiza tus habilidades con el tiempo.
>
> [Cierre] Son las que más diferencia marcan en productividad y calidad.

Los corchetes son texto inferido para dar sentido a fragmentos de subtítulo cortados
("es que solo", "la mayoría", "horas", "buscando", "herramientas" aparecen en tiras separadas
de 0.5 s cada una); el resto son subtítulos literales.

## Lo que se ve en pantalla (cronología)

| Tiempo | Pantalla |
|--------|----------|
| 0–12 s | Intro: icono "+100.000 habilidades", el creador hablando a cámara, un icono de skill con "4" (referencia genérica a modelos/agentes), y de pasada un archivo `crabracadabra-brand-guidelines.zip` sin contexto claro (parece un ejemplo de fondo, no forma parte de las 5 herramientas). |
| 13–21 s | **1° Find skills.** Claude Code: `/find-skills find claude skills for mobile app design` → `npx skills find "mobile app design" 2>&1 \| head -50` → `npx skills add majiayu000/claude-arsenal@app-ui-design -y` → `Installed. app-ui-design → ~/.agents/skills/app-ui-design, symlinked into Claude Code.` → `Security checks clean: Safe (Gen), 0 alerts (Socket), Low Risk (Snyk).` → `Restart Claude Code session to pick up new skill, then /app-ui-design available.` |
| 22–29 s | **2° Superpowers.** Ventana "claude": `Goal set: all tests pass and lint is clean` → `Bash(npm test)` con 2 fallos, 12 OK → `Edit(src/auth/token.ts)` → `Bash(npm test && npm run lint)` → `Verifying...` → `Claude is working toward the goal... /goal active`. |
| 27.5–33 s | **3° ClaudeMem.** Ventana "claude": `Welcome to Claude Code! cwd: ~/code/myproject` → `Recalled 3 memories ctrl+o to expand` → prompt `add rate limiting to the API` → respuesta `I'll add rate limiting using the Redis instance we configured last session. Creating middleware at src/middleware/rateLimit.ts following your Express patterns.` → `Wrote 2 memories`. |
| 34–40 s | **4° Impeccable for FrontEnd.** Comparación "ANTES" (panel financiero genérico, "A New Standard in Wealth Management") vs "DESPUÉS" (dashboard "synex" con textura y tipografía propias). |
| 40.5–47.5 s | **5° Task Observer.** Caja pixel-art "Observing tasks" con checklist `Reading your patterns 128 files`, `Learning your style 42 signals`, `Refining skill logic 7 edits`, `Tuning responses 19 tweaks`, `Saving improvements... done`. En paralelo, una ventana de Claude Code muestra un log de memoria (`#S1 ... Next.js blog`, `#S2 Recall of prior context...`, ruta `.claude\skills\impeccable\reference\init.md`, `Access 19k tokens of past research & decisions for just 1,642t. Use the claude-mem skill to access memories by ID.`, `View Observations Live @ http://localhost:37777`) — es la única captura del video que combina las 3 skills (claude-mem, impeccable, task observer) y la que muestra el puerto `37777`. |
| 48–51 s | Documento "Superpowers" con el texto "Principio fundamental: No ejecutes directamente. Actúa como un profesional senior: primero entiende, planifica y valida. Solo después construyes." y un ejemplo de brainstorming guiado (reserva de peluquería: "¿Quién la usa?", "¿Cuántos peluqueros hay?", "¿Qué operaciones necesitas o no?", "¿Qué tecnología prefieres?" con opciones React artifact / HTML-JS puro / app web con archivos reales) — cierra el bloque de "Superpowers" reforzando el mensaje de planificar antes de ejecutar. |
| 51.5–55.5 s | Cierre con marca del creador (@migue.baena) y logo de TikTok. |

## Lo que el video afirma y cómo lo verifica esta skill

| Afirmación del video | Verificación contra la fuente (2026-09-23) |
|------------------------|-----------------------------------------------|
| "Claude tiene +100.000 habilidades" | Cierto con matiz: es el tamaño aproximado del ecosistema de skills de terceros indexadas en marketplaces como skills.sh / agentskills.so, no algo que traiga Claude Code de fábrica. |
| "`/find-skills` ... instala automáticamente" | Cierto pero simplificado: el comando real que se ve en pantalla es `npx skills find` + `npx skills add <owner>/<repo>@<skill>` (CLI `skills` de Vercel Labs, [github.com/vercel-labs/skills](https://github.com/vercel-labs/skills)); no instala solo, requiere el `add` explícito y reiniciar la sesión — el video sí muestra ambos pasos, solo los resume en el título "Find skills". |
| El chequeo "Safe (Gen), 0 alerts (Socket), Low Risk (Snyk)" | Es real pero no es una función del CLI `skills`: corresponde a la ficha de seguridad que ya tenía publicada ese ejemplo concreto (`majiayu000/claude-arsenal@app-ui-design`) en el directorio [agentskills.so](https://agentskills.so/skills/majiayu000-claude-arsenal-app-ui-design). El CLI en sí no escanea vulnerabilidades por defecto. |
| "Superpowers hace que Claude pare, planifique, revise y ejecute" | Cierto: es la metodología de [obra/superpowers](https://github.com/obra/superpowers) (brainstorming → plan → subagentes → TDD RED-GREEN-REFACTOR → revisión), la colección de skills para Claude Code con más estrellas en GitHub. Se instala con `/plugin marketplace add obra/superpowers-marketplace` + `/plugin install superpowers`, no aparece solo. |
| "ClaudeMem le da memoria entre sesiones" | Cierto: [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem), Apache 2.0, captura y resume con IA cada sesión en SQLite local y lo reinyecta en la siguiente. Matiz que el video omite: el resumen con IA consume la cuota del plan de Anthropic del usuario, salvo suscripción aparte a `cmem.ai`, y requiere Node ≥20. |
| "Impeccable mejora el diseño para que no parezca genérico" | Cierto: [pbakaus/impeccable](https://github.com/pbakaus/impeccable) / [impeccable.style](https://impeccable.style), Apache 2.0, de Paul Bakaus. Se instala con `npx impeccable install` y se inicializa por proyecto con `/impeccable init` (genera `PRODUCT.md`); el video no menciona este paso de inicialización, que es necesario para que las 24 órdenes de diseño tengan contexto real. |
| "Task Observer aprende cómo trabajas y optimiza tus habilidades" | **Cierto con reserva importante.** Existe una skill pública `task-observer` (p. ej. [iamneilroberts/claude-skills](https://github.com/iamneilroberts/claude-skills/blob/main/skills/task-observer/SKILL.md)) que registra patrones en un archivo Markdown local, sin servidor. Pero el panel web en vivo que muestra el video (`http://localhost:37777`, "Reading your patterns 128 files") **no tiene una fuente pública verificada** con ese puerto — no se encontró en búsquedas ni en los repos de `task-observer` disponibles. Podría ser una build interna o un producto de pago sin publicar; esta skill lo señala como no instalable a partir del video y ofrece alternativas con repositorio público (`simple10/agents-observe`, `L1AD/claude-task-viewer`) para quien quiera un dashboard real. |
| "Son las que más diferencia marcan en productividad y calidad" | Opinión del creador, no verificable; se mantiene como cierre del video, no como instrucción técnica. |
