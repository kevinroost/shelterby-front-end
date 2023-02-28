import './DogCard.css'

import { Link } from 'react-router-dom';

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
      <Link className='link' to={`/dog/${dog.id}`} state={{dog}}>
        <h3>{dog.name}</h3>
      </Link>
      <section id='dog-info'>
        <Link className='link' to={`/dog/${dog.id}`} state={{dog}}>
          <img 
            className='dog-pic' 
            src={dogPic} 
            alt={`${dog.name}'s picture'`} 
          />
        </Link>
        <p>A {dog.age} year old <br/> {dog.breed}</p>
      </section>

    </div>
  )

}

export default DogCard