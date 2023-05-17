import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Component} from 'react'
import './index.css'
import Profile from '../Profile'
import JobList from '../JobList'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobs: [],
    searchText: '',
    employmentType: [],
    salaryRange: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchText, employmentType, salaryRange} = this.state
    const employmentTypeInString = employmentType.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeInString}&minimum_package=${salaryRange}&search=${searchText}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      this.onApiSuccess(data.jobs)
    } else {
      this.onApiFailure()
    }
  }

  onApiSuccess = jobList => {
    const formattedData = jobList.map(object => ({
      companyLogoUrl: object.company_logo_url,
      employmentType: object.employment_type,
      id: object.id,
      jobDescription: object.job_description,
      location: object.location,
      packagePerAnnum: object.package_per_annum,
      rating: object.rating,
      title: object.title,
    }))

    this.setState({
      jobs: formattedData,
      apiStatus: apiStatusConstants.success,
    })
  }

  onApiFailure = () => {
    this.setState({
      apiStatus: apiStatusConstants.failure,
    })
  }

  handleEmTypeChange = e => {
    const {employmentType} = this.state
    if (employmentType.includes(e.target.id)) {
      this.setState(
        {
          employmentType: employmentType.filter(id => id !== e.target.id),
        },
        this.getJobs,
      )
    } else {
      this.setState(
        {
          employmentType: [...employmentType, e.target.id],
        },
        this.getJobs,
      )
    }
  }

  handleSrChange = e => {
    this.setState(
      {
        salaryRange: e.target.id,
      },
      this.getJobs,
    )
  }

  handleSearchInput = e => {
    this.setState({
      searchText: e.target.value,
    })
  }

  handleSearchJobs = () => {
    this.getJobs()
  }

  renderJobsLoader = () => (
    <div className="loader-container-jobs" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsApiFailure = () => (
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
      <button className="retry-btn" type="button" onClick={this.getJobs}>
        Retry
      </button>
    </div>
  )

  renderJobsApiSuccess = () => {
    const {jobs} = this.state
    if (jobs.length !== 0) {
      return jobs.map(object => <JobList key={object.id} item={object} />)
    }
    return (
      <div className="nj-container">
        <img
          className="nj-img"
          alt="no jobs"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
        />
        <h1 className="nj-head">No Jobs Found</h1>
        <p className="nj-para">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  render() {
    const {apiStatus, employmentType, salaryRange, searchText} = this.state
    return (
      <div className="jobs-bg-container">
        <div className="jobs-content-container">
          <div className="sider">
            <div className="input-container-sm">
              <input
                className="search-input"
                type="search"
                placeholder="Search"
                value={searchText}
                onChange={this.handleSearchInput}
              />
              <button
                className="search-btn"
                type="button"
                onClick={this.handleSearchJobs}
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <Profile />
            <hr className="hr" />
            <h1 className="filter-para">Type of Employment</h1>
            <ul className="filter-type-container">
              {employmentTypesList.map(object => (
                <li className="filter-list-item" key={object.label}>
                  <input
                    id={object.employmentTypeId}
                    className="filter-input"
                    type="checkbox"
                    checked={employmentType.includes(object.employmentTypeId)}
                    onChange={this.handleEmTypeChange}
                  />
                  <label
                    className="filter-label"
                    htmlFor={object.employmentTypeId}
                  >
                    {object.label}
                  </label>
                </li>
              ))}
            </ul>
            <hr className="hr" />
            <h1 className="filter-para">Salary Range</h1>
            <ul className="filter-type-container">
              {salaryRangesList.map(object => (
                <li className="filter-list-item" key={object.label}>
                  <input
                    className="filter-input"
                    id={object.salaryRangeId}
                    type="radio"
                    checked={object.salaryRangeId === salaryRange}
                    onChange={this.handleSrChange}
                  />
                  <label
                    className="filter-label"
                    htmlFor={object.salaryRangeId}
                  >
                    {object.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <ul className="job-list-container">
            <li className="input-container-lg">
              <input
                className="search-input"
                type="search"
                placeholder="Search"
                value={searchText}
                onChange={this.handleSearchInput}
              />
              <button
                className="search-btn"
                type="button"
                onClick={this.handleSearchJobs}
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </li>

            {(() => {
              switch (apiStatus) {
                case apiStatusConstants.inProgress:
                  return this.renderJobsLoader()
                case apiStatusConstants.success:
                  return this.renderJobsApiSuccess()
                case apiStatusConstants.failure:
                  return this.renderJobsApiFailure()

                default:
                  return null
              }
            })()}
          </ul>
        </div>
      </div>
    )
  }
}

export default Jobs
