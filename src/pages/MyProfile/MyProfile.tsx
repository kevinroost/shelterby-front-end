import { User, Profile } from "../../types/models"
import { Form, Link, Navigate } from "react-router-dom"
import { useState, useEffect } from "react" 

import * as profileService from '../../services/profileService'

interface MyProfileProps {
  user: User
}

const MyProfile = (props: MyProfileProps): JSX.Element => {
  const [profile, setProfile] = useState<Profile>()

  useEffect((): void  => {
    const fetchProfile = async (): Promise<void> => {
      try {
        const profileData: Profile = await profileService.getProfile(props.user.profile.id)
        setProfile(profileData)
      } catch (error) {
        console.log(error)
      }
    }
    if (props.user) fetchProfile()
  }, [])

  if (!props.user) {
    return <Navigate to='/' replace />
  }


  return (
    <>
        <h1>
          Profile info goes here
          <br/>
          {profile?.lastName}
          <br/>
          LISTED DOGS LINK TO EDIT DOG
          <br/>
          FUTURE DOGS LINK TO DOG DEETS
        </h1>

        <Link to='/profile/edit'>
          Edit The {props.user.profile.lastName}s
        </Link>
    </>
  )

}

export default MyProfile