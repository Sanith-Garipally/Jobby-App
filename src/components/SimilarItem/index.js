import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const SimilarItem = props => {
  const {item} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = item

  return (
    <li className="similar-list-item">
      <div className="logo-container">
        <img
          className="company-logo"
          alt="similar job company logo"
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
      <div>
        <h1 className="desc-head">Description</h1>
        <p className="desc-para">{jobDescription}</p>
      </div>
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
    </li>
  )
}

export default SimilarItem
