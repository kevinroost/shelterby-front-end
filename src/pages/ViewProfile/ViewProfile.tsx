import { Profile } from "../../types/models"
import { useState, useEffect } from "react" 
import { useParams } from "react-router"

import * as profileService from '../../services/profileService'

type Params = {
  profileId?: string;
}

const ViewProfile = (): JSX.Element => {
  const [profile, setProfile] = useState<Profile>()
  const {profileId} = useParams<Params>()
  console.log('ID', profileId);
  
  if (profileId) {
  useEffect((): void  => {
    const fetchProfile = async (): Promise<void> => {
      try {
        const profileData: Profile = await profileService.getProfile(parseInt(profileId))
        setProfile(profileData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProfile()
  }, [])
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
    </>
  )

}

export default ViewProfile