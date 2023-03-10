import { useLocation } from "react-router-dom"


import { EditDogFormData, PhotoFormData } from "../../types/forms"

import EditDogForm from "../../components/DogForm/EditDogForm"



interface EditDogProps {
  handleEditDog: (formData: EditDogFormData, photoData: PhotoFormData) => void;

}

const EditDog = (props: EditDogProps): JSX.Element => {
  const location = useLocation()
  const dog = location.state.dog

  return (
    <main>
      <EditDogForm handleEditDog={props.handleEditDog} dog={dog}/>
    </main>
  )

}

export default EditDog