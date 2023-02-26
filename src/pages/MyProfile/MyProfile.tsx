import { User, Profile } from "../../types/models"
import { Link, Navigate } from "react-router-dom"
import { useState, useEffect } from "react" 

import DogCard from "../../components/DogCard/DogCard";
import FamilyInfo from '../../components/FamilyInfo/FamilyInfo';

import { Dog } from "../../types/models";

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

          <FamilyInfo profile={profile}/>
          <h3>LISTED DOGS</h3>
          <p>make link to edit dog</p>
          {profile.listedDogs?.map((dog: Dog) => 
              <DogCard dog={dog} />
          )}
          <h3>FUTURE DOGS</h3>
          {profile.futureDogs?.map((dog: Dog) => 
            <Link to={`/dog/${dog.id}`} state={{ dog }} >
              <DogCard dog={dog} />
            </Link>
          )}

        <Link state={{profile}} to='/profile/edit'>
          Edit The {profile.lastName}s
        </Link>
    </>
  )

}

export default MyProfile