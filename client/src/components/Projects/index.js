import React, { useState } from 'react';
import ListProjects from './List';
import './styles.css';
import ProjectOverview from './Overview';

export default function Project() {
  const [showOverview, setShowOverview] = useState(false);
  const [overviewData, setOverviewData] = useState({});

  return (

    <div className="content">
      <ListProjects
        setShowOverview={setShowOverview}
        setOverviewData={setOverviewData}
      />
      <div className='column background-grey padding-1'>
        {showOverview === true &&
          <ProjectOverview
            data={overviewData}
          />
        }
      </div>
    </div>
  )
}