import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import {
  BsFillStarFill,
  BsFillBriefcaseFill,
  BsBoxArrowUpRight,
} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'
import SimilarItem from '../SimilarItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
class JobItem extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetails: {},
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      this.onApiSuccess(data.job_details, data.similar_jobs)
    } else {
      this.onApiFailure()
    }
  }

  onApiSuccess = (jobItem, similarItem) => {
    const lifeAtCompany = {
      description: jobItem.life_at_company.description,
      imageUrl: jobItem.life_at_company.image_url,
    }
    const skills = jobItem.skills.map(object => ({
      name: object.name,
      imageUrl: object.image_url,
    }))
    const formattedJobDetails = {
      companyLogoUrl: jobItem.company_logo_url,
      companyWebsiteUrl: jobItem.company_website_url,
      employmentType: jobItem.employment_type,
      id: jobItem.id,
      jobDescription: jobItem.job_description,
      skills,
      lifeAtCompany,
      location: jobItem.location,
      packagePerAnnum: jobItem.package_per_annum,
      rating: jobItem.rating,
      title: jobItem.title,
    }

    const formattedSimilarJobs = similarItem.map(object => ({
      companyLogoUrl: object.company_logo_url,
      employmentType: object.employment_type,
      id: object.id,
      jobDescription: object.job_description,
      location: object.location,
      rating: object.rating,
      title: object.title,
    }))

    this.setState({
      jobDetails: formattedJobDetails,
      similarJobs: formattedSimilarJobs,
      apiStatus: apiStatusConstants.success,
    })
  }

  onApiFailure = () => {
    this.setState({
      apiStatus: apiStatusConstants.failure,
    })
  }

  renderJobDetailsLoader = () => (
    <div className="loader-container-jobs" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsApiFailure = () => (
    <div className="jobs-failure-container">
      <img
        className="jf-img"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1 className="jf-head">Oops! Something Went Wrong</h1>
      <p className="jf-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="retry-btn"
        type="button"
        onClick={this.getJobItemDetails}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetailsApiSuccess = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      companyWebsiteUrl,
      skills,
      lifeAtCompany,
    } = jobDetails

    return (
      <div className="job-details-container">
        <div className="job-list-item">
          <div className="logo-container">
            <img
              className="company-logo"
              alt="job details company logo"
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
          <div className="website-link-container">
            <h1 className="desc-head">Description</h1>
            <a
              className="website-link"
              href={companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
            >
              Visit <BsBoxArrowUpRight className="arrow-icon" />
            </a>
          </div>
          <p className="desc-para">{jobDescription}</p>
          <h1 className="desc-head">Skills</h1>
          <ul className="skills-list-container">
            {skills &&
              skills.map(object => (
                <li className="skill-item" key={object.name}>
                  <img
                    className="skill-img"
                    alt={object.name}
                    src={object.imageUrl}
                  />
                  <p className="skill-name">{object.name}</p>
                </li>
              ))}
          </ul>
          {lifeAtCompany && (
            <div className="lac-container">
              <div className="lac-desc-container">
                <h1 className="desc-head">Life at Company</h1>
                <p className="desc-para">{lifeAtCompany.description}</p>
              </div>
              <img
                className="lac-img"
                alt="life at company"
                src={lifeAtCompany.imageUrl}
              />
            </div>
          )}
        </div>
        <div>
          <h1 className="similar-jobs-head">Similar Jobs</h1>
          <ul className="smj-list-container">
            {similarJobs.map(object => (
              <SimilarItem key={object.id} item={object} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    return (
      <>
        {(() => {
          switch (apiStatus) {
            case apiStatusConstants.inProgress:
              return this.renderJobDetailsLoader()
            case apiStatusConstants.success:
              return this.renderJobDetailsApiSuccess()
            case apiStatusConstants.failure:
              return this.renderJobDetailsApiFailure()

            default:
              return null
          }
        })()}
      </>
    )
  }
}

export default JobItem
