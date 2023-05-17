import {Link} from 'react-router-dom'
import './index.css'

const Home = () => (
  <div className="home-container">
    <div className="hm-content-container">
      <h1 className="hm-head">Find The Job That Fits Your Life</h1>
      <p className="hm-para">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs">
        <button className="hm-btn" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
