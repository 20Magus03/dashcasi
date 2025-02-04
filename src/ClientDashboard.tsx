import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './css/ClientDashboard.css';
import { Link } from 'react-router-dom';

interface Project {
  id: number;
  name: string;
  status: 'En progreso' | 'Completado';
  date: string;
}

const ClientDashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectName, setProjectName] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  const addProject = () => {
    if (projectName.trim()) {
      const newProject: Project = {
        id: Date.now(),
        name: projectName,
        status: 'En progreso',
        date: selectedDate.toISOString().split('T')[0],
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

  return (
    <div className={`dashboard-wrapper ${isNavOpen ? 'nav-open' : ''}`}>
      {/* Sidebar */}
      <div className={`sidebar ${isNavOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={() => setIsNavOpen(false)}>✖</button>
        <h2>Menú</h2>
        <ul>
          <li> Inicio</li>
          <li> Mis Proyectos</li>
        </ul>
        <div><Link to='/login' className='logout-btn'>Cerrar Sesión</Link></div>
      </div>

      {/* Botón de menú */}
      <button className="menu-btn" onClick={() => setIsNavOpen(!isNavOpen)}>☰</button>

      {/* Contenido del Dashboard */}
      <div className="dashboard-container">
        <div className="calendar-container">
        <img className='logo' style={{width:'140px'}} src="../IMG/LOGO.png" alt="Logo" />
          <h2>Selecciona una fecha</h2>
          <Calendar className='calendario'onChange={(date) => setSelectedDate(date as Date)} value={selectedDate} />
          <div className="add-project">
            <input
              className='NombreProyecto'
              type="text"
              placeholder="Nombre del Proyecto"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <button onClick={addProject} className="btn-add">➕ Agregar</button>
          </div>
        </div>

        {/* Lista de todos los proyectos sin importar la fecha */}
        <div className="projects-container">
          <h2>Todos los proyectos</h2>
          {projects.length === 0 ? (
            <p>No hay proyectos.</p>
          ) : (
            <div className="projects-list">
              {projects.map((project) => (
                <div key={project.id} className="project-card">
                  <h3>{project.name}</h3>
                  <p>Status: <strong>{project.status}</strong></p>
                  <p>📅 Fecha: {project.date}</p>
                  <div className="project-actions">
                    {project.status === 'En progreso' && (
                      <button onClick={() => completeProject(project.id)} className="btn-complete">✔ Completar</button>
                    )}
                    <button onClick={() => deleteProject(project.id)} className="btn-delete">🗑 Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
