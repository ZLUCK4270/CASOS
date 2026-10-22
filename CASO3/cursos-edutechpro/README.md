# CASO 3: EduTechPro - Sistema de Registro de Cursos

Este proyecto implementa el servidor local solicitado para la empresa **EduTechPro** utilizando **Node.js** y **Express**.

## Estructura del Proyecto (Visual Studio Code)
```text
CASO3/
└── cursos-edutechpro/
    ├── node_modules/
    ├── index.js
    ├── package-lock.json
    ├── package.json
    └── README.md
```

## Guía Paso a Paso para Ejecutar en Visual Studio Code

### 1. Instalar Node.js
- Descarga e instala Node.js (versión LTS) desde [nodejs.org](https://nodejs.org).
- Verifica la instalación:
  ```bash
  node -v
  npm -v
  ```

### 2. Configurar Visual Studio Code
- Abre Visual Studio Code.
- Abre la carpeta `CASO3/cursos-edutechpro`.
- Abre la terminal integrada con: `Ctrl + \`` (o `Ctrl + ñ`).

### 3. Crear el proyecto con npm
```bash
npm init -y
```

### 4. Instalar Express
```bash
npm install express
```

### 5. Iniciar el servidor local
```bash
node index.js
```
O con npm:
```bash
npm start
```

### 6. Probar funcionamiento desde el navegador
Abre tu navegador web y visita:
- **Vista Web del Sistema:** [http://localhost:3003/](http://localhost:3003/)
  - Muestra: `Sistema de Registro de Cursos - Funcionando Correctamente`
  - Información básica: Nombre del curso, Duración, Instructor, Estado
  - Formulario de alta de cursos
- **API REST (JSON):** [http://localhost:3003/api/cursos](http://localhost:3003/api/cursos)
