import React, { useState } from 'react';
import './css/ClientDashboard.css';

interface Project {
  id: number;
  name: string;
  status: 'En progreso' | 'Completado';
}

const ClientDashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectName, setProjectName] = useState<string>('');
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  // Función para agregar un proyecto nuevo
  const addProject = () => {
    if (projectName.trim()) {
      const newProject: Project = {
        id: Date.now(),
        name: projectName,
        status: 'En progreso',
      };
      setProjects([...projects, newProject]);
      setProjectName('');
    }
  };

  // Función para eliminar un proyecto
  const deleteProject = (id: number) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  // Función para marcar un proyecto como completado
  const completeProject = (id: number) => {
    setProjects(
      projects.map((project) =>
        project.id === id ? { ...project, status: 'Completado' } : project
      )
    );
  };

  const completedProjects = projects.filter(
    (project) => project.status === 'Completado'
  ).length;

  return (
    <div className="dashboard-wrapper">
      {/* Slide Navbar */}
      <div className={`sidebar ${isNavOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={() => setIsNavOpen(false)}>✖</button>
        <h2>Menú</h2>
        <ul>
          <li>Inicio</li>
          <li>Mis Proyectos</li>
          <li>Configuración</li>
          <li>Salir</li>
        </ul>
      </div>

      {/* Botón para abrir el menú */}
      <button className="menu-btn" onClick={() => setIsNavOpen(true)}>☰</button>

      {/* Contenido del Dashboard */}
      <div className="dashboard-container">
        <h1>Dashboard de Proyectos</h1>
        <div className="add-project">
          <input
            type="text"
            placeholder="Nombre del Proyecto"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <button onClick={addProject} className="btn-add">Agregar Proyecto</button>
        </div>

        <div className="projects-summary">
  <div className="summary-card">
    <h2>✅ Completados</h2>
    <h2>{completedProjects}</h2>
  </div>
  <div className="summary-card">
    <h2>🚀 En Progreso</h2>
    <h2>{projects.length - completedProjects}</h2>
  </div>
</div>


        <div className="projects-list">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <h3>{project.name}</h3>
              <p>Status: {project.status}</p>
              <div className="project-actions">
                {project.status === 'En progreso' && (
                  <button onClick={() => completeProject(project.id)} className="btn-complete">Completar</button>
                )}
                <button onClick={() => deleteProject(project.id)} className="btn-delete">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
