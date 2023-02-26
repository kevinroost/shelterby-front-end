import { Link, Navigate } from "react-router-dom"
import { useState, useEffect } from "react" 

import DogCard from "../../components/DogCard/DogCard";
import FamilyInfo from '../../components/FamilyInfo/FamilyInfo';

import { User, Profile, Dog } from "../../types/models"

import * as profileService from '../../services/profileService'

interface MyProfileProps {
  // profile: Profile;
  user: User | null
}

const MyProfile = (props: MyProfileProps): JSX.Element => {
  const [profile, setProfile] = useState<Profile>()
  // const { profile } = props
  const { user } = props

  if (user) {
    useEffect((): void  => {
      const fetchProfile = async (): Promise<void> => {
        try {
          const profileData: Profile = await profileService.getProfile(user.profile.id)
          setProfile(profileData)
        } catch (error) {
          console.log(error)
        }
      }
      fetchProfile()
    }, [])
  }

  if (!user) {
    return <Navigate to='/' replace />
  }


  return (
    <>
      <FamilyInfo profile={user.profile}/>

      <h3>LISTED DOGS</h3>
      <p>make link to edit dog</p>
      {profile?.listedDogs?.map((dog: Dog) => 
        <Link to={`/dog/edit`} state={{ dog }} >
          <DogCard dog={dog} />
        </Link>
      )}
      
      <h3>FUTURE DOGS</h3>
      {profile?.futureDogs?.map((dog: Dog) => 
        <Link to={`/dog/${dog.id}`} state={{ dog }} >
          <DogCard dog={dog} />
        </Link>
      )}

      <Link state={{profile}} to='/profile/edit'>
        Edit The {profile?.lastName}s
      </Link>
    </>
  )

}

export default MyProfile