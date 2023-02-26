import './DogCard.css'

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
    <>
      <img 
        className='dog-pic' 
        src={dogPic} 
        alt={`${dog.name}'s picture'`} 
      />
      <p>{dog.name}</p>
      <p>{dog.age}</p>
    </>
  )

}

export default DogCard