import './Dogs.css'
import { Link } from "react-router-dom";

import * as dogService from '../../services/dogService'

import DogCard from "../../components/DogCard/DogCard";

//types
import { Dog } from '../../types/models'

interface DogsProps {
  dogs: Dog[];
}


const Dogs = (props: DogsProps): JSX.Element => {

  const { dogs } = props

  if(!dogs.length) return <h3>NO DOGS</h3>


  return (
    <main>
      <h1>We Need Homes!</h1>
      <section id='dogs-main'>

      {dogs.map((dog: Dog) => 
          <Link className='card' key={dog.id} to={`/dog/${dog.id}`} state={{dog}}>
            <DogCard  dog={dog} />
          </Link>
      )}
      </section>
    </main>
  )



}

export default Dogs