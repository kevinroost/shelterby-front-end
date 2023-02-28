import './MyProfile.css'

import { Link, Navigate } from "react-router-dom"

import DogCard from "../../components/DogCard/DogCard";
import FamilyInfo from '../../components/FamilyInfo/FamilyInfo';
import CreateDogForm from "../../components/DogForm/CreateDogForm";

import { User, Profile, Dog } from "../../types/models"

import { EditDogFormData, PhotoFormData } from "../../types/forms";


interface MyProfileProps {
  handleDeleteDog: (dogId: number) => void;
  handleRemoveDog: (dogId: number, profileId: number) => void;
  handleCreateDog: (formData: EditDogFormData, photoData: PhotoFormData) => void;
  user: User | null;
  profile: Profile | null;
}

const MyProfile = (props: MyProfileProps): JSX.Element => {

  const { profile } = props

  if (!profile) {
    return <Navigate to='/' replace />
  }

  return (
    <main>
      <section id='about-my-family'>
        <h1>Hi! You're {profile.name}</h1>
        <p>Number of kids: {profile.children}</p>
        <p>Backyard: {profile.backyard}</p>
        <Link className='link' state={{profile}} to='/profile/edit'>
          <button>EDIT MY INFO</button>
        </Link>
      </section>
      <CreateDogForm handleCreateDog={props.handleCreateDog}/>

      <h2>LISTED DOGS</h2>

      <section id='dogs-main'>
        {profile?.listedDogs?.map((dog: Dog) => 
          <div className='card' key={dog.id}>
            <button onClick={() => props.handleDeleteDog(dog.id)}>x</button>
            <DogCard dog={dog} />
          </div>
        )}
      </section>
      
      <h2>FUTURE DOGS</h2>

      <section id='dogs-main'>
        {profile.futureDogs?.map((dog: Dog) => 
          <div className='card' key={dog.id}>
            <button onClick={() => props.handleRemoveDog(dog.id, profile.id)}>x</button>
            <DogCard dog={dog} />
          </div>
        )}
      </section>

    </main>
  )

}

export default MyProfile