import { Link, useLocation, useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import * as dogService from '../../services/dogService'

import './ViewDog.css'

import defaultPic from "/dog-pit-vipers.jpeg"

import FamilyCard from "../../components/FamilyCard/FamilyCard"

import { Profile } from "../../types/models"
import { Dog } from "../../types/models"
import { addToFutureDogsFormData } from "../../types/forms"

interface ViewDogProps {

  profile: Profile | null;
  addToFutureDogs: (formData: addToFutureDogsFormData) => void
}

const ViewDog = (props: ViewDogProps): JSX.Element => {
  let { addToFutureDogs, profile } = props
  const { id } = useParams() as {id: string}
  const location = useLocation()
  // const stateDog = location.state.dog
  const [dog, setDog] = useState<Dog>()
  const idArray = profile?.futureDogs?.map((dog: Dog)=>dog.id)
  
  useEffect((): void => {
    const fetchDog = async (): Promise<void> => {
      try {
        const dogData: Dog = await dogService.getDog(parseInt(id))
        
        
        setDog(dogData)
        
        
      } catch (error) {
        console.log(error)
      } 
    }
    fetchDog()
  }, [])

  if (!dog) return <h2>Loading dog...</h2>
  
  const dogPic = dog.photo ? dog.photo : defaultPic

  const handleClick = (): void => {
    if (profile) addToFutureDogs({profileId: profile.id, dogId: dog.id })
  }

  
  return (
    <main id='view-dog'>
      <img src={dogPic} id='view-dog-img' alt={`${dog.name}'s picture`}/>
      <h1>Hi! I'm {dog.name}.</h1>
      <p>A {dog.age} year old {dog.breed}, {dog.about}</p>
      <p>I sure hope I find a home!</p>

      <section id='options'>
        <p>Interested in this pup?</p>
        <div>
          <Link className='link button' to={`/profiles/${dog.ownerId}`}>
            More about {dog.name}'s family
          </Link>

          {profile ? 
            (idArray?.includes(dog.id)?<p>Added to List!</p>:<p className='button' onClick={handleClick}>Add to Future Pups</p>)
            :
            <p>Log in for more!</p>
          }
        </div>

      </section>

      {
        (profile && (profile.id === dog.ownerId))
      &&
        <Link className='link button' state={{dog}} to={`/dog/edit`}>
          Edit {dog.name}
        </Link>
      }

      {
        (profile && (profile.id === dog.ownerId) && dog.futureFamilies)
      &&
        <>
          <h3>These families are interested in {dog.name}. <br/> Click to see their profile!</h3>
          
          <section id='fam-card-section'>
            {dog.futureFamilies.map((family: Profile) => 
              <Link className='link' key={family.id} to={`/profiles/${family.id}`} state={{ family }} >
                <FamilyCard profile={family} />
              </Link>
            )}
          </section>
        </>
      }
    </main>
  )
}

export default ViewDog