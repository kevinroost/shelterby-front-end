import { Link, useLocation } from "react-router-dom"

import defaultPic from "/dog-pit-vipers.jpeg"

import { Profile } from "../../types/models"
import { Dog } from "../../types/models"

interface ViewDogProps {
  profile?: Profile
}

const ViewDog = (props: ViewDogProps): JSX.Element => {
  const { profile } = props
  const location = useLocation()
  const dog = location.state.dog
  const dogPic = dog.photo ? dog.photo : defaultPic
  const idArray = profile?.futureDogs?.map((dog: Dog)=>dog.id)
  console.log(idArray);
  
  console.log('PROFILE',profile)
  return (
    <>
      <img src={dogPic} alt={`${dog.name}'s picture'`}/>
      <h1>Hi! I'm {dog.name}.</h1>
      <p>{dog.about}</p>
      <p>I sure hope I find a home!</p>
      <p>Interested in this pup?</p>
        <Link to={`/profile/${dog.ownerId}`}>
          More about the family
        </Link>
        {profile && 
            !idArray?.includes(dog.id) &&
              <p>Add to Future Pups</p> || <p>Added to List!</p>
          
        }
    </>
  )
}

export default ViewDog