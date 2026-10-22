import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// In-Memory Databases for the 3 Cases
// ==========================================
interface Estudiante {
  id: number;
  nombre: string;
  curso: string;
  estado: string;
  fechaRegistro: string;
}

interface Paciente {
  id: number;
  nombre: string;
  edad: number;
  diagnostico: string;
  estado: string;
  fechaIngreso: string;
}

interface Curso {
  id: number;
  nombreCurso: string;
  duracion: string;
  instructor: string;
  estado: string;
  categoria: string;
}

let estudiantesData: Estudiante[] = [
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
  },
  {
    id: 3,
    nombre: "Lucía Fernández Soto",
    curso: "Bases de Datos SQL & NoSQL con Express",
    estado: "En Espera",
    fechaRegistro: "2026-10-10"
  }
];

let pacientesData: Paciente[] = [
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
  },
  {
    id: 3,
    nombre: "Valentina Morales Castro",
    edad: 19,
    diagnostico: "Amigdalitis Bacteriana Aguda",
    estado: "Dado de Alta",
    fechaIngreso: "2026-10-15"
  }
];

let cursosData: Curso[] = [
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
  },
  {
    id: 3,
    nombreCurso: "Bases de Datos con PostgreSQL y Node.js",
    duracion: "45 Horas (5 Semanas)",
    instructor: "Lic. Javier Paredes",
    estado: "En Curso",
    categoria: "Bases de Datos"
  }
];

// ==========================================
// Direct Browser Endpoints (HTML Direct Delivery)
// ==========================================

