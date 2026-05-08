# Instalación de agent-browser

[agent-browser](https://github.com/vercel-labs/agent-browser) es un CLI de automatización de navegador para agentes de IA, escrito en Rust.

## Requisitos

- Node.js (para la instalación vía npm) o alternativas: Homebrew / Cargo / build desde fuente.
- Chrome se descarga automáticamente desde Chrome for Testing.

## Instalación global (recomendada)

```bash
npm install -g agent-browser
agent-browser install
```

En Linux, si el navegador falla al iniciar, instala dependencias del sistema:

```bash
agent-browser install --with-deps
```

## Verificar la instalación

```bash
agent-browser --version
agent-browser --help
```

## Uso básico

```bash
agent-browser open example.com
agent-browser snapshot
agent-browser click @e2
agent-browser screenshot page.png
agent-browser close
```

## Guía para agentes

Cargar la guía oficial de uso desde la propia CLI:

```bash
agent-browser skills get core --full
```

## Alternativas de instalación

- **Homebrew (macOS):** `brew install vercel-labs/tap/agent-browser`
- **Cargo (Rust):** `cargo install agent-browser`
- **Local al proyecto:** `npm install --save-dev agent-browser`

## Notas

- Versión instalada en este entorno: `agent-browser 0.27.0`.
- El paso `agent-browser install` requiere acceso a `googlechromelabs.github.io` para descargar Chrome for Testing.
