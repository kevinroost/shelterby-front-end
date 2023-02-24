import { User } from "../../types/models"
import { Navigate } from "react-router-dom"


interface EditDogProps {
// PASS DOG PROPS
}

const EditDog = (props: EditDogProps): JSX.Element => {


  // if (!props.user) {
  //   return <Navigate to='/' replace />
  // }

  return (
    <>
        <h1>
          UPDATE DOG FORM GOES HERE
        </h1>
    </>
  )

}

export default EditDog