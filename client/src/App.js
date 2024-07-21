import React, { useState, useEffect } from 'react';
import logo from './logo.png';
import './App.css';
import { Modal, Button } from 'react-bootstrap';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});
  const [backendData, setBackendData] = useState([]); // Initialize as empty array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data); // Print the data to the console

        // Ensure data is an array
        if (Array.isArray(data)) {
          setBackendData(data);
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleShow = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="" />
            <span className="text-uppercase p-2 text-italic font-weight-bold">
              Bid <span className="brand-color">Buddy</span>
            </span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {/* <li className="nav-item active">
                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
      <header className="App-header">
        <div className="container-fluid">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">SL. No.</th>
                  <th scope="col">Company Name</th>
                  <th scope="col">Project Budget</th>
                  <th scope="col">Bid Money</th>
                  <th scope="col">Project Deadline</th>
                  <th scope="col">Deliver Target Date</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {backendData.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center">Loading...</td>
                  </tr>
                ) : (
                  backendData.map((project, index) => (
                    <tr key={project.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{project.companyName}</td>
                      <td>{project.projectBudget}</td>
                      <td>{project.bidMoney}</td>
                      <td>{project.projectDeadline}</td>
                      <td>{project.deliverTargetDate}</td>
                      <td>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleShow(project)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Project Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Company Name:</strong> {selectedProject.companyName}</p>
            <p><strong>Project Budget:</strong> {selectedProject.projectBudget}</p>
            <p><strong>Bid Money:</strong> {selectedProject.bidMoney}</p>
            <p><strong>Project Deadline:</strong> {selectedProject.projectDeadline}</p>
            <p><strong>Deliver Target Date:</strong> {selectedProject.deliverTargetDate}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </header>
    </div>
  );
}

export default App;
