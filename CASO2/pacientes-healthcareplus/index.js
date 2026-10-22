// ================================================================
// CASO 2: HealthCarePlus
// Sistema de Registro de Pacientes con Node.js y Express
// ================================================================

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;

// Middleware para procesar datos de formularios y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Base de datos en memoria para pacientes
let pacientes = [
  {
    id: 1,
    nombre: "María Elena Torres",
    edad: 34,
    diagnostico: "Hipertensión Arterial Grado 1",
    estado: "Estable",
    fechaIngreso: "2026-10-21"
  },
  {
    id: 2,
    nombre: "Roberto Sánchez Gómez",
    edad: 52,
    diagnostico: "Recuperación Post-Operatoria Traumatología",
    estado: "En Observación",
    fechaIngreso: "2026-10-18"
  }
];

// Ruta principal requerida: Muestra el mensaje y la información básica del paciente
app.get('/', (req, res) => {
  const pacientePrincipal = pacientes[0];

  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>HealthCarePlus - Registro de Pacientes</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
        body { background: #f0fdf4; color: #064e3b; padding: 40px 20px; display: flex; flex-direction: column; align-items: center; }
        .container { max-width: 720px; width: 100%; }
        .header-card { background: linear-gradient(135deg, #047857 0%, #10b981 100%); color: white; padding: 28px; border-radius: 14px; box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.25); margin-bottom: 24px; text-align: center; }
        .header-card h1 { font-size: 22px; font-weight: 700; margin-bottom: 8px; letter-spacing: -0.02em; }
        .header-card p { opacity: 0.95; font-size: 14px; }
        .card { background: white; border-radius: 14px; padding: 24px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); margin-bottom: 20px; border: 1px solid #d1fae5; color: #1f2937; }
        .card h2 { font-size: 18px; color: #065f46; margin-bottom: 16px; border-bottom: 2px solid #10b981; padding-bottom: 8px; display: inline-block; }
        .info-grid { display: grid; grid-template-columns: 140px 1fr; row-gap: 12px; column-gap: 16px; font-size: 15px; margin-top: 12px; }
        .info-label { font-weight: 600; color: #047857; }
        .info-value { color: #111827; font-weight: 500; }
        .badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600; background: #dcfce7; color: #15803d; }
        .badge.observacion { background: #fef3c7; color: #b45309; }
        .badge.critico { background: #fee2e2; color: #b91c1c; }
        .table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px; }
        .table th, .table td { padding: 12px 14px; text-align: left; border-bottom: 1px solid #e5e7eb; }
        .table th { background: #f0fdf4; font-weight: 600; color: #065f46; }
        .form-group { margin-bottom: 14px; }
        label { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px; }
        input, select { width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; outline: none; }
        input:focus, select:focus { border-color: #10b981; }
        .btn { background: #059669; color: white; border: none; padding: 10px 18px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
        .btn:hover { background: #047857; }
        .footer { text-align: center; font-size: 13px; color: #6b7280; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Requisito estricto: Mensaje solicitado -->
        <div class="header-card">
          <h1>Sistema de Registro de Pacientes - Funcionando Correctamente</h1>
          <p>Empresa: <strong>HealthCarePlus</strong> | Servidor Local Node.js + Express</p>
        </div>

        <!-- Información básica del paciente (Requerido: Nombre, Edad, Diagnóstico, Estado) -->
        <div class="card">
          <h2>Información del Paciente</h2>
          <div class="info-grid">
            <span class="info-label">Nombre:</span>
            <span class="info-value">${pacientePrincipal.nombre}</span>

            <span class="info-label">Edad:</span>
            <span class="info-value">${pacientePrincipal.edad} años</span>

            <span class="info-label">Diagnóstico:</span>
            <span class="info-value">${pacientePrincipal.diagnostico}</span>

            <span class="info-label">Estado:</span>
            <span class="info-value"><span class="badge">${pacientePrincipal.estado}</span></span>
          </div>
        </div>

        <!-- Formulario para registrar nuevo paciente -->
        <div class="card">
          <h2>Registrar Nuevo Paciente</h2>
          <form action="/pacientes" method="POST">
            <div class="form-group">
              <label for="nombre">Nombre Completo:</label>
              <input type="text" id="nombre" name="nombre" placeholder="Ej: Carmen Villalobos" required />
            </div>
            <div class="form-group">
              <label for="edad">Edad:</label>
              <input type="number" id="edad" name="edad" placeholder="Ej: 28" min="0" max="120" required />
            </div>
            <div class="form-group">
              <label for="diagnostico">Diagnóstico Médico:</label>
              <input type="text" id="diagnostico" name="diagnostico" placeholder="Ej: Faringitis Aguda / Control Rutinario" required />
            </div>
            <div class="form-group">
              <label for="estado">Estado del Paciente:</label>
              <select id="estado" name="estado">
                <option value="Estable">Estable</option>
                <option value="En Observación">En Observación</option>
                <option value="Dado de Alta">Dado de Alta</option>
                <option value="Crítico">Crítico</option>
              </select>
            </div>
            <button type="submit" class="btn">+ Registrar Paciente</button>
          </form>
        </div>

        <!-- Lista completa de pacientes registrados -->
        <div class="card">
          <h2>Pacientes en Sistema (${pacientes.length})</h2>
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Edad</th>
                <th>Diagnóstico</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              ${pacientes.map(p => `
                <tr>
                  <td>#${p.id}</td>
                  <td><strong>${p.nombre}</strong></td>
                  <td>${p.edad} años</td>
                  <td>${p.diagnostico}</td>
                  <td>
                    <span class="badge ${p.estado === 'En Observación' ? 'observacion' : (p.estado === 'Crítico' ? 'critico' : '')}">
                      ${p.estado}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="footer">
          HealthCarePlus Medical Systems © 2026 · Servidor Express en puerto ${PORT} · API JSON disponible en <code>/api/pacientes</code>
        </div>
      </div>
    </body>
    </html>
  `);
});

// Registrar paciente vía formulario
app.post('/pacientes', (req, res) => {
  const { nombre, edad, diagnostico, estado } = req.body;
  if (nombre && edad && diagnostico) {
    const nuevoPaciente = {
      id: pacientes.length + 1,
      nombre: nombre.trim(),
      edad: parseInt(edad, 10),
      diagnostico: diagnostico.trim(),
      estado: estado || "Estable",
      fechaIngreso: new Date().toISOString().split('T')[0]
    };
    pacientes.unshift(nuevoPaciente);
  }
  res.redirect('/');
});

// Endpoint API REST (JSON)
app.get('/api/pacientes', (req, res) => {
  res.json({
    mensaje: "Sistema de Registro de Pacientes - Funcionando Correctamente",
    empresa: "HealthCarePlus",
    total: pacientes.length,
    pacientes: pacientes
  });
});

app.post('/api/pacientes', (req, res) => {
  const { nombre, edad, diagnostico, estado } = req.body;
  if (!nombre || !edad || !diagnostico) {
    return res.status(400).json({ error: "Nombre, edad y diagnóstico son obligatorios" });
  }
  const nuevoPaciente = {
    id: pacientes.length + 1,
    nombre: nombre.trim(),
    edad: parseInt(edad, 10),
    diagnostico: diagnostico.trim(),
    estado: estado || "Estable",
    fechaIngreso: new Date().toISOString().split('T')[0]
  };
  pacientes.push(nuevoPaciente);
  res.status(201).json({
    mensaje: "Paciente registrado con éxito",
    paciente: nuevoPaciente
  });
});

// Iniciar servidor local
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`[HealthCarePlus] Servidor Express iniciado`);
  console.log(`URL local: http://localhost:${PORT}`);
  console.log(`Mensaje: Sistema de Registro de Pacientes - Funcionando Correctamente`);
  console.log(`====================================================`);
});
