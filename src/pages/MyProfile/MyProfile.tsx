import { Link, Navigate } from "react-router-dom"
import { useState, useEffect } from "react" 

import DogCard from "../../components/DogCard/DogCard";
import FamilyInfo from '../../components/FamilyInfo/FamilyInfo';
import CreateDogForm from "../../components/DogForm/CreateDogForm";

import { User, Profile, Dog } from "../../types/models"

import { EditDogFormData, PhotoFormData } from "../../types/forms";

import * as profileService from '../../services/profileService'

interface MyProfileProps {
  handleDeleteDog: (dogId: number) => void;
  handleRemoveDog: (dogId: number, profileId: number) => void;
  handleCreateDog: (formData: EditDogFormData, photoData: PhotoFormData) => void;
  user: User | null;
  profile: Profile | null;
}

const MyProfile = (props: MyProfileProps): JSX.Element => {

  const { profile, user } = props

  if (!profile) {
    return <Navigate to='/' replace />
  }

  return (
    <>
      <FamilyInfo profile={profile}/>
      <Link state={{profile}} to='/profile/edit'>
        EDIT MY INFO
      </Link>
      <h3>LIST A DOG</h3>
      <CreateDogForm handleCreateDog={props.handleCreateDog}/>

      <h3>LISTED DOGS</h3>

      <section id='dogs-main'>
        {profile?.listedDogs?.map((dog: Dog) => 
          <div className='card' key={dog.id}>
            <Link className='link' to={`/dog/${dog.id}`} state={{dog}}>
              <DogCard dog={dog} />
            </Link>
            <button onClick={() => props.handleDeleteDog(dog.id)}>x</button>
          </div>
        )}
      </section>
      
      <h3>FUTURE DOGS</h3>

      <section id='dogs-main'>
        {profile.futureDogs?.map((dog: Dog) => 
          <div className='card' key={dog.id}>
            <Link className='link' key={dog.id} to={`/dog/${dog.id}`} state={{dog}}>
              <DogCard dog={dog} />
            </Link>
            <button onClick={() => props.handleRemoveDog(dog.id, profile.id)}>x</button>
          </div>
        )}
      </section>

    </>
  )

}

export default MyProfile