import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import { Field, Formik } from 'formik';
import Modal from '../Modal';

export default function CreateProjects() {

  const [apiMessage, setApiMessage] = useState({ type: '', message: '' });
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    api.get("api/users")
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch(() => {
        setUsers([]);
      });

  }, []);

  const handleShowModal = () => {
    const value = showModal;
    setShowModal(!value);
  }

  return (
    <>
      <Modal open={showModal} close={() => handleShowModal()}>
        <div className="form-content">
          <span className="form-title">Create new project</span>
          <Formik
            initialValues={{ title: '', description: '', tasks: { title: '', assignedTo: '' } }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              const body = {
                title: values.title,
                description: values.description,
                tasks: values.tasks.title && values.tasks.assignedTo ? [values.tasks] : []
              };

              api.post("api/projects", body)
                .then(() => {
                  setSubmitting(false);
                  history.go(0);
                })
                .catch((err) => {
                  setSubmitting(false);
                  setApiMessage({ type: 'error', message: err.response.data.error });
                });
              setTimeout(() => {
                setApiMessage({ type: '', message: '' });
              }, 5000);
            }}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form id="project-form" onSubmit={handleSubmit}>
                {apiMessage.type && <span className={apiMessage.type === 'error' ? 'notification notification-error' : 'notification notification-success'}>{apiMessage.message}</span>}
                <div className='project-inputs'>
                  <input
                    placeholder="* Title"
                    type="title"
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    required={errors.title && touched.title && errors.title}
                  />
                  <input
                    placeholder="* Description"
                    type="description"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    required={errors.description && touched.description && errors.description}
                  />
                </div>
                <div className='task-inputs'>
                  <hr></hr>
                  <span className="form-subtitle">Create a task for this project</span>
                  <div className="fields">
                    <input
                      placeholder="Task Title"
                      type="tasks.title"
                      name="tasks.title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.tasks.title}
                    />
                    {users.length > 0 ?
                      <Field as="select" name="tasks.assignedTo">
                        {
                          users.map(user => (
                            <option value={user._id}>{user.name} ({user.email})</option>
                          ))
                        }
                      </Field>
                      :
                      <div class="loading-input">
                        <div class="animated-background">
                          <div class="background-masker"></div>
                        </div>
                      </div>


                    }
                  </div>
                </div>
                <div className='button-div'>
                  {isSubmitting ?
                    <button>
                      <i className="fa fa-circle-o-notch fa-spin "></i>Saving
                    </button>
                    :
                    <button type="submit" disabled={isSubmitting}>
                      Save
                    </button>
                  }
                </div>
              </form>
            )}
          </Formik>
        </div>
      </Modal>
      <button className="create-project-button" onClick={() => handleShowModal()}>Create Project</button>
    </>
  )
}