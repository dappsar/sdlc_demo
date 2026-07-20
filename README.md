# TaskFlow Frontend

Frontend de referencia para administrar tareas mediante un CRUD ejecutado completamente en el navegador. No requiere backend ni base de datos: la persistencia utiliza `localStorage`.

## Stack

- React 19
- TypeScript
- Vite
- Vitest + Testing Library
- Oxlint + Prettier
- GitHub Actions
- GitHub Pages

## Funcionalidades

- Alta, modificación y eliminación de tareas.
- Estado, prioridad, fecha objetivo y descripción.
- Búsqueda y filtros combinables.
- Resumen de métricas.
- Persistencia local versionada.
- Diseño responsive y navegación por teclado.
- Validación de formularios y anuncios accesibles.

## Requisitos

- Node.js 24 recomendado. El proyecto también acepta Node.js 22.12 o superior.
- npm 10 o superior.

## Ejecución local

```bash
npm ci
npm run dev
```

Vite mostrará la URL local, normalmente `http://localhost:5173`.

## Comandos

```bash
npm run dev
npm run format
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
npm run preview
npm run validate
```

## Estrategia de ramas y pipelines

### Pull request hacia `dev` o `main`

`.github/workflows/pull-request.yml` ejecuta formato, lint, validación TypeScript, tests y build. No despliega.

### Merge o push a `dev`

`.github/workflows/dev.yml` repite el quality gate, genera el build y lo publica como artefacto descargable durante 7 días.

### Merge o push a `main`

`.github/workflows/main.yml` valida, compila y despliega el contenido de `dist` en GitHub Pages.

Flujo recomendado:

```text
feature/* -> pull request -> dev -> pull request -> main -> GitHub Pages
```

## Configuración inicial en GitHub

1. Crear las ramas `dev` y `main`.
2. Ir a `Settings > Pages` y seleccionar `GitHub Actions` como origen.
3. Proteger `main` y `dev` desde `Settings > Branches` o mediante rulesets.
4. Exigir el check `Quality gate` antes de permitir merges.
5. Mantener deshabilitados los pushes directos a `main`.

El `base path` de Vite se calcula automáticamente durante GitHub Actions. Funciona tanto para repositorios de proyecto (`usuario.github.io/repositorio/`) como para repositorios raíz (`usuario.github.io`).

## Persistencia

Los datos quedan guardados en la clave `taskflow.tasks.v1` del `localStorage` del navegador. No se sincronizan entre dispositivos ni usuarios.

## Próxima evolución posible

La capa `src/services/taskStorage.ts` puede reemplazarse por un cliente HTTP sin modificar los componentes principales. Esa separación permite incorporar posteriormente un backend REST, autenticación y una base de datos.
