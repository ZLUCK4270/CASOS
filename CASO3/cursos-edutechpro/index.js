// ================================================================
// CASO 3: EduTechPro
// Sistema de Registro de Cursos con Node.js y Express
// ================================================================

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3003;

// Middleware para procesar datos de formularios y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Base de datos en memoria para cursos
let cursos = [
  {
    id: 1,
    nombreCurso: "Desarrollo de APIs RESTful con Node.js y Express",
    duracion: "40 Horas (4 Semanas)",
    instructor: "Prof. Miguel Ángel Valencia",
    estado: "Activo",
    categoria: "Backend & Servidores"
  },
  {
    id: 2,
    nombreCurso: "Fundamentos de JavaScript Moderno y TypeScript",
    duracion: "30 Horas (3 Semanas)",
    instructor: "Ing. Sofía Ramos",
    estado: "Próximamente",
    categoria: "Frontend & Lenguajes"
  }
];

// Ruta principal requerida: Muestra el mensaje y la información básica del curso
app.get('/', (req, res) => {
  const cursoPrincipal = cursos[0];

  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>EduTechPro - Registro de Cursos</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
        body { background: #faf5ff; color: #3b0764; padding: 40px 20px; display: flex; flex-direction: column; align-items: center; }
        .container { max-width: 720px; width: 100%; }
        .header-card { background: linear-gradient(135deg, #6b21a8 0%, #a855f7 100%); color: white; padding: 28px; border-radius: 14px; box-shadow: 0 10px 25px -5px rgba(168, 85, 247, 0.25); margin-bottom: 24px; text-align: center; }
        .header-card h1 { font-size: 22px; font-weight: 700; margin-bottom: 8px; letter-spacing: -0.02em; }
        .header-card p { opacity: 0.95; font-size: 14px; }
        .card { background: white; border-radius: 14px; padding: 24px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); margin-bottom: 20px; border: 1px solid #f3e8ff; color: #1f2937; }
        .card h2 { font-size: 18px; color: #7e22ce; margin-bottom: 16px; border-bottom: 2px solid #a855f7; padding-bottom: 8px; display: inline-block; }
        .info-grid { display: grid; grid-template-columns: 160px 1fr; row-gap: 12px; column-gap: 16px; font-size: 15px; margin-top: 12px; }
        .info-label { font-weight: 600; color: #7e22ce; }
        .info-value { color: #111827; font-weight: 500; }
        .badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600; background: #f3e8ff; color: #7e22ce; }
        .badge.proximo { background: #fef3c7; color: #b45309; }
        .table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px; }
        .table th, .table td { padding: 12px 14px; text-align: left; border-bottom: 1px solid #e5e7eb; }
        .table th { background: #faf5ff; font-weight: 600; color: #6b21a8; }
        .form-group { margin-bottom: 14px; }
        label { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px; }
        input, select { width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; outline: none; }
        input:focus, select:focus { border-color: #9333ea; }
        .btn { background: #9333ea; color: white; border: none; padding: 10px 18px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
        .btn:hover { background: #7e22ce; }
        .footer { text-align: center; font-size: 13px; color: #6b7280; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Requisito estricto: Mensaje solicitado -->
        <div class="header-card">
          <h1>Sistema de Registro de Cursos - Funcionando Correctamente</h1>
          <p>Empresa: <strong>EduTechPro</strong> | Servidor Local Node.js + Express</p>
        </div>

        <!-- Información básica del curso (Requerido: Nombre del curso, Duración, Instructor, Estado) -->
        <div class="card">
          <h2>Información del Curso</h2>
          <div class="info-grid">
            <span class="info-label">Nombre del curso:</span>
            <span class="info-value"><strong>${cursoPrincipal.nombreCurso}</strong></span>

            <span class="info-label">Duración:</span>
            <span class="info-value">${cursoPrincipal.duracion}</span>

            <span class="info-label">Instructor:</span>
            <span class="info-value">${cursoPrincipal.instructor}</span>

            <span class="info-label">Estado:</span>
            <span class="info-value"><span class="badge">${cursoPrincipal.estado}</span></span>
          </div>
        </div>

        <!-- Formulario para registrar nuevo curso -->
        <div class="card">
          <h2>Registrar Nuevo Curso</h2>
          <form action="/cursos" method="POST">
            <div class="form-group">
              <label for="nombreCurso">Nombre del Curso:</label>
              <input type="text" id="nombreCurso" name="nombreCurso" placeholder="Ej: Docker y Contenedores para Desarrolladores" required />
            </div>
            <div class="form-group">
              <label for="duracion">Duración:</label>
              <input type="text" id="duracion" name="duracion" placeholder="Ej: 25 Horas (2 Semanas)" required />
            </div>
            <div class="form-group">
              <label for="instructor">Instructor a Cargo:</label>
              <input type="text" id="instructor" name="instructor" placeholder="Ej: Dra. Elena Morales" required />
            </div>
            <div class="form-group">
              <label for="estado">Estado del Curso:</label>
              <select id="estado" name="estado">
                <option value="Activo">Activo</option>
                <option value="Próximamente">Próximamente</option>
                <option value="En Curso">En Curso</option>
                <option value="Finalizado">Finalizado</option>
              </select>
            </div>
            <button type="submit" class="btn">+ Registrar Curso</button>
          </form>
        </div>

        <!-- Lista de todos los cursos registrados -->
        <div class="card">
          <h2>Catálogo de Cursos (${cursos.length})</h2>
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre del Curso</th>
                <th>Duración</th>
                <th>Instructor</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              ${cursos.map(c => `
                <tr>
                  <td>#${c.id}</td>
                  <td><strong>${c.nombreCurso}</strong></td>
                  <td>${c.duracion}</td>
                  <td>${c.instructor}</td>
                  <td>
                    <span class="badge ${c.estado === 'Próximamente' ? 'proximo' : ''}">
                      ${c.estado}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="footer">
          EduTechPro Learning Systems © 2026 · Servidor Express en puerto ${PORT} · API JSON disponible en <code>/api/cursos</code>
        </div>
      </div>
    </body>
    </html>
  `);
});

// Registrar curso vía formulario
app.post('/cursos', (req, res) => {
  const { nombreCurso, duracion, instructor, estado } = req.body;
  if (nombreCurso && duracion && instructor) {
    const nuevoCurso = {
      id: cursos.length + 1,
      nombreCurso: nombreCurso.trim(),
      duracion: duracion.trim(),
      instructor: instructor.trim(),
      estado: estado || "Activo"
    };
    cursos.unshift(nuevoCurso);
  }
  res.redirect('/');
});

// Endpoint API REST (JSON)
app.get('/api/cursos', (req, res) => {
  res.json({
    mensaje: "Sistema de Registro de Cursos - Funcionando Correctamente",
    empresa: "EduTechPro",
    total: cursos.length,
    cursos: cursos
  });
});

app.post('/api/cursos', (req, res) => {
  const { nombreCurso, duracion, instructor, estado } = req.body;
  if (!nombreCurso || !duracion || !instructor) {
    return res.status(400).json({ error: "Nombre del curso, duración e instructor son obligatorios" });
  }
  const nuevoCurso = {
    id: cursos.length + 1,
    nombreCurso: nombreCurso.trim(),
    duracion: duracion.trim(),
    instructor: instructor.trim(),
    estado: estado || "Activo"
  };
  cursos.push(nuevoCurso);
  res.status(201).json({
    mensaje: "Curso registrado con éxito",
    curso: nuevoCurso
  });
});

// Iniciar servidor local
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`[EduTechPro] Servidor Express iniciado`);
  console.log(`URL local: http://localhost:${PORT}`);
  console.log(`Mensaje: Sistema de Registro de Cursos - Funcionando Correctamente`);
  console.log(`====================================================`);
});
