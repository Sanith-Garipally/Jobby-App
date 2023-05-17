import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Profile extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    profile: {},
  }

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = `https://apis.ccbp.in/profile`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      this.onApiSuccess(data.profile_details)
    } else {
      this.onApiFailure()
    }
  }

  onApiSuccess = profileData => {
    const formattedData = {
      name: profileData.name,
      profileImageUrl: profileData.profile_image_url,
      shortBio: profileData.short_bio,
    }

    this.setState({
      profile: formattedData,
      apiStatus: apiStatusConstants.success,
    })
  }

  onApiFailure = () => {
    this.setState({
      apiStatus: apiStatusConstants.failure,
    })
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="profile-failure-container">
      <button className="retry-btn" type="button" onClick={this.getProfile}>
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {profile} = this.state
    const {name, profileImageUrl, shortBio} = profile
    return (
      <div className="profile-container">
        <img className="profile-img" alt="profile" src={profileImageUrl} />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
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
              return this.renderLoader()
            case apiStatusConstants.success:
              return this.renderSuccessView()
            case apiStatusConstants.failure:
              return this.renderFailureView()

            default:
              return null
          }
        })()}
      </>
    )
  }
}

export default Profile
