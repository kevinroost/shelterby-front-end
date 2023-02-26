import { useState, useEffect } from "react";
import { login } from "../../services/authService";
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
    <>
      <h1>We Need Homes!</h1>
      {dogs.map((dog: Dog) => 
        <div>
          <Link id={dog.id.toString()} to={`/dog/${dog.id}`} >
            <DogCard dog={dog} />
          </Link>

        </div>
      )}
    </>
  )



}

export default Dogs