// CASO 1: TechSolutions - Estudiantes
app.get('/preview/caso1', (req, res) => {
  const estudiantePrincipal = estudiantesData[0];
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>TechSolutions - Registro de Estudiantes</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 32px 20px; background: #f8fafc; color: #0f172a; }
        .wrapper { max-width: 680px; margin: 0 auto; }
        .header { background: #1e3a8a; color: white; padding: 24px; border-radius: 12px; margin-bottom: 24px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
        .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 700; color: #ffffff; }
        .header p { margin: 0; font-size: 13px; color: #bfdbfe; }
        .card { background: white; border-radius: 12px; padding: 22px; border: 1px solid #e2e8f0; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
        .card h2 { margin: 0 0 16px 0; font-size: 16px; color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 6px; display: inline-block; }
        .field { margin-bottom: 12px; display: flex; align-items: baseline; }
        .field-label { width: 130px; font-weight: 600; color: #64748b; font-size: 14px; }
        .field-val { font-size: 15px; color: #0f172a; font-weight: 500; }
        .badge { background: #dcfce7; color: #15803d; padding: 3px 10px; border-radius: 999px; font-size: 12px; font-weight: 600; }
        .table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 13px; }
        .table th, .table td { padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: left; }
        .table th { background: #f1f5f9; color: #475569; font-weight: 600; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <h1>Sistema de Registro de Estudiantes - Funcionando Correctamente</h1>
          <p>TechSolutions Enterprise · Servidor Local Node.js + Express</p>
        </div>
        <div class="card">
          <h2>Información Básica del Estudiante</h2>
          <div class="field">
            <span class="field-label">Nombre:</span>
            <span class="field-val">${estudiantePrincipal.nombre}</span>
          </div>
          <div class="field">
            <span class="field-label">Curso:</span>
            <span class="field-val">${estudiantePrincipal.curso}</span>
          </div>
          <div class="field">
            <span class="field-label">Estado:</span>
            <span class="field-val"><span class="badge">${estudiantePrincipal.estado}</span></span>
          </div>
        </div>
        <div class="card">
          <h2>Estudiantes Registrados (${estudiantesData.length})</h2>
          <table class="table">
            <thead>
              <tr><th>ID</th><th>Nombre</th><th>Curso</th><th>Estado</th></tr>
            </thead>
            <tbody>
              ${estudiantesData.map(e => `
                <tr>
                  <td>#${e.id}</td>
                  <td><strong>${e.nombre}</strong></td>
                  <td>${e.curso}</td>
                  <td><span class="badge">${e.estado}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </body>
    </html>
  `);
});

// CASO 2: HealthCarePlus - Pacientes
app.get('/preview/caso2', (req, res) => {
  const pacientePrincipal = pacientesData[0];
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>HealthCarePlus - Registro de Pacientes</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 32px 20px; background: #f0fdf4; color: #064e3b; }
        .wrapper { max-width: 680px; margin: 0 auto; }
        .header { background: #047857; color: white; padding: 24px; border-radius: 12px; margin-bottom: 24px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
        .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 700; color: #ffffff; }
        .header p { margin: 0; font-size: 13px; color: #a7f3d0; }
        .card { background: white; border-radius: 12px; padding: 22px; border: 1px solid #d1fae5; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); color: #1f2937; }
        .card h2 { margin: 0 0 16px 0; font-size: 16px; color: #065f46; border-bottom: 2px solid #10b981; padding-bottom: 6px; display: inline-block; }
        .field { margin-bottom: 12px; display: flex; align-items: baseline; }
        .field-label { width: 130px; font-weight: 600; color: #059669; font-size: 14px; }
        .field-val { font-size: 15px; color: #111827; font-weight: 500; }
        .badge { background: #dcfce7; color: #15803d; padding: 3px 10px; border-radius: 999px; font-size: 12px; font-weight: 600; }
        .table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 13px; }
        .table th, .table td { padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: left; }
        .table th { background: #f0fdf4; color: #065f46; font-weight: 600; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <h1>Sistema de Registro de Pacientes - Funcionando Correctamente</h1>
          <p>HealthCarePlus Hospital · Servidor Local Node.js + Express</p>
        </div>
        <div class="card">
          <h2>Información Básica del Paciente</h2>
          <div class="field">
            <span class="field-label">Nombre:</span>
            <span class="field-val">${pacientePrincipal.nombre}</span>
          </div>
          <div class="field">
            <span class="field-label">Edad:</span>
            <span class="field-val">${pacientePrincipal.edad} años</span>
          </div>
          <div class="field">
            <span class="field-label">Diagnóstico:</span>
            <span class="field-val">${pacientePrincipal.diagnostico}</span>
          </div>
          <div class="field">
            <span class="field-label">Estado:</span>
            <span class="field-val"><span class="badge">${pacientePrincipal.estado}</span></span>
          </div>
        </div>
        <div class="card">
          <h2>Pacientes Registrados (${pacientesData.length})</h2>
          <table class="table">
            <thead>
              <tr><th>ID</th><th>Nombre</th><th>Edad</th><th>Diagnóstico</th><th>Estado</th></tr>
            </thead>
            <tbody>
              ${pacientesData.map(p => `
                <tr>
                  <td>#${p.id}</td>
                  <td><strong>${p.nombre}</strong></td>
                  <td>${p.edad} años</td>
                  <td>${p.diagnostico}</td>
                  <td><span class="badge">${p.estado}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </body>
    </html>
  `);
});

// CASO 3: EduTechPro - Cursos
app.get('/preview/caso3', (req, res) => {
  const cursoPrincipal = cursosData[0];
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>EduTechPro - Registro de Cursos</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 32px 20px; background: #faf5ff; color: #3b0764; }
        .wrapper { max-width: 680px; margin: 0 auto; }
        .header { background: #7e22ce; color: white; padding: 24px; border-radius: 12px; margin-bottom: 24px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
        .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 700; color: #ffffff; }
        .header p { margin: 0; font-size: 13px; color: #e9d5ff; }
        .card { background: white; border-radius: 12px; padding: 22px; border: 1px solid #f3e8ff; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); color: #1f2937; }
        .card h2 { margin: 0 0 16px 0; font-size: 16px; color: #7e22ce; border-bottom: 2px solid #a855f7; padding-bottom: 6px; display: inline-block; }
        .field { margin-bottom: 12px; display: flex; align-items: baseline; }
        .field-label { width: 140px; font-weight: 600; color: #7e22ce; font-size: 14px; }
        .field-val { font-size: 15px; color: #111827; font-weight: 500; }
        .badge { background: #f3e8ff; color: #7e22ce; padding: 3px 10px; border-radius: 999px; font-size: 12px; font-weight: 600; }
        .table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 13px; }
        .table th, .table td { padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: left; }
        .table th { background: #faf5ff; color: #7e22ce; font-weight: 600; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <h1>Sistema de Registro de Cursos - Funcionando Correctamente</h1>
          <p>EduTechPro Learning Academy · Servidor Local Node.js + Express</p>
        </div>
        <div class="card">
          <h2>Información Básica del Curso</h2>
          <div class="field">
            <span class="field-label">Nombre del curso:</span>
            <span class="field-val"><strong>${cursoPrincipal.nombreCurso}</strong></span>
          </div>
          <div class="field">
            <span class="field-label">Duración:</span>
            <span class="field-val">${cursoPrincipal.duracion}</span>
          </div>
          <div class="field">
            <span class="field-label">Instructor:</span>
            <span class="field-val">${cursoPrincipal.instructor}</span>
          </div>
          <div class="field">
            <span class="field-label">Estado:</span>
            <span class="field-val"><span class="badge">${cursoPrincipal.estado}</span></span>
          </div>
        </div>
        <div class="card">
          <h2>Cursos Disponibles (${cursosData.length})</h2>
          <table class="table">
            <thead>
              <tr><th>ID</th><th>Nombre del Curso</th><th>Duración</th><th>Instructor</th><th>Estado</th></tr>
            </thead>
            <tbody>
              ${cursosData.map(c => `
                <tr>
                  <td>#${c.id}</td>
                  <td><strong>${c.nombreCurso}</strong></td>
                  <td>${c.duracion}</td>
                  <td>${c.instructor}</td>
                  <td><span class="badge">${c.estado}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </body>
    </html>
  `);
});

// ==========================================
// REST API Endpoints for the Interactive App
// ==========================================

// CASO 1: Estudiantes API
app.get('/api/caso1/estudiantes', (req, res) => {
  res.json({
    mensaje: "Sistema de Registro de Estudiantes - Funcionando Correctamente",
    empresa: "TechSolutions",
    total: estudiantesData.length,
    estudianteDestacado: estudiantesData[0],
    estudiantes: estudiantesData
  });
});

app.post('/api/caso1/estudiantes', (req, res) => {
  const { nombre, curso, estado } = req.body;
  if (!nombre || !curso) {
    return res.status(400).json({ error: "Nombre y curso son obligatorios" });
  }
  const nuevo: Estudiante = {
    id: estudiantesData.length + 1,
    nombre: nombre.trim(),
    curso: curso.trim(),
    estado: estado || "Activo",
    fechaRegistro: new Date().toISOString().split('T')[0]
  };
  estudiantesData.unshift(nuevo);
  res.status(201).json({
    mensaje: "Estudiante registrado satisfactoriamente",
    estudiante: nuevo
  });
});

// CASO 2: Pacientes API
app.get('/api/caso2/pacientes', (req, res) => {
  res.json({
    mensaje: "Sistema de Registro de Pacientes - Funcionando Correctamente",
    empresa: "HealthCarePlus",
    total: pacientesData.length,
    pacienteDestacado: pacientesData[0],
    pacientes: pacientesData
  });
});

app.post('/api/caso2/pacientes', (req, res) => {
  const { nombre, edad, diagnostico, estado } = req.body;
  if (!nombre || !edad || !diagnostico) {
    return res.status(400).json({ error: "Nombre, edad y diagnóstico son obligatorios" });
  }
  const nuevo: Paciente = {
    id: pacientesData.length + 1,
    nombre: nombre.trim(),
    edad: parseInt(edad, 10),
    diagnostico: diagnostico.trim(),
    estado: estado || "Estable",
    fechaIngreso: new Date().toISOString().split('T')[0]
  };
  pacientesData.unshift(nuevo);
  res.status(201).json({
    mensaje: "Paciente registrado satisfactoriamente",
    paciente: nuevo
  });
});

// CASO 3: Cursos API
app.get('/api/caso3/cursos', (req, res) => {
  res.json({
    mensaje: "Sistema de Registro de Cursos - Funcionando Correctamente",
    empresa: "EduTechPro",
    total: cursosData.length,
    cursoDestacado: cursosData[0],
    cursos: cursosData
  });
});

app.post('/api/caso3/cursos', (req, res) => {
  const { nombreCurso, duracion, instructor, estado } = req.body;
  if (!nombreCurso || !duracion || !instructor) {
    return res.status(400).json({ error: "Nombre de curso, duración e instructor son obligatorios" });
  }
  const nuevo: Curso = {
    id: cursosData.length + 1,
    nombreCurso: nombreCurso.trim(),
    duracion: duracion.trim(),
    instructor: instructor.trim(),
    estado: estado || "Activo",
    categoria: req.body.categoria || "Especialidad"
  };
  cursosData.unshift(nuevo);
  res.status(201).json({
    mensaje: "Curso registrado satisfactoriamente",
    curso: nuevo
  });
});

// API para inspeccionar archivos físicos de cada carpeta
app.get('/api/archivos/:caso/:archivo', (req, res) => {
  const { caso, archivo } = req.params;
  const mapaCasos: Record<string, string> = {
    'caso1': path.resolve(__dirname, 'CASO1/estudiantes-techsolutions'),
    'caso2': path.resolve(__dirname, 'CASO2/pacientes-healthcareplus'),
    'caso3': path.resolve(__dirname, 'CASO3/cursos-edutechpro')
  };

  const carpeta = mapaCasos[caso];
  if (!carpeta) {
    return res.status(404).json({ error: 'Caso no encontrado' });
  }

  const archivoPermitido = ['index.js', 'package.json', 'README.md'].find(a => a === archivo);
  if (!archivoPermitido) {
    return res.status(400).json({ error: 'Archivo no permitido' });
  }

  const filePath = path.join(carpeta, archivoPermitido);
  try {
    if (fs.existsSync(filePath)) {
      const contenido = fs.readFileSync(filePath, 'utf-8');
      res.json({ caso, archivo: archivoPermitido, contenido });
    } else {
      res.status(404).json({ error: 'Archivo no existe' });
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: errorMsg });
  }
});

// ==========================================
// Vite Dev Server / Static Assets
// ==========================================
async function start() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[FullStack] Servidor Node.js + Express activo en http://0.0.0.0:${PORT}`);
  });
}

start().catch(err => {
  console.error("Error al iniciar el servidor:", err);
});
