import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const JobList = props => {
  const {item} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = item

  return (
    <Link className="link-item" to={`jobs/${id}`}>
      <li className="job-list-item">
        <div className="logo-container">
          <img
            className="company-logo"
            alt="company logo"
            src={companyLogoUrl}
          />
          <div className="title-container">
            <h1 className="title">{title}</h1>
            <div className="rating-container">
              <BsFillStarFill className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="lpet-container">
          <div className="lp-container">
            <div className="location-package-container">
              <MdLocationOn className="location-package-icon" />
              <p className="lp-para">{location}</p>
            </div>
            <div className="location-package-container">
              <BsFillBriefcaseFill className="location-package-icon" />
              <p className="lp-para">{employmentType}</p>
            </div>
          </div>
          <p className="package-para">{packagePerAnnum}</p>
        </div>
        <div>
          <hr className="hr" />
        </div>
        <div>
          <h1 className="desc-head">Description</h1>
          <p className="desc-para">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobList
