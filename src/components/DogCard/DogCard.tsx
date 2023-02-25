import './DogCard.css'

import { Link } from "react-router-dom";

import defaultPic from "/dog-pit-vipers.jpeg"



//types
import { Dog } from "../../types/models";

interface DogCardProps {
  dog: Dog
}

const DogCard = (props: DogCardProps): JSX.Element => {
  const { dog } = props

  const dogPic = dog.photo ? dog.photo : defaultPic

  return (
    <Link to={`/dog/${dog.id}`} state={{ dog }} >
      <img 
        className='dog-pic' 
        src={dogPic} 
        alt={`${dog.name}'s picture'`} 
      />
      <p>{dog.name}</p>
      <p>{dog.age}</p>
    </Link>
  )

}

export default DogCard