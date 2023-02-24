import { useState, useEffect } from "react";
import { login } from "../../services/authService";

import * as dogService from '../../services/dogService'

//types
import { Dog } from '../../types/models'

interface DogsProps {
  dogs: Dog[]
}


const Dogs = ({dogs}: DogsProps): JSX.Element => {
  // const [dogs, setDogs] = useState<Dog[]>([])

  // useEffect((): void => {
  //   const fetchDogs = async (): Promise<void> => {
  //     try {
  //       const dogData: Dog[] = await dogService.getAllDogs()
  //       setDogs(dogData)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //     fetchDogs()
  //   }
  // }, [])
  // console.log(dogService)
  // console.log(dogs)
  if(!dogs.length) return <h3>NO DOGS</h3>

  return (
    <>
      <h1>We Need Homes!</h1>
      {dogs.map((dog: Dog) => 
        <p key={dog.id}>
          {dog.name}
        </p>
      )}
    </>
  )



}

export default Dogs