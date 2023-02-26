import { Link, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

import defaultPic from "/dog-pit-vipers.jpeg"

import FamilyCard from "../../components/FamilyCard/FamilyCard"

import { Profile } from "../../types/models"
import { Dog } from "../../types/models"
import { addToFutureDogsFormData } from "../../types/forms"

interface ViewDogProps {

  profile?: Profile;
  addToFutureDogs: (formData: addToFutureDogsFormData) => void
}

const ViewDog = (props: ViewDogProps): JSX.Element => {
  let { addToFutureDogs, profile } = props
  
  const location = useLocation()
  const dog = location.state.dog
  // const profile = location.state.profile
  const dogPic = dog.photo ? dog.photo : defaultPic
  const idArray = profile?.futureDogs?.map((dog: Dog)=>dog.id)

  

  const handleClick = (): void => {
    if (profile) addToFutureDogs({profileId: profile.id, dogId: dog.id })
  }

  return (
    <>
      <img src={dogPic} alt={`${dog.name}'s picture'`}/>
      <h1>Hi! I'm {dog.name}.</h1>
      <p>{dog.about}</p>
      <p>I sure hope I find a home!</p>
      <p>Interested in this pup?</p>
        <Link to={`/profiles/${dog.ownerId}`}>
          More about the family
        </Link>
        {profile && 
            !idArray?.includes(dog.id) &&
              <p onClick={handleClick}>Add to Future Pups</p> || <p>Added to List!</p>
        }

        {
          (profile && (profile.id === dog.ownerId))
        &&
          <Link state={{dog}} to={`/dog/edit`}>
            Edit {dog.name}
          </Link>
        }

        {
          (profile && (profile.id === dog.ownerId) && dog.futureFamilies)
        &&
          <section>
            {dog.futureFamilies.map((family: Profile) => 
              <Link id={family.id.toString()} to={`/profile/${family.id}`} state={{ family }} >
                <FamilyCard profile={family} />
              </Link>
            )}
          </section>
        }
    </>
  )
}

export default ViewDog