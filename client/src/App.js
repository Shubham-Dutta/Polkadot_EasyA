import React, { useState, useEffect } from 'react';
import logo from './logo.png';
import './App.css';
import { Modal, Button } from 'react-bootstrap';
import { web3Enable, web3Accounts, web3FromSource } from '@polkadot/extension-dapp';
import { ApiPromise, WsProvider } from '@polkadot/api';

const BidForm = ({ onClose }) => {
  const [account, setAccount] = useState(null);
  const [api, setApi] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [rating, setRating] = useState('');

  const connectToBlockchain = async () => {
    const provider = new WsProvider('ws://localhost:9944'); // Adjust the WS URL to your node
    const api = await ApiPromise.create({ provider });
    setApi(api);
  };

  const connectWallet = async () => {
    const extensions = await web3Enable('bid-buddy-app');
    if (extensions.length === 0) {
      return;
    }
    const accounts = await web3Accounts();
    setAccount(accounts[0]);
  };

  const submitBid = async () => {
    if (!api || !account) {
      return;
    }

    const injector = await web3FromSource(account.meta.source);
    await api.tx.bidding
      .submitBid(bidAmount, rating)
      .signAndSend(account.address, { signer: injector.signer });
  };

  return (
    <div>
    <div class="text-end">
    <button className="btn btn-primary mb-3 mr-2" onClick={connectToBlockchain}>
      Connect Blockchain
    </button>
    <button className="btn btn-secondary mb-3 ml-1" onClick={connectWallet}>
      Connect Wallet
    </button>
    </div>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitBid();
      }}
    >
      <div className="form-group">
        <label>Bid Amount:</label>
        <input
          type="number"
          className="form-control"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Rating:</label>
        <input
          type="number"
          step="0.1"
          className="form-control"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
      </div>
      <div class="mt-3"></div>
      <div class="text-end">
      <button type="submit" className="btn btn-success mr-3">
        Submit Bid
      </button>
      </div>
      
    </form>
  </div>
  );
};

function App() {
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});
  const [backendData, setBackendData] = useState([]);
  const [showBidForm, setShowBidForm] = useState(false); // State to manage BidForm visibility

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
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
          <div className="d-flex justify-content-between mb-3">
            <h2>All Bids</h2>
            <button
              className="btn btn-primary"
              onClick={() => setShowBidForm(true)}
            >
              Add Bid
            </button>
          </div>
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
                      <td scope="row">{index + 1}</td>
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
            <Modal.Title>Bid Details</Modal.Title>
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

        {showBidForm && (
          <Modal show={showBidForm} onHide={() => setShowBidForm(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Submit Bid</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <BidForm onClose={() => setShowBidForm(false)} />
            </Modal.Body>
          </Modal>
        )}
      </header>
    </div>
  );
}

export default App;
