import './DogCard.css'

import defaultPic from "/dog-pit-vipers.jpeg"



//types
import { Dog } from "../../types/models";

interface DogCardProps {
  dog: Dog;

}

const DogCard = (props: DogCardProps): JSX.Element => {
  const { dog } = props

  const dogPic = dog.photo ? dog.photo : defaultPic




  return (
    <div id='dog-card'>
      <h3>{dog.name}</h3>
      <section id='dog-info'>
        <img 
          className='dog-pic' 
          src={dogPic} 
          alt={`${dog.name}'s picture'`} 
        />
        <p>A {dog.age} year old <br/> {dog.breed}</p>
      </section>

    </div>
  )

}

export default DogCard