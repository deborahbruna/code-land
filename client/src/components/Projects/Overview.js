import React from 'react';

export default function ProjectOverview(props) {

  const { data } = props;

  const tasks = data.tasks || [];

  return (
    <>
      <div className="column">
        <span className="form-title">Project Overview</span>
        <span>Sumary</span>
        <div>
          <p><strong>Created by: </strong><span>{data.user.name} ({data.user.email})</span></p>
          <p><strong>Created at: </strong><span>{data.createdAt}</span></p>
        </div>

        <span>Tasks</span>
        {tasks &&
          <ul>
            {
              tasks.map(task => (
                <li key={task._id}>{task.title}</li>
              ))
            }
          </ul>
        }
      </div>
    </>
  )
}