import { Profile } from "../../types/models"
import { useState, useEffect } from "react" 
import { useParams } from "react-router"
import { Link } from "react-router-dom";

import FamilyInfo from '../../components/FamilyInfo/FamilyInfo';
import DogCard from "../../components/DogCard/DogCard";

import { Dog } from "../../types/models";

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
  if (!profile) return <h1>Loading Family Information</h1>
  return (
    <>
      <FamilyInfo profile={profile}/>

      {profile?.listedDogs?.map((dog: Dog) => 
        <Link to={`/dog/${dog.id}`} state={{ dog }} >
          <DogCard dog={dog} />
        </Link>
      )}
    </>
  )

}

export default ViewProfile