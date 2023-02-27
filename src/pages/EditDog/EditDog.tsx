import { useState } from "react"
import { User } from "../../types/models"
import { Link, useLocation } from "react-router-dom"

import { Dog } from "../../types/models"

import { EditDogFormData, PhotoFormData } from "../../types/forms"

import EditDogForm from "../../components/DogForm/EditDogForm"



interface EditDogProps {
  handleEditDog: (formData: EditDogFormData, photoData: PhotoFormData) => void;

}

const EditDog = (props: EditDogProps): JSX.Element => {
  const location = useLocation()
  const dog = location.state.dog

  return (
    <>
      <EditDogForm handleEditDog={props.handleEditDog} dog={dog}/>
    </>
  )

}

export default EditDog