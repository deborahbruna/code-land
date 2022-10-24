import React from 'react';
import './index.css';

export default function Modal(props) {
  const { open, close, children, title } = props;

  return (
    <>
      {open && <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => close()}>&times;</span>
          <p>{title}</p>
          {children}
        </div>
      </div>
      }
    </>
  )
}