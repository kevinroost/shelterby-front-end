import { Profile } from "../../types/models"
import { useState, useEffect } from "react" 
import { useParams } from "react-router"

import FamilyInfo from '../../components/FamilyInfo/FamilyInfo';

import * as profileService from '../../services/profileService'

type Params = {
  profileId: string;
}

const ViewProfile = (): JSX.Element => {
  const [profile, setProfile] = useState<Profile>()
  const {profileId} = useParams<Params>()
  
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

console.log('viewpage', profile);
console.log('viewpage', profileId);
  return (
    <>
          {profile && <FamilyInfo profile={profile}/>}
          <br/>
          LISTED DOGS LINK TO EDIT DOG
        
    </>
  )

}

export default ViewProfile