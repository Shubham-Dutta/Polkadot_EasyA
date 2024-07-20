import logo from './logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className='container'>
          <a className="navbar-brand" href="#">
            <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="" />
            <span className='text-uppercase p-2 text-italic font-weight-bold'>Bidding Sysytem</span>
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
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
        <div className='container-fluid'>
        
     <table class="table table-bordered">
  <thead class="thead-dark">
    <tr>
      <th scope="col">SL. No.</th>
      <th scope="col">Company Name</th>
      <th scope="col">Project Budget</th>
      <th scope="col">Bid Money</th>
      <th scope="col">Project Deadline</th>
      <th scope="col">Deliver Target Date</th>
      <th scope="col">Action</th>



    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>ABC</td>
      <td>$50000</td>
      <td>$2400</td>
      <td>26th January 2028</td>
      <td>16th December 2027</td>
      <td>
      <button class = "btn btn-success btn-sm">View</button> 

      </td>
    </tr>
   
    <tr>
      <th scope="row">2</th>
      <td>ABC</td>
      <td>$50000</td>
      <td>$2400</td>
      <td>26th January 2028</td>
      <td>16th December 2027</td>
      <td>
      <button class = "btn btn-success btn-sm">View</button> 

      </td>
    </tr>  <tr>
      <th scope="row">3</th>
      <td>ABC</td>
      <td>$50000</td>
      <td>$2400</td>
      <td>26th January 2028</td>
      <td>16th December 2027</td>
      <td>
      <button class = "btn btn-success btn-sm">View</button> 

      </td>
    </tr>
  </tbody>
</table>
</div>
          
      </header>
    </div>
  );
}

export default App;
