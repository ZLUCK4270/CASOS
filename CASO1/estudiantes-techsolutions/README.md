# CASO 1: TechSolutions - Sistema de Registro de Estudiantes

Este proyecto implementa el servidor local solicitado para la empresa **TechSolutions** utilizando **Node.js** y **Express**.

## Estructura del Proyecto (Visual Studio Code)
```text
CASO1/
└── estudiantes-techsolutions/
    ├── node_modules/
    ├── index.js
    ├── package-lock.json
    ├── package.json
    └── README.md
```

## Guía Paso a Paso para Ejecutar en Visual Studio Code

### 1. Instalar Node.js
- Descarga e instala Node.js (versión LTS) desde [nodejs.org](https://nodejs.org).
- Abre tu terminal y verifica la instalación con:
  ```bash
  node -v
  npm -v
  ```

### 2. Configurar Visual Studio Code
- Abre Visual Studio Code.
- Abre la carpeta `CASO1/estudiantes-techsolutions`.
- Abre la terminal integrada con el atajo: `Ctrl + \`` (o `Ctrl + ñ` en teclados en español) o desde el menú **Terminal > New Terminal**.

### 3. Crear el proyecto con npm (Ya preconfigurado)
Si estás empezando desde cero, se ejecuta:
```bash
npm init -y
```

### 4. Instalar Express
```bash
npm install express
```

### 5. Crear el servidor local
El archivo `index.js` configura el servidor Express en el puerto 3001 (o configurado por variable de entorno).

### 6. Iniciar el servidor local
```bash
node index.js
```
O con el script de npm:
```bash
npm start
```

### 7. Probar funcionamiento desde el navegador
Abre tu navegador web y visita:
- **Vista Web del Sistema:** [http://localhost:3001/](http://localhost:3001/)
  - Muestra: `Sistema de Registro de Estudiantes - Funcionando Correctamente`
  - Información básica: Nombre, Curso, Estado
  - Formulario de registro activo
- **API REST (JSON):** [http://localhost:3001/api/estudiantes](http://localhost:3001/api/estudiantes)
