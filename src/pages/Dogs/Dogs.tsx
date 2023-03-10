import './Dogs.css'
import { Link } from "react-router-dom";

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
      <h1 id='title'>We Need Homes!</h1>
      <section id='dogs-main'>

      {dogs.map((dog: Dog) => 
        <Link className='link' key={dog.id} to={`/dog/${dog.id}`}>
          <DogCard dog={dog}/>
        </Link>
      )}
      </section>
    </main>
  )



}

export default Dogs