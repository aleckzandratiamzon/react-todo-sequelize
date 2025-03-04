import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Task = () => {
  const [data, setData] = useState([]);
  const [task, setTask] = useState('');
  const [error, setError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [sucessMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/todos')
      .then(res => {
        console.log('Fetched data:', res.data);  
        setData(res.data);
      })
      .catch(err => console.log(err));
  }, []);
  

  const deleteTask = (id) => {
    axios.put(`http://localhost:3001/api/todos/${id}`, {
      is_deleted: true
    })
      .then(res => {
        setData(data.filter(task => task.id !== id));
      })
      .catch(err => console.log(err));
  };

  const markAsFinished = (id) => {
    axios.put(`http://localhost:3001/api/todos/${id}`, {
      status: 'Finished'
    })
      .then(res => {
        setData(data.map(task =>
          task.id === id ? { ...task, status: 'Finished' } : task
        ));
      })
      .catch(err => console.log(err));
  };

  const handleChange = (e)=>{
    setTask(e.target.value)
    validateTask();
    console.log(task)
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted, task:", task);
    const submitButton = document.getElementById("submit-button");
  
    submitButton.disabled = true;
    submitButton.innerText = "Adding task...";
  
    axios.post('http://localhost:3001/api/todos', { task })
      .then(res => {
        console.log(res);
        setData(prevData => [res.data.todo, ...prevData]); 
        setTask('');
        setSuccessMessage(res.data.message);
        setErrorMessage('');
        submitButton.disabled = false;
        submitButton.innerText = "Add new task";
      })
      .catch(err => {
        console.log(err);
        setErrorMessage(err.response.data.error || 'Failed to add task');
        setSuccessMessage('');
        submitButton.disabled = false;
        submitButton.innerText = "Add new task";
      });
  };

  const validateTask =() =>{
    var taskInput = document.getElementById("form1").value;
    const errorAlert = document.getElementById("error-message")

    var regex = /^[a-zA-Z0-9., ]+$/;

    if (!regex.test(taskInput)) {
        setError('Only letters and numbers are allowed!')
        errorAlert.classList.remove("d-none");
    } else{
        errorAlert.classList.add("d-none");
    }
  }

  const handleClose = () => {
    const close = document.getElementById("close");
    close.classList.add("d-none");
    // window.location.reload();
  }

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: '#eee' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card rounded-3">
                <div className="card-body p-4">
                {sucessMessage && (<div id='close' className="alert alert-success" role="alert">
                  {sucessMessage}
                  <button type="button" onClick={handleClose} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>)}
                {errorMessage && (<div id='close' className="alert alert-danger" role="alert">
                  {errorMessage}
                  <button type="button" onClick={handleClose} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>)}
                  <h4 className="text-center my-3 pb-3">To Do App</h4>
                  <form className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2"  id='task-form' onSubmit={handleSubmit}>
                    <div className="col-12">
                      <div data-mdb-input-init className="form-outline">
                        <input onChange={handleChange} value={task} type="text" id="form1" className="form-control" placeholder='Enter task here' required/>
                      </div>
                    </div>
                    <div className="col-12">
                      <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary" id='submit-button' >Add new task</button>
                    </div>
                  </form>
                  <p class="fs-6 text-danger d-flex justify-content-center d-none" id="error-message">{error}</p>

                  {/* Display tasks in a table */}
                  <table className="table mb-4">
                    <thead>
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Todo item</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(data) && data.map((task, index) => (
                        <tr key={task.id}>
                          <th scope="row">{index + 1}</th>
                          <td>{task.task}</td>
                          <td>{task.status}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => deleteTask(task.id)}>
                              Delete
                            </button>
                            <button
                              type="button"
                              className="btn btn-success ms-1"
                              onClick={() => markAsFinished(task.id)}>
                              Finished
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>

                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Task;
