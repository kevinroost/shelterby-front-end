import './MyProfile.css'

import { Link, Navigate } from "react-router-dom"

import DogCard from "../../components/DogCard/DogCard";
import CreateDogForm from "../../components/DogForm/CreateDogForm";

import { User, Profile, Dog } from "../../types/models"

import { CreateDogFormData, PhotoFormData } from "../../types/forms";


interface MyProfileProps {
  handleDeleteDog: (dogId: number) => void;
  handleRemoveDog: (dogId: number, profileId: number) => void;
  handleCreateDog: (formData: CreateDogFormData, photoData: PhotoFormData) => void;
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
            <button onClick={() => props.handleDeleteDog(dog.id)}>delete</button>
            <Link className='link' to={`/dog/${dog.id}`}>
              <DogCard dog={dog}/>
            </Link>
          </div>
        )}
      </section>
      
      <h2>FUTURE DOGS</h2>

      <section id='dogs-main'>
        {profile.futureDogs?.map((dog: Dog) => 
          <div className='card' key={dog.id}>
            <button onClick={() => props.handleRemoveDog(dog.id, profile.id)}>remove</button>
            <Link className='link' to={`/dog/${dog.id}`}>
              <DogCard dog={dog}/>
            </Link>
          </div>
        )}
      </section>

    </main>
  )

}

export default MyProfile