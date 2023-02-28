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
  handleCreateDog: (formData: EditDogFormData, photoData: PhotoFormData) => void;
  user: User | null;
  profile?: Profile;
}

const MyProfile = (props: MyProfileProps): JSX.Element => {

  const { profile, user } = props

  if (!user) {
    return <Navigate to='/' replace />
  }

  return (
    <>
      <FamilyInfo profile={user.profile}/>
      <Link state={{profile}} to='/profile/edit'>
        EDIT MY INFO
      </Link>
      <h3>LIST A DOG</h3>
      <CreateDogForm handleCreateDog={props.handleCreateDog}/>
      <h3>LISTED DOGS</h3>
      {profile?.listedDogs?.map((dog: Dog) => 
        <div key={dog.id}>
          <Link to={`/dog/${dog.id}`} state={{dog}}>
            <DogCard dog={dog} />
          </Link>
          <button onClick={() => props.handleDeleteDog(dog.id)}>x</button>
        </div>
      )}
      
      <h3>FUTURE DOGS</h3>
      {profile?.futureDogs?.map((dog: Dog) => 
        <Link key={dog.id} to={`/dog/${dog.id}`} state={{dog}}>
          <DogCard dog={dog} />
        </Link>
      )}

    </>
  )

}

export default MyProfile