# 🧬 SCM - Software de Creación de Materiales

**SCM** es un sistema computacional de asistencia técnica y diseño inverso orientado a la ciencia de polímeros. A través de un enfoque basado en lógica combinatoria y etiquetado de compatibilidad (*Tags*), la herramienta permite a los investigadores ingresar requerimientos funcionales y obtener fórmulas estequiométricas teóricamente estables.

## 🚀 Arquitectura y Tecnologías
El sistema está diseñado para ejecutarse íntegramente en el lado del cliente (*Client-side*), mitigando la explosión combinatoria mediante algoritmos de poda del espacio de diseño (DSP) y manteniendo los costos de infraestructura en cero.

* **Frontend & Framework:** Next.js / React
* **Lenguaje:** TypeScript (Tipado estricto para validación de datos químicos)
* **Procesamiento Concurrente:** Web Workers API (Mitigación de bloqueos de interfaz)
* **Base de Datos:** Estructuras JSON estáticas locales
* **Despliegue (CI/CD):** Vercel

## ⚙️ Características Principales
1. **Motor de Búsqueda Heurístico:** Traducción de requerimientos de lenguaje natural (ej. "Biodegradable", "Rígido") a parámetros de búsqueda combinatoria.
2. **Cálculo Estequiométrico por Valencias:** El algoritmo previene la generación de moléculas irreales evaluando estrictamente los electrones libres (valencias) de los precursores monoméricos y respetando la regla del octeto para la formación de macromoléculas.
3. **Poda Dinámica de Diseño (DSP):** Descarte algorítmico temprano de combinaciones termodinámicamente incompatibles o estéricamente inviables.

## 🛠️ Instalación y Uso Local
Para desplegar este proyecto en un entorno de desarrollo local, ejecuta los siguientes comandos:

\`\`\`bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/scm-project.git

# Ingresar al directorio
cd scm-project

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
\`\`\`
El servidor local estará disponible en \`http://localhost:3000\`.
