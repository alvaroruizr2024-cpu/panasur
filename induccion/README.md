# Portal de Inducción Ambiental · CSF Hanaqpampa

Portal interactivo y altamente fotorealista para asegurar la **trazabilidad de las inducciones y capacitaciones ambientales** de la obra **Construcción del acceso a la Central Solar Fotovoltaica Hanaqpampa**.

**Titular:** ENGIE Energía Perú S.A.A. · **Contratista:** Tours Panasur E.I.R.L. · **Marco:** DIA aprobada por SENACE.

## Estructura

- `index.html` — Portal del trabajador (registro → 8 módulos con videos → examen 10 preguntas → certificado PDF)
- `admin.html` — Dashboard SSOMA con autenticación (KPIs, gráficos, filtros, exportación CSV)
- `manifest.json` — PWA manifest

## Flujo del trabajador

1. **Registro nominal** (apellidos, nombres, DNI, cargo, área, empresa)
2. **8 módulos** interactivos con material visual y videos institucionales:
   - Contexto del proyecto · ENGIE Intipampa
   - Objetivos del Programa · DIA Sec. 7.3.1
   - Calidad de aire, ruido y restricción horaria
   - Gestión de residuos sólidos · NTP 900.058 (INACAL)
   - Protección de fauna silvestre · vicuña
   - Manejo de materiales peligrosos · MATPEL
   - Plan de Contingencia · Cuadro 7.90
   - Patrimonio cultural y compromiso social
3. **Examen calificado** de 10 preguntas (de un banco de 26) — nota mínima 14/20
4. **Certificado PDF** nominal con apellidos y nombres correctamente impresos
5. Persistencia y trazabilidad en localStorage

## Dashboard SSOMA

Acceso restringido en `admin.html`:

- **Usuario:** `ssoma`
- **Clave por defecto:** `hanaqpampa2026` (cambiable desde el dashboard)

Funcionalidades:
- KPIs: total inducciones, aprobados, desaprobados, promedio
- Gráfico de inducciones por área
- Donut de aprobación
- Tabla con búsqueda, filtros por estado/área/empresa
- Detalle individual por trabajador (incluye respuestas del examen)
- Reimpresión del certificado
- Exportación CSV
- Eliminación de registros

## Tecnología

- HTML/CSS/JS estáticos — sin build
- jsPDF (CDN) para generación de certificados
- Google Fonts: Inter + Playfair Display
- localStorage para trazabilidad
- Despliegue directo a Vercel/cualquier hosting estático

## Documento referencia

`TP-SSOMA-CAP-001 · Rev. B` — Programa de Capacitaciones Ambientales · DIA CSF Hanaqpampa

Elaborado por **Alvaro Ruiz Reyna** — Jefe SSOMA · CIP 210152.
