import { useState, useEffect } from "react" 
import { useParams } from "react-router"

import './ViewProfile.css'

import FamilyInfo from '../../components/FamilyInfo/FamilyInfo';
import DogCard from "../../components/DogCard/DogCard";

import { Dog, Profile } from "../../types/models";

import * as profileService from '../../services/profileService'

type Params = {
  profileId: string
}

const ViewProfile = (): JSX.Element => {
  const [profile, setProfile] = useState<Profile>()
  const {profileId} = useParams<string>() as Params
  

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

  
  if (!profile) return <h1>Loading Family Information</h1>
  return (
    <main>
      <FamilyInfo profile={profile}/>
      <h3>Reach out to us!</h3>
      <section id='contact'>
        <div id='field-title'>
          <p>Phone Number:</p>
          <p>Email Address:</p>
        </div>
        <div id='field-info'>
          <p>{profile.phoneNumber}</p>
          <p>{profile.email}</p>
        </div>
      </section>
      {
        profile.listedDogs
      ?
        <section>
          <h2>Our Dog{profile.listedDogs.length > 1 ? `s` : ''}</h2>
          <section id='dogs-main'>
            {profile?.listedDogs.map((dog: Dog) => 
              <DogCard key={dog.id} dog={dog} />
            )}
          </section>

        </section>
      :
        <h2>We don't have any dogs</h2>
      }
    </main>
  )

}

export default ViewProfile