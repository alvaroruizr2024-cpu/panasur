# PANASUR — Control de Combustible ⛽

**Aplicación móvil para control de abastecimiento de combustible**  
Proyecto: Construcción del Acceso Principal CSF Hanaqpampa  
Empresa: Tours Panasur E.I.R.L. (RUC: 20532012879)  
Cliente: ENGIE Energía Perú S.A.A.

---

## 📱 Funcionalidades

- **Dashboard** con estadísticas en tiempo real (galones/día, mes, costo acumulado)
- **Registro de despachos** en 3 pasos con checklist SSOMA-DIA integrado
- **Flota completa** del proyecto (25 equipos: volquetes, cisternas, excavadoras, etc.)
- **Alertas automáticas** por incumplimiento de compromisos DIA Cap. 7
- **Exportación CSV** para reportes ENGIE
- **PWA instalable** como app nativa en celular

## 🔒 Cumplimiento DIA — CSF Hanaqpampa

Checklist integrado con verificaciones obligatorias:
- Bandeja antiderrames bajo boca de llenado
- Kit antiderrames completo
- Extintor operativo
- Área designada (fuera de zona de proyecto)
- Motor apagado durante abastecimiento
- Sin fuentes de ignición en radio 6m

## 🚀 Despliegue en GitHub Pages

### Opción 1: Subir manualmente

1. Crear repositorio en GitHub: `innovaqsolution/panasur`
2. Subir los archivos `index.html` y `manifest.json`
3. Ir a **Settings → Pages → Source: main branch → /root**
4. La app estará en: `https://innovaqsolution.github.io/panasur/combustible/`

### Opción 2: Desde línea de comandos

```bash
# Clonar el repositorio (ya debe existir en GitHub)
git clone https://github.com/innovaqsolution/panasur.git
cd panasur

# Crear carpeta combustible
mkdir -p combustible
cp index.html combustible/
cp manifest.json combustible/

# Subir
git add .
git commit -m "feat: app control de combustible PANASUR"
git push origin main
```

### Opción 3: GitHub Desktop
1. Abrir GitHub Desktop
2. Crear nuevo repositorio "panasur"
3. Copiar los archivos a la carpeta `combustible/`
4. Commit y Push

## 📲 Instalar como App en Celular

Una vez publicado en GitHub Pages:
1. Abrir el link en Chrome del celular
2. Tocar los 3 puntos → "Agregar a pantalla de inicio"
3. Se instala como app nativa

## 📋 Datos del Proyecto

| Campo | Valor |
|-------|-------|
| Empresa | Tours Panasur E.I.R.L. |
| RUC | 20532012879 |
| Proyecto | Acceso Principal CSF Hanaqpampa |
| Cliente | ENGIE Energía Perú S.A.A. |
| Ubicación | Moquegua, 3,800–4,200 msnm |
| Jefe SSOMA | Alvaro Ruiz Reyna (CIP 210152) |

---

*Desarrollo: Área SSOMA PANASUR © 2026*
