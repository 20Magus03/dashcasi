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

  const deleteProject = (id: number) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

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
    <div className={`dashboard-wrapper ${isNavOpen ? 'nav-open' : 'nav-closed'}`}>
      {/* Sidebar */}
      <div className={`sidebar ${isNavOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={() => setIsNavOpen(false)}>✖</button>
        <h2>Menú</h2>
        <ul>
          <li>🏠 Inicio</li>
          <li>📂 Mis Proyectos</li>
          <li>⚙ Configuración</li>
          <li>🚪 Salir</li>
        </ul>
      </div>
      {/* Botón de menú */}
      <button className="menu-btn" onClick={() => setIsNavOpen(!isNavOpen)}>☰</button>
      {/* Contenido del Dashboard */}
      <div className="dashboard-container">

        <div className="add-project">
          <div className='titulo'><h1>📊 Dashboard de Proyectos</h1></div>
          <input
            type="text"
            placeholder="Nombre del Proyecto"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <button onClick={addProject} className="btn-add">➕ Agregar</button>
        </div>

        {/* Resumen de proyectos con más separación */}
        <div className="projects-summary">
          <div className='primer-summary'>
            <div className="summary-card completed">
              <h2>✅ Completados</h2>
              <h3>{completedProjects}</h3>
            </div>
            <div className="summary-card-spacer"></div>
            <div className="summary-card progress">
              <h2>🚀 En Progreso</h2>
              <h3>{projects.length - completedProjects}</h3>
            </div>
          </div>
          <div className="projects-list">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <h3>{project.name}</h3>
                <p>Status: <strong>{project.status}</strong></p>
                <div className="project-actions">
                  {project.status === 'En progreso' && (
                    <button onClick={() => completeProject(project.id)} className="btn-complete">✔ Completar</button>
                  )}
                  <button onClick={() => deleteProject(project.id)} className="btn-delete">🗑 Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ClientDashboard;
