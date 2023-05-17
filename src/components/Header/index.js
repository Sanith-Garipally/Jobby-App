import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const logout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="navbar">
      <div className="nav-items-container">
        <Link to="/">
          <img
            className="logo"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
        </Link>
        {/* small screens container */}
        <ul className="sm-list-container">
          <Link to="/">
            <li>
              <AiFillHome className="sm-nav-icon" />
            </li>
          </Link>
          <Link to="/jobs">
            <li>
              <BsFillBriefcaseFill className="sm-nav-icon" />
            </li>
          </Link>
          <li>
            <button onClick={logout} type="button" className="sm-nav-btn">
              <FiLogOut className="sm-nav-icon" />
            </button>
          </li>
        </ul>
        {/* large screen container */}
        <ul className="lg-list-container">
          <div className="lg-nav-items-container">
            <Link to="/" className="link">
              <li className="nav-home-jobs">Home</li>
            </Link>
            <Link className="link" to="/jobs">
              <li className="nav-home-jobs">Jobs</li>
            </Link>
          </div>
          <li>
            <button onClick={logout} className="lg-nav-btn" type="button">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default withRouter(Header)
