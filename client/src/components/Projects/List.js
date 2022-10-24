import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import CreateProjects from './Create';

export default function ListProjects(props) {

  const { setShowOverview, setOverviewData } = props;
  const [projects, setProjects] = useState([]);
  const [apiMessage, setApiMessage] = useState({ type: '', message: '' });

  useEffect(() => {
    api.get("api/projects")
      .then((response) => {
        setProjects(response.data.projects);
      })
      .catch((err) => {
        setApiMessage({ type: 'error', message: err.response.data.error });
      });

  }, []);

  const handleShowOverview = (id) => {
    const projectData = projects.find(project => project._id === id);
    setOverviewData(projectData);
    setShowOverview(true);
  }

  return (
    <>

      <div className="column">
        <CreateProjects />
        {apiMessage.type && <span className={apiMessage.type === 'error' ? 'notification notification-error' : 'notification notification-success'}>{apiMessage.message}</span>}
        {projects.length > 0 &&
          <ul className="projects-list">
            {
              projects.map(project => (
                <li key={project._id} className="project-list-item">
                  <button onClick={() => handleShowOverview(project._id)} className="project-list-button">
                    <svg className="project-list-arrow"><path d="M11 8L6 13 5.3 12.3 9.6 8 5.3 3.7 6 3z"></path></svg>
                    <div className="project-list-info">
                      <div className="project-list-title">{project.title}</div>
                      <div className="project-list-description">{project.description}</div>
                    </div>
                  </button>
                </li>

              ))
            }
          </ul>
        }
      </div>
    </>
  )
}