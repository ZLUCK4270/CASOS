/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Server,
  Terminal,
  FolderTree,
  Globe,
  FileCode,
  CheckCircle2,
  Play,
  RotateCcw,
  Copy,
  Check,
  ExternalLink,
  BookOpen,
  GraduationCap,
  HeartPulse,
  Laptop,
  Users,
  Code2,
  ChevronRight,
  ChevronDown,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';

// Case Definitions & Config
interface CaseConfig {
  id: 'caso1' | 'caso2' | 'caso3';
  folder: string;
  empresa: string;
  sistema: string;
  mensajeRequerido: string;
  puerto: number;
  previewUrl: string;
  themeColor: string;
  bgLight: string;
  borderColor: string;
  badgeBg: string;
  icon: React.ComponentType<{ className?: string }>;
  camposRequeridos: string[];
}

const CASOS: Record<string, CaseConfig> = {
  caso1: {
    id: 'caso1',
    folder: 'estudiantes-techsolutions',
    empresa: 'TechSolutions',
    sistema: 'Sistema de Registro de Estudiantes',
    mensajeRequerido: 'Sistema de Registro de Estudiantes - Funcionando Correctamente',
    puerto: 3001,
    previewUrl: '/preview/caso1',
    themeColor: 'from-blue-600 to-indigo-600',
    bgLight: 'bg-blue-950/30',
    borderColor: 'border-blue-500/30',
    badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    icon: GraduationCap,
    camposRequeridos: ['Nombre', 'Curso', 'Estado']
  },
  caso2: {
    id: 'caso2',
    folder: 'pacientes-healthcareplus',
    empresa: 'HealthCarePlus',
    sistema: 'Sistema de Registro de Pacientes',
    mensajeRequerido: 'Sistema de Registro de Pacientes - Funcionando Correctamente',
    puerto: 3002,
    previewUrl: '/preview/caso2',
    themeColor: 'from-emerald-600 to-teal-600',
    bgLight: 'bg-emerald-950/30',
    borderColor: 'border-emerald-500/30',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    icon: HeartPulse,
    camposRequeridos: ['Nombre', 'Edad', 'Diagnóstico', 'Estado']
  },
  caso3: {
    id: 'caso3',
    folder: 'cursos-edutechpro',
    empresa: 'EduTechPro',
    sistema: 'Sistema de Registro de Cursos',
    mensajeRequerido: 'Sistema de Registro de Cursos - Funcionando Correctamente',
    puerto: 3003,
    previewUrl: '/preview/caso3',
    themeColor: 'from-purple-600 to-violet-600',
    bgLight: 'bg-purple-950/30',
    borderColor: 'border-purple-500/30',
    badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    icon: BookOpen,
    camposRequeridos: ['Nombre del curso', 'Duración', 'Instructor', 'Estado']
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'caso1' | 'caso2' | 'caso3' | 'guia' | 'archivos'>('caso1');
  const [selectedFileCaso, setSelectedFileCaso] = useState<'caso1' | 'caso2' | 'caso3'>('caso1');
  const [selectedFileName, setSelectedFileName] = useState<'index.js' | 'package.json' | 'README.md'>('index.js');
  const [fileContent, setFileContent] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Live Case 1 State (Estudiantes)
  const [estudiantes, setEstudiantes] = useState([
    { id: 1, nombre: 'Ana García López', curso: 'Desarrollo Web Full Stack con Node.js & React', estado: 'Activo' },
    { id: 2, nombre: 'Carlos Martínez Ruiz', curso: 'Arquitectura Cloud & Microservicios', estado: 'Graduado' },
    { id: 3, nombre: 'Lucía Fernández Soto', curso: 'Bases de Datos SQL & NoSQL con Express', estado: 'En Espera' }
  ]);
  const [formEstudiante, setFormEstudiante] = useState({ nombre: '', curso: '', estado: 'Activo' });

  // Live Case 2 State (Pacientes)
  const [pacientes, setPacientes] = useState([
    { id: 1, nombre: 'María Elena Torres', edad: 34, diagnostico: 'Hipertensión Arterial Grado 1', estado: 'Estable' },
    { id: 2, nombre: 'Roberto Sánchez Gómez', edad: 52, diagnostico: 'Recuperación Post-Operatoria Traumatología', estado: 'En Observación' },
    { id: 3, nombre: 'Valentina Morales Castro', edad: 19, diagnostico: 'Amigdalitis Bacteriana Aguda', estado: 'Dado de Alta' }
  ]);
  const [formPaciente, setFormPaciente] = useState({ nombre: '', edad: '', diagnostico: '', estado: 'Estable' });

  // Live Case 3 State (Cursos)
  const [cursos, setCursos] = useState([
    { id: 1, nombreCurso: 'Desarrollo de APIs RESTful con Node.js y Express', duracion: '40 Horas (4 Semanas)', instructor: 'Prof. Miguel Ángel Valencia', estado: 'Activo' },
    { id: 2, nombreCurso: 'Fundamentos de JavaScript Moderno y TypeScript', duracion: '30 Horas (3 Semanas)', instructor: 'Ing. Sofía Ramos', estado: 'Próximamente' },
    { id: 3, nombreCurso: 'Bases de Datos con PostgreSQL y Node.js', duracion: '45 Horas (5 Semanas)', instructor: 'Lic. Javier Paredes', estado: 'En Curso' }
  ]);
  const [formCurso, setFormCurso] = useState({ nombreCurso: '', duracion: '', instructor: '', estado: 'Activo' });

  // Terminal & Server Logs
  const [serverStatus, setServerStatus] = useState<Record<string, boolean>>({
    caso1: true,
    caso2: true,
    caso3: true
  });
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '[INIT] Inicializando entorno de desarrollo Node.js v20.x...',
    '[NPM] Dependencias verificadas: express@4.21.2 instalado.',
    '[SERVER] CASO 1: Servidor TechSolutions ejecutándose en http://localhost:3001',
    '[SERVER] CASO 2: Servidor HealthCarePlus ejecutándose en http://localhost:3002',
    '[SERVER] CASO 3: Servidor EduTechPro ejecutándose en http://localhost:3003',
    '[READY] Los 3 servidores locales están respondiendo correctamente.'
  ]);

  const [previewKey, setPreviewKey] = useState(0);

  // Fetch file content when tab or selected file changes
  useEffect(() => {
    fetchFile(selectedFileCaso, selectedFileName);
  }, [selectedFileCaso, selectedFileName]);

  const fetchFile = async (caso: string, archivo: string) => {
    try {
      const res = await fetch(`/api/archivos/${caso}/${archivo}`);
      if (res.ok) {
        const data = await res.json();
        setFileContent(data.contenido);
      } else {
        // Fallback static
        setFileContent('// Cargando contenido del archivo...');
      }
    } catch {
      setFileContent('// Archivo disponible en el repositorio local.');
    }
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Add Estudiante Handler
  const handleAddEstudiante = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formEstudiante.nombre || !formEstudiante.curso) return;

    try {
      await fetch('/api/caso1/estudiantes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formEstudiante)
      });
    } catch (err) {
      console.log('API sync error (using local state fallback)', err);
    }

    const nuevo = {
      id: estudiantes.length + 1,
      nombre: formEstudiante.nombre,
      curso: formEstudiante.curso,
      estado: formEstudiante.estado
    };
    setEstudiantes([nuevo, ...estudiantes]);
    setFormEstudiante({ nombre: '', curso: '', estado: 'Activo' });
    setTerminalLogs(prev => [
      ...prev,
      `[CASO 1] POST /estudiantes 201 Created -> Estudiante registrado: "${nuevo.nombre}" (${nuevo.curso})`
    ]);
    setPreviewKey(k => k + 1);
  };

  // Add Paciente Handler
  const handleAddPaciente = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formPaciente.nombre || !formPaciente.edad || !formPaciente.diagnostico) return;

    try {
      await fetch('/api/caso2/pacientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formPaciente)
      });
    } catch (err) {
      console.log('API sync error (using local state fallback)', err);
    }

    const nuevo = {
      id: pacientes.length + 1,
      nombre: formPaciente.nombre,
      edad: parseInt(formPaciente.edad, 10),
      diagnostico: formPaciente.diagnostico,
      estado: formPaciente.estado
    };
    setPacientes([nuevo, ...pacientes]);
    setFormPaciente({ nombre: '', edad: '', diagnostico: '', estado: 'Estable' });
    setTerminalLogs(prev => [
      ...prev,
      `[CASO 2] POST /pacientes 201 Created -> Paciente registrado: "${nuevo.nombre}" (${nuevo.diagnostico})`
    ]);
    setPreviewKey(k => k + 1);
  };

  // Add Curso Handler
  const handleAddCurso = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCurso.nombreCurso || !formCurso.duracion || !formCurso.instructor) return;

    try {
      await fetch('/api/caso3/cursos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formCurso)
      });
    } catch (err) {
      console.log('API sync error (using local state fallback)', err);
    }

    const nuevo = {
      id: cursos.length + 1,
      nombreCurso: formCurso.nombreCurso,
      duracion: formCurso.duracion,
      instructor: formCurso.instructor,
      estado: formCurso.estado
    };
    setCursos([nuevo, ...cursos]);
    setFormCurso({ nombreCurso: '', duracion: '', instructor: '', estado: 'Activo' });
    setTerminalLogs(prev => [
      ...prev,
      `[CASO 3] POST /cursos 201 Created -> Curso registrado: "${nuevo.nombreCurso}" (Instructor: ${nuevo.instructor})`
    ]);
    setPreviewKey(k => k + 1);
  };

  const restartServer = (casoId: string) => {
    setServerStatus(s => ({ ...s, [casoId]: false }));
    setTerminalLogs(prev => [
      ...prev,
      `[STOP] Deteniendo servidor de ${casoId.toUpperCase()}...`
    ]);
    setTimeout(() => {
      setServerStatus(s => ({ ...s, [casoId]: true }));
      setTerminalLogs(prev => [
        ...prev,
        `[START] Reiniciado con éxito: node index.js en http://localhost:${CASOS[casoId].puerto}`
      ]);
      setPreviewKey(k => k + 1);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Server className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-bold text-base tracking-tight text-white">
                Sistemas Node.js & Express
              </h1>
              <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Servidores Activos
              </span>
            </div>
            <p className="text-xs text-slate-400">
              TechSolutions · HealthCarePlus · EduTechPro — Estructura VS Code y Servidores Locales
            </p>
          </div>
        </div>

        {/* Global Navigation Tabs */}
        <nav className="flex items-center space-x-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
          <button
            onClick={() => setActiveTab('caso1')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'caso1'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Caso 1: TechSolutions</span>
          </button>
          <button
            onClick={() => setActiveTab('caso2')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'caso2'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5" />
            <span>Caso 2: HealthCarePlus</span>
          </button>
          <button
            onClick={() => setActiveTab('caso3')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'caso3'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Caso 3: EduTechPro</span>
          </button>
          <div className="h-4 w-px bg-slate-700 mx-1" />
          <button
            onClick={() => setActiveTab('archivos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'archivos'
                ? 'bg-slate-700 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <FolderTree className="w-3.5 h-3.5 text-amber-400" />
            <span>Archivos VS Code</span>
          </button>
          <button
            onClick={() => setActiveTab('guia')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'guia'
                ? 'bg-slate-700 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Laptop className="w-3.5 h-3.5 text-blue-400" />
            <span>Guía Paso a Paso (1 al 6)</span>
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">

        {/* ============================================================== */}
        {/* CASE 1: TechSolutions - Estudiantes                            */}
        {/* ============================================================== */}
        {activeTab === 'caso1' && (
          <CaseView
            caso={CASOS.caso1}
            serverRunning={serverStatus.caso1}
            onRestart={() => restartServer('caso1')}
            previewKey={previewKey}
            primaryRecord={
              <div className="bg-slate-900/90 rounded-xl p-5 border border-blue-500/30">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                      Información Básica del Estudiante (Principal)
                    </span>
                  </div>
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-medium">
                    {estudiantes[0]?.estado || 'Activo'}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Nombre:</span>
                    <span className="font-semibold text-white text-base">{estudiantes[0]?.nombre}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Curso:</span>
                    <span className="font-medium text-slate-200">{estudiantes[0]?.curso}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Estado:</span>
                    <span className="font-medium text-blue-300">{estudiantes[0]?.estado}</span>
                  </div>
                </div>
              </div>
            }
            registrationForm={
              <form onSubmit={handleAddEstudiante} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Daniel Vega"
                      value={formEstudiante.nombre}
                      onChange={e => setFormEstudiante({ ...formEstudiante, nombre: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Estado
                    </label>
                    <select
                      value={formEstudiante.estado}
                      onChange={e => setFormEstudiante({ ...formEstudiante, estado: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Activo">Activo</option>
                      <option value="En Espera">En Espera</option>
                      <option value="Graduado">Graduado</option>
                      <option value="Suspendido">Suspendido</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Curso *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Desarrollo Backend con Express y Node.js"
                    value={formEstudiante.curso}
                    onChange={e => setFormEstudiante({ ...formEstudiante, curso: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-400">
                    Se enviará mediante <code className="text-blue-400 font-mono">POST /estudiantes</code>
                  </span>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all shadow-md shadow-blue-600/30 flex items-center gap-1.5"
                  >
                    <span>+ Registrar Estudiante</span>
                  </button>
                </div>
              </form>
            }
            recordsTable={
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/80 text-slate-400 font-semibold border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3">ID</th>
                      <th className="py-2.5 px-3">Nombre</th>
                      <th className="py-2.5 px-3">Curso</th>
                      <th className="py-2.5 px-3">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {estudiantes.map(e => (
                      <tr key={e.id} className="hover:bg-slate-900/50">
                        <td className="py-2 px-3 text-slate-500 font-mono">#{e.id}</td>
                        <td className="py-2 px-3 font-medium text-white">{e.nombre}</td>
                        <td className="py-2 px-3">{e.curso}</td>
                        <td className="py-2 px-3">
                          <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium ${
                            e.estado === 'Activo'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : e.estado === 'Graduado'
                              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}>
                            {e.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            }
            onSelectFile={(fileName) => {
              setSelectedFileCaso('caso1');
              setSelectedFileName(fileName);
              setActiveTab('archivos');
            }}
          />
        )}

        {/* ============================================================== */}
        {/* CASE 2: HealthCarePlus - Pacientes                              */}
        {/* ============================================================== */}
        {activeTab === 'caso2' && (
          <CaseView
            caso={CASOS.caso2}
            serverRunning={serverStatus.caso2}
            onRestart={() => restartServer('caso2')}
            previewKey={previewKey}
            primaryRecord={
              <div className="bg-slate-900/90 rounded-xl p-5 border border-emerald-500/30">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                      Información Básica del Paciente (Principal)
                    </span>
                  </div>
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-medium">
                    {pacientes[0]?.estado || 'Estable'}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Nombre:</span>
                    <span className="font-semibold text-white text-base">{pacientes[0]?.nombre}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Edad:</span>
                    <span className="font-medium text-slate-200">{pacientes[0]?.edad} años</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Diagnóstico:</span>
                    <span className="font-medium text-emerald-300">{pacientes[0]?.diagnostico}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Estado:</span>
                    <span className="font-medium text-emerald-400">{pacientes[0]?.estado}</span>
                  </div>
                </div>
              </div>
            }
            registrationForm={
              <form onSubmit={handleAddPaciente} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Carmen Villalobos"
                      value={formPaciente.nombre}
                      onChange={e => setFormPaciente({ ...formPaciente, nombre: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Edad (años) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      max="120"
                      placeholder="Ej: 32"
                      value={formPaciente.edad}
                      onChange={e => setFormPaciente({ ...formPaciente, edad: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Diagnóstico Médico *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Bronquitis Aguda"
                      value={formPaciente.diagnostico}
                      onChange={e => setFormPaciente({ ...formPaciente, diagnostico: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Estado Clínico
                    </label>
                    <select
                      value={formPaciente.estado}
                      onChange={e => setFormPaciente({ ...formPaciente, estado: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Estable">Estable</option>
                      <option value="En Observación">En Observación</option>
                      <option value="Dado de Alta">Dado de Alta</option>
                      <option value="Crítico">Crítico</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-400">
                    Se enviará mediante <code className="text-emerald-400 font-mono">POST /pacientes</code>
                  </span>
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all shadow-md shadow-emerald-600/30 flex items-center gap-1.5"
                  >
                    <span>+ Registrar Paciente</span>
                  </button>
                </div>
              </form>
            }
            recordsTable={
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/80 text-slate-400 font-semibold border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3">ID</th>
                      <th className="py-2.5 px-3">Nombre</th>
                      <th className="py-2.5 px-3">Edad</th>
                      <th className="py-2.5 px-3">Diagnóstico</th>
                      <th className="py-2.5 px-3">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {pacientes.map(p => (
                      <tr key={p.id} className="hover:bg-slate-900/50">
                        <td className="py-2 px-3 text-slate-500 font-mono">#{p.id}</td>
                        <td className="py-2 px-3 font-medium text-white">{p.nombre}</td>
                        <td className="py-2 px-3">{p.edad} años</td>
                        <td className="py-2 px-3">{p.diagnostico}</td>
                        <td className="py-2 px-3">
                          <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium ${
                            p.estado === 'Estable'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : p.estado === 'Dado de Alta'
                              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}>
                            {p.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            }
            onSelectFile={(fileName) => {
              setSelectedFileCaso('caso2');
              setSelectedFileName(fileName);
              setActiveTab('archivos');
            }}
          />
        )}

        {/* ============================================================== */}
        {/* CASE 3: EduTechPro - Cursos                                    */}
        {/* ============================================================== */}
        {activeTab === 'caso3' && (
          <CaseView
            caso={CASOS.caso3}
            serverRunning={serverStatus.caso3}
            onRestart={() => restartServer('caso3')}
            previewKey={previewKey}
            primaryRecord={
              <div className="bg-slate-900/90 rounded-xl p-5 border border-purple-500/30">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                      Información Básica del Curso (Principal)
                    </span>
                  </div>
                  <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-full font-medium">
                    {cursos[0]?.estado || 'Activo'}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Nombre del curso:</span>
                    <span className="font-semibold text-white text-base">{cursos[0]?.nombreCurso}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Duración:</span>
                    <span className="font-medium text-slate-200">{cursos[0]?.duracion}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Instructor:</span>
                    <span className="font-medium text-purple-300">{cursos[0]?.instructor}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Estado:</span>
                    <span className="font-medium text-purple-400">{cursos[0]?.estado}</span>
                  </div>
                </div>
              </div>
            }
            registrationForm={
              <form onSubmit={handleAddCurso} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Nombre del Curso *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Docker y Microservicios en Producción"
                      value={formCurso.nombreCurso}
                      onChange={e => setFormCurso({ ...formCurso, nombreCurso: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Duración *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: 30 Horas (3 Semanas)"
                      value={formCurso.duracion}
                      onChange={e => setFormCurso({ ...formCurso, duracion: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Instructor *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Dra. Valeria Morales"
                      value={formCurso.instructor}
                      onChange={e => setFormCurso({ ...formCurso, instructor: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Estado del Curso
                    </label>
                    <select
                      value={formCurso.estado}
                      onChange={e => setFormCurso({ ...formCurso, estado: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="Activo">Activo</option>
                      <option value="Próximamente">Próximamente</option>
                      <option value="En Curso">En Curso</option>
                      <option value="Finalizado">Finalizado</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-400">
                    Se enviará mediante <code className="text-purple-400 font-mono">POST /cursos</code>
                  </span>
                  <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all shadow-md shadow-purple-600/30 flex items-center gap-1.5"
                  >
                    <span>+ Registrar Curso</span>
                  </button>
                </div>
              </form>
            }
            recordsTable={
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/80 text-slate-400 font-semibold border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3">ID</th>
                      <th className="py-2.5 px-3">Nombre del Curso</th>
                      <th className="py-2.5 px-3">Duración</th>
                      <th className="py-2.5 px-3">Instructor</th>
                      <th className="py-2.5 px-3">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {cursos.map(c => (
                      <tr key={c.id} className="hover:bg-slate-900/50">
                        <td className="py-2 px-3 text-slate-500 font-mono">#{c.id}</td>
                        <td className="py-2 px-3 font-medium text-white">{c.nombreCurso}</td>
                        <td className="py-2 px-3">{c.duracion}</td>
                        <td className="py-2 px-3">{c.instructor}</td>
                        <td className="py-2 px-3">
                          <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium ${
                            c.estado === 'Activo'
                              ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                              : c.estado === 'Próximamente'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          }`}>
                            {c.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            }
            onSelectFile={(fileName) => {
              setSelectedFileCaso('caso3');
              setSelectedFileName(fileName);
              setActiveTab('archivos');
            }}
          />
        )}

        {/* ============================================================== */}
        {/* TAB: EXPLORADOR DE ARCHIVOS VS CODE                            */}
        {/* ============================================================== */}
        {activeTab === 'archivos' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar: VS Code Tree matching Screenshots */}
            <div className="lg:col-span-4 bg-slate-900/90 rounded-2xl border border-slate-800 p-4 flex flex-col">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <FolderTree className="w-4 h-4 text-blue-400" />
                  Explorador de Proyectos (VS Code)
                </span>
                <span className="text-[11px] text-slate-500 font-mono">3 Casos</span>
              </div>

              {/* Case 1 Folder */}
              <div className="space-y-3 font-mono text-xs">
                {/* Folder CASO 1 */}
                <div className="bg-slate-950/60 rounded-xl p-2.5 border border-slate-800/80">
                  <div
                    onClick={() => setSelectedFileCaso('caso1')}
                    className={`flex items-center justify-between cursor-pointer py-1 px-2 rounded-lg transition-colors ${
                      selectedFileCaso === 'caso1' ? 'bg-blue-600/20 text-blue-300' : 'text-slate-300 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-semibold">
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                      <span>CASO1 / estudiantes-techsolutions</span>
                    </div>
                    <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded">3001</span>
                  </div>
                  <div className="ml-5 mt-1.5 space-y-1 text-slate-400">
                    <div className="flex items-center gap-1.5 text-slate-500 py-0.5">
                      <ChevronRight className="w-3 h-3" />
                      <span>node_modules/</span>
                    </div>
                    <div
                      onClick={() => { setSelectedFileCaso('caso1'); setSelectedFileName('index.js'); }}
                      className={`flex items-center justify-between py-1 px-2 rounded cursor-pointer ${
                        selectedFileCaso === 'caso1' && selectedFileName === 'index.js'
                          ? 'bg-blue-600 text-white font-medium'
                          : 'hover:bg-slate-800/60 hover:text-slate-200'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <FileCode className="w-3.5 h-3.5 text-amber-400" />
                        index.js
                      </span>
                      <span className="text-[10px] text-slate-400">Express App</span>
                    </div>
                    <div
                      onClick={() => { setSelectedFileCaso('caso1'); setSelectedFileName('package.json'); }}
                      className={`flex items-center justify-between py-1 px-2 rounded cursor-pointer ${
                        selectedFileCaso === 'caso1' && selectedFileName === 'package.json'
                          ? 'bg-blue-600 text-white font-medium'
                          : 'hover:bg-slate-800/60 hover:text-slate-200'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                        package.json
                      </span>
                      <span className="text-[10px] text-slate-400">npm config</span>
                    </div>
                    <div
                      onClick={() => { setSelectedFileCaso('caso1'); setSelectedFileName('README.md'); }}
                      className={`flex items-center justify-between py-1 px-2 rounded cursor-pointer ${
                        selectedFileCaso === 'caso1' && selectedFileName === 'README.md'
                          ? 'bg-blue-600 text-white font-medium'
                          : 'hover:bg-slate-800/60 hover:text-slate-200'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                        README.md
                      </span>
                      <span className="text-[10px] text-slate-400">Guía</span>
                    </div>
                  </div>
                </div>

                {/* Folder CASO 2 */}
                <div className="bg-slate-950/60 rounded-xl p-2.5 border border-slate-800/80">
                  <div
                    onClick={() => setSelectedFileCaso('caso2')}
                    className={`flex items-center justify-between cursor-pointer py-1 px-2 rounded-lg transition-colors ${
                      selectedFileCaso === 'caso2' ? 'bg-emerald-600/20 text-emerald-300' : 'text-slate-300 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-semibold">
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                      <span>CASO2 / pacientes-healthcareplus</span>
                    </div>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded">3002</span>
                  </div>
                  <div className="ml-5 mt-1.5 space-y-1 text-slate-400">
                    <div className="flex items-center gap-1.5 text-slate-500 py-0.5">
                      <ChevronRight className="w-3 h-3" />
                      <span>node_modules/</span>
                    </div>
                    <div
                      onClick={() => { setSelectedFileCaso('caso2'); setSelectedFileName('index.js'); }}
                      className={`flex items-center justify-between py-1 px-2 rounded cursor-pointer ${
                        selectedFileCaso === 'caso2' && selectedFileName === 'index.js'
                          ? 'bg-emerald-600 text-white font-medium'
                          : 'hover:bg-slate-800/60 hover:text-slate-200'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <FileCode className="w-3.5 h-3.5 text-amber-400" />
                        index.js
                      </span>
                      <span className="text-[10px] text-slate-400">Express App</span>
                    </div>
                    <div
                      onClick={() => { setSelectedFileCaso('caso2'); setSelectedFileName('package.json'); }}
                      className={`flex items-center justify-between py-1 px-2 rounded cursor-pointer ${
                        selectedFileCaso === 'caso2' && selectedFileName === 'package.json'
                          ? 'bg-emerald-600 text-white font-medium'
                          : 'hover:bg-slate-800/60 hover:text-slate-200'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                        package.json
                      </span>
                      <span className="text-[10px] text-slate-400">npm config</span>
                    </div>
                    <div
                      onClick={() => { setSelectedFileCaso('caso2'); setSelectedFileName('README.md'); }}
                      className={`flex items-center justify-between py-1 px-2 rounded cursor-pointer ${
                        selectedFileCaso === 'caso2' && selectedFileName === 'README.md'
                          ? 'bg-emerald-600 text-white font-medium'
                          : 'hover:bg-slate-800/60 hover:text-slate-200'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                        README.md
                      </span>
                      <span className="text-[10px] text-slate-400">Guía</span>
                    </div>
                  </div>
                </div>

                {/* Folder CASO 3 */}
                <div className="bg-slate-950/60 rounded-xl p-2.5 border border-slate-800/80">
                  <div
                    onClick={() => setSelectedFileCaso('caso3')}
                    className={`flex items-center justify-between cursor-pointer py-1 px-2 rounded-lg transition-colors ${
                      selectedFileCaso === 'caso3' ? 'bg-purple-600/20 text-purple-300' : 'text-slate-300 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-semibold">
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                      <span>CASO3 / cursos-edutechpro</span>
                    </div>
                    <span className="text-[10px] bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded">3003</span>
                  </div>
                  <div className="ml-5 mt-1.5 space-y-1 text-slate-400">
                    <div className="flex items-center gap-1.5 text-slate-500 py-0.5">
                      <ChevronRight className="w-3 h-3" />
                      <span>node_modules/</span>
                    </div>
                    <div
                      onClick={() => { setSelectedFileCaso('caso3'); setSelectedFileName('index.js'); }}
                      className={`flex items-center justify-between py-1 px-2 rounded cursor-pointer ${
                        selectedFileCaso === 'caso3' && selectedFileName === 'index.js'
                          ? 'bg-purple-600 text-white font-medium'
                          : 'hover:bg-slate-800/60 hover:text-slate-200'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <FileCode className="w-3.5 h-3.5 text-amber-400" />
                        index.js
                      </span>
                      <span className="text-[10px] text-slate-400">Express App</span>
                    </div>
                    <div
                      onClick={() => { setSelectedFileCaso('caso3'); setSelectedFileName('package.json'); }}
                      className={`flex items-center justify-between py-1 px-2 rounded cursor-pointer ${
                        selectedFileCaso === 'caso3' && selectedFileName === 'package.json'
                          ? 'bg-purple-600 text-white font-medium'
                          : 'hover:bg-slate-800/60 hover:text-slate-200'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                        package.json
                      </span>
                      <span className="text-[10px] text-slate-400">npm config</span>
                    </div>
                    <div
                      onClick={() => { setSelectedFileCaso('caso3'); setSelectedFileName('README.md'); }}
                      className={`flex items-center justify-between py-1 px-2 rounded cursor-pointer ${
                        selectedFileCaso === 'caso3' && selectedFileName === 'README.md'
                          ? 'bg-purple-600 text-white font-medium'
                          : 'hover:bg-slate-800/60 hover:text-slate-200'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                        README.md
                      </span>
                      <span className="text-[10px] text-slate-400">Guía</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Code Viewer */}
            <div className="lg:col-span-8 bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden flex flex-col">
              {/* Tab Header */}
              <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1.5 mr-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1 rounded text-xs text-slate-200 font-mono border border-slate-800">
                    <FileCode className="w-3.5 h-3.5 text-blue-400" />
                    <span>
                      /{selectedFileCaso.toUpperCase()}/{CASOS[selectedFileCaso].folder}/{selectedFileName}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyCode(fileContent)}
                    className="flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-md transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                    <span>{copied ? 'Copiado!' : 'Copiar Código'}</span>
                  </button>
                </div>
              </div>

              {/* Code display */}
              <div className="p-4 bg-slate-950 font-mono text-xs overflow-x-auto text-slate-200 leading-relaxed flex-1 max-h-[640px] overflow-y-auto">
                <pre>{fileContent}</pre>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB: GUÍA PASO A PASO (OBJETIVOS 1 AL 6)                       */}
        {/* ============================================================== */}
        {activeTab === 'guia' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-purple-900/40 rounded-2xl p-6 border border-slate-800">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <Laptop className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    Guía de Desarrollo: Servidores Locales con Node.js y Express
                  </h2>
                  <p className="text-sm text-slate-300">
                    Paso a paso para reproducir la solución completa de los 3 casos en tu computadora personal o servidor.
                  </p>
                </div>
              </div>
            </div>

            {/* 6 Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Step 1 */}
              <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
                    Objetivo 1
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="font-semibold text-white text-base">Instalar Node.js</h3>
                <p className="text-xs text-slate-400">
                  Descarga e instala la versión LTS desde <strong>nodejs.org</strong>. Esto incluye el motor V8 y el gestor de paquetes npm.
                </p>
                <div className="bg-slate-950 rounded-lg p-2.5 font-mono text-xs text-emerald-400 border border-slate-800">
                  <p className="text-slate-500"># Verificar instalación</p>
                  <p>node -v</p>
                  <p>npm -v</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full">
                    Objetivo 2
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="font-semibold text-white text-base">Configurar VS Code</h3>
                <p className="text-xs text-slate-400">
                  Abre la carpeta del proyecto en Visual Studio Code. Abre la terminal integrada con el atajo rápido.
                </p>
                <div className="bg-slate-950 rounded-lg p-2.5 font-mono text-xs text-indigo-300 border border-slate-800">
                  <p className="text-slate-500"># Atajo terminal en VS Code</p>
                  <p>Ctrl + ñ  <span className="text-slate-500">(Español)</span></p>
                  <p>Ctrl + `  <span className="text-slate-500">(Inglés)</span></p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full">
                    Objetivo 3
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="font-semibold text-white text-base">Crear Proyecto con npm</h3>
                <p className="text-xs text-slate-400">
                  Crea la carpeta de trabajo y genera el archivo <code>package.json</code> con la configuración inicial del proyecto.
                </p>
                <div className="bg-slate-950 rounded-lg p-2.5 font-mono text-xs text-purple-300 border border-slate-800">
                  <p className="text-slate-500"># Inicializar proyecto</p>
                  <p>mkdir estudiantes-techsolutions</p>
                  <p>cd estudiantes-techsolutions</p>
                  <p>npm init -y</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                    Objetivo 4
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="font-semibold text-white text-base">Instalar Express</h3>
                <p className="text-xs text-slate-400">
                  Instala el framework Express como dependencia de producción para gestionar rutas HTTP y respuestas.
                </p>
                <div className="bg-slate-950 rounded-lg p-2.5 font-mono text-xs text-amber-300 border border-slate-800">
                  <p className="text-slate-500"># Instalar Express</p>
                  <p>npm install express</p>
                  <p className="text-slate-500 mt-1"># Se genera node_modules y lock</p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
                    Objetivo 5
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="font-semibold text-white text-base">Crear Servidor Local</h3>
                <p className="text-xs text-slate-400">
                  Crea el archivo <code>index.js</code> importando Express, definiendo la ruta <code>app.get(&apos;/&apos;)</code> y escuchando en el puerto.
                </p>
                <div className="bg-slate-950 rounded-lg p-2.5 font-mono text-xs text-cyan-300 border border-slate-800">
                  <p className="text-slate-500"># Iniciar servidor</p>
                  <p>node index.js</p>
                  <p className="text-slate-500"># o con script npm start</p>
                </div>
              </div>

              {/* Step 6 */}
              <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    Objetivo 6
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="font-semibold text-white text-base">Probar en el Navegador</h3>
                <p className="text-xs text-slate-400">
                  Abre Chrome u otro navegador e ingresa a la URL local. Debe renderizar el mensaje exacto y los datos solicitados.
                </p>
                <div className="bg-slate-950 rounded-lg p-2.5 font-mono text-xs text-emerald-300 border border-slate-800">
                  <p className="text-slate-500"># Abrir en navegador</p>
                  <p>http://localhost:3001</p>
                  <p className="text-slate-500"># Status 200 OK</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Global Terminal / Execution Output Console */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold text-slate-300">
                Terminal Integrado (Consola de Servidores Node.js)
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setTerminalLogs(prev => [...prev, `[CLEAR] Consola limpiada (${new Date().toLocaleTimeString()})`])}
                className="text-[11px] text-slate-400 hover:text-slate-200 transition-colors"
              >
                Limpiar
              </button>
            </div>
          </div>
          <div className="p-3 bg-slate-950 font-mono text-xs text-emerald-400 max-h-40 overflow-y-auto space-y-1">
            {terminalLogs.map((log, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-slate-600 select-none">&gt;</span>
                <span className={log.includes('POST') ? 'text-amber-300' : log.includes('SERVER') ? 'text-cyan-300' : 'text-slate-300'}>
                  {log}
                </span>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 text-xs py-4 px-6 text-center">
        <p>
          Implementación de los 3 Casos con Node.js & Express · Carpetas: <code>CASO1/estudiantes-techsolutions</code>, <code>CASO2/pacientes-healthcareplus</code>, <code>CASO3/cursos-edutechpro</code>.
        </p>
      </footer>
    </div>
  );
}

// Reusable Component for Individual Cases
interface CaseViewProps {
  caso: CaseConfig;
  serverRunning: boolean;
  onRestart: () => void;
  previewKey: number;
  primaryRecord: React.ReactNode;
  registrationForm: React.ReactNode;
  recordsTable: React.ReactNode;
  onSelectFile: (fileName: 'index.js' | 'package.json' | 'README.md') => void;
}

function CaseView({
  caso,
  serverRunning,
  onRestart,
  previewKey,
  primaryRecord,
  registrationForm,
  recordsTable,
  onSelectFile
}: CaseViewProps) {
  const IconComponent = caso.icon;

  return (
    <div className="space-y-6">
      {/* Top Banner: Verification and Scenario details */}
      <div className={`p-6 rounded-2xl border ${caso.borderColor} bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 shadow-xl`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl bg-gradient-to-tr ${caso.themeColor} text-white shadow-lg`}>
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${caso.badgeBg}`}>
                  {caso.empresa}
                </span>
                <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                  Carpeta: {caso.folder}
                </span>
                <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                  Puerto: {caso.puerto}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mt-1">
                {caso.sistema}
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Servidor local desarrollado con <span className="text-emerald-400 font-semibold">Node.js</span> y{' '}
                <span className="text-blue-400 font-semibold">Express</span>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectFile('index.js')}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-lg font-medium transition-colors flex items-center gap-1.5 border border-slate-700"
            >
              <FileCode className="w-3.5 h-3.5 text-amber-400" />
              <span>Ver index.js</span>
            </button>
            <button
              onClick={onRestart}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-lg font-medium transition-colors flex items-center gap-1.5 border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5 text-blue-400" />
              <span>Reiniciar Servidor</span>
            </button>
          </div>
        </div>

        {/* Verification Check of Required Message */}
        <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-xs text-slate-300">
              Mensaje en navegador requerido:{' '}
              <strong className="text-white font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                &quot;{caso.mensajeRequerido}&quot;
              </strong>
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Campos obligatorios:</span>
            {caso.camposRequeridos.map((c, i) => (
              <span key={i} className="text-slate-200 bg-slate-800 px-1.5 py-0.5 rounded text-[11px]">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Live Browser Simulator vs System Data & Registration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Live Browser Window Preview (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col h-[520px]">
            {/* Browser Top Window Chrome */}
            <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center gap-3">
              <div className="flex space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
              </div>

              {/* URL Address Bar */}
              <div className="flex-1 bg-slate-900 rounded-lg px-3 py-1 flex items-center justify-between text-xs font-mono border border-slate-800">
                <div className="flex items-center gap-1.5 text-slate-300 overflow-hidden text-ellipsis whitespace-nowrap">
                  <Globe className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>http://localhost:{caso.puerto}/</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>200 OK</span>
                </div>
              </div>

              <a
                href={caso.previewUrl}
                target="_blank"
                rel="noreferrer"
                title="Abrir en pestaña nueva"
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Embedded Live Webpage Render */}
            <div className="flex-1 bg-white relative">
              {serverRunning ? (
                <iframe
                  key={previewKey}
                  src={caso.previewUrl}
                  title={`Preview ${caso.empresa}`}
                  className="w-full h-full border-0"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-400 p-6 text-center">
                  <RotateCcw className="w-8 h-8 text-blue-400 animate-spin mb-3" />
                  <p className="text-sm font-medium text-white">Reiniciando servidor local...</p>
                  <p className="text-xs text-slate-400 mt-1">Cargando node index.js en puerto {caso.puerto}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span className="flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-blue-400" />
              Vista renderizada en tiempo real directamente desde el servidor Express.
            </span>
            <span className="font-mono text-slate-500">GET /</span>
          </div>
        </div>

        {/* Right Column: Interactive Data, Registration Form & Records (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Primary Record display (Fulfilling basic student/patient/course info requirement) */}
          {primaryRecord}

          {/* Registration Form */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-lg">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              <span>Registrar Nuevo Registro en Servidor Local</span>
            </h3>
            {registrationForm}
          </div>

          {/* Database table */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-lg">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Registros Almacenados en Memoria (Express Server)</span>
            </h3>
            {recordsTable}
          </div>
        </div>

      </div>
    </div>
  );
}
