import { User, Profile } from "../../types/models"
import { Link, Navigate } from "react-router-dom"
import { useState, useEffect } from "react" 

import FamilyInfo from '../../components/FamilyInfo/FamilyInfo';

import * as profileService from '../../services/profileService'

interface MyProfileProps {
  profile: Profile
}

const MyProfile = (props: MyProfileProps): JSX.Element => {
  // const [profile, setProfile] = useState<Profile>()
  const { profile } = props

  // useEffect((): void  => {
  //   const fetchProfile = async (): Promise<void> => {
  //     try {
  //       const profileData: Profile = await profileService.getProfile(props.user.profile.id)
  //       setProfile(profileData)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   if (props.user) fetchProfile()
  // }, [])

  if (!profile) {
    return <Navigate to='/' replace />
  }


  return (
    <>

          <FamilyInfo profile={props.profile}/>
          <br/>
          {profile.lastName}
          <br/>
          LISTED DOGS LINK TO EDIT DOG
          <br/>
          FUTURE DOGS LINK TO DOG DEETS

        <Link state={{profile}} to='/profile/edit'>
          Edit The {profile.lastName}s
        </Link>
    </>
  )

}

export default MyProfile