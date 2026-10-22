// ================================================================
// CASO 1: TechSolutions
// Sistema de Registro de Estudiantes con Node.js y Express
// ================================================================

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware para procesar datos de formularios y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Base de datos en memoria para estudiantes
let estudiantes = [
  {
    id: 1,
    nombre: "Ana García López",
    curso: "Desarrollo Web Full Stack con Node.js & React",
    estado: "Activo",
    fechaRegistro: "2026-10-22"
  },
  {
    id: 2,
    nombre: "Carlos Martínez Ruiz",
    curso: "Arquitectura Cloud & Microservicios",
    estado: "Graduado",
    fechaRegistro: "2026-09-15"
  }
];

// Ruta principal requerida: Muestra el mensaje y la información básica del estudiante
app.get('/', (req, res) => {
  const estudiantePrincipal = estudiantes[0];

  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>TechSolutions - Registro de Estudiantes</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
        body { background: #f0f4f8; color: #1e293b; padding: 40px 20px; display: flex; flex-direction: column; align-items: center; }
        .container { max-width: 720px; width: 100%; }
        .header-card { background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); color: white; padding: 28px; border-radius: 14px; box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.25); margin-bottom: 24px; text-align: center; }
        .header-card h1 { font-size: 22px; font-weight: 700; margin-bottom: 8px; letter-spacing: -0.02em; }
        .header-card p { opacity: 0.9; font-size: 14px; }
        .card { background: white; border-radius: 14px; padding: 24px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03); margin-bottom: 20px; border: 1px solid #e2e8f0; }
        .card h2 { font-size: 18px; color: #0f172a; margin-bottom: 16px; border-bottom: 2px solid #3b82f6; padding-bottom: 8px; display: inline-block; }
        .info-grid { display: grid; grid-template-columns: 140px 1fr; row-gap: 12px; column-gap: 16px; font-size: 15px; margin-top: 12px; }
        .info-label { font-weight: 600; color: #64748b; }
        .info-value { color: #0f172a; font-weight: 500; }
        .badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600; background: #dcfce7; color: #15803d; }
        .badge.inactivo { background: #fee2e2; color: #b91c1c; }
        .table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px; }
        .table th, .table td { padding: 12px 14px; text-align: left; border-bottom: 1px solid #e2e8f0; }
        .table th { background: #f8fafc; font-weight: 600; color: #475569; }
        .form-group { margin-bottom: 14px; }
        label { display: block; font-size: 13px; font-weight: 600; color: #475569; margin-bottom: 6px; }
        input, select { width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 14px; outline: none; }
        input:focus, select:focus { border-color: #2563eb; ring: 2px #93c5fd; }
        .btn { background: #2563eb; color: white; border: none; padding: 10px 18px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
        .btn:hover { background: #1d4ed8; }
        .footer { text-align: center; font-size: 13px; color: #94a3b8; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Requisito estricto: Mensaje solicitado -->
        <div class="header-card">
          <h1>Sistema de Registro de Estudiantes - Funcionando Correctamente</h1>
          <p>Empresa: <strong>TechSolutions</strong> | Servidor Local Node.js + Express</p>
        </div>

        <!-- Información básica del estudiante (Requerido) -->
        <div class="card">
          <h2>Información del Estudiante</h2>
          <div class="info-grid">
            <span class="info-label">Nombre:</span>
            <span class="info-value">${estudiantePrincipal.nombre}</span>

            <span class="info-label">Curso:</span>
            <span class="info-value">${estudiantePrincipal.curso}</span>

            <span class="info-label">Estado:</span>
            <span class="info-value"><span class="badge">${estudiantePrincipal.estado}</span></span>
          </div>
        </div>

        <!-- Formulario para registrar un nuevo estudiante -->
        <div class="card">
          <h2>Registrar Nuevo Estudiante</h2>
          <form action="/estudiantes" method="POST">
            <div class="form-group">
              <label for="nombre">Nombre Completo:</label>
              <input type="text" id="nombre" name="nombre" placeholder="Ej: Luis Morales" required />
            </div>
            <div class="form-group">
              <label for="curso">Curso a Inscribir:</label>
              <input type="text" id="curso" name="curso" placeholder="Ej: Backend con Node.js y Express" required />
            </div>
            <div class="form-group">
              <label for="estado">Estado Académico:</label>
              <select id="estado" name="estado">
                <option value="Activo">Activo</option>
                <option value="En Espera">En Espera</option>
                <option value="Graduado">Graduado</option>
                <option value="Suspendido">Suspendido</option>
              </select>
            </div>
            <button type="submit" class="btn">+ Registrar Estudiante</button>
          </form>
        </div>

        <!-- Lista completa de estudiantes registrados -->
        <div class="card">
          <h2>Todos los Estudiantes Registrados (${estudiantes.length})</h2>
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Curso</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              ${estudiantes.map(e => `
                <tr>
                  <td>#${e.id}</td>
                  <td><strong>${e.nombre}</strong></td>
                  <td>${e.curso}</td>
                  <td><span class="badge ${e.estado === 'Suspendido' ? 'inactivo' : ''}">${e.estado}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="footer">
          TechSolutions © 2026 · Servidor Express en puerto ${PORT} · API JSON disponible en <code>/api/estudiantes</code>
        </div>
      </div>
    </body>
    </html>
  `);
});

// Endpoint POST para registrar estudiantes
app.post('/estudiantes', (req, res) => {
  const { nombre, curso, estado } = req.body;
  if (nombre && curso) {
    const nuevoEstudiante = {
      id: estudiantes.length + 1,
      nombre: nombre.trim(),
      curso: curso.trim(),
      estado: estado || "Activo",
      fechaRegistro: new Date().toISOString().split('T')[0]
    };
    estudiantes.unshift(nuevoEstudiante);
  }
  res.redirect('/');
});

// Endpoint API REST (JSON)
app.get('/api/estudiantes', (req, res) => {
  res.json({
    mensaje: "Sistema de Registro de Estudiantes - Funcionando Correctamente",
    empresa: "TechSolutions",
    total: estudiantes.length,
    estudiantes: estudiantes
  });
});

app.post('/api/estudiantes', (req, res) => {
  const { nombre, curso, estado } = req.body;
  if (!nombre || !curso) {
    return res.status(400).json({ error: "Nombre y curso son obligatorios" });
  }
  const nuevoEstudiante = {
    id: estudiantes.length + 1,
    nombre: nombre.trim(),
    curso: curso.trim(),
    estado: estado || "Activo",
    fechaRegistro: new Date().toISOString().split('T')[0]
  };
  estudiantes.push(nuevoEstudiante);
  res.status(201).json({
    mensaje: "Estudiante registrado con éxito",
    estudiante: nuevoEstudiante
  });
});

// Iniciar servidor local
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`[TechSolutions] Servidor Express iniciado`);
  console.log(`URL local: http://localhost:${PORT}`);
  console.log(`Mensaje: Sistema de Registro de Estudiantes - Funcionando Correctamente`);
  console.log(`====================================================`);
});
