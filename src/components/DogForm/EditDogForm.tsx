import { useState } from "react";
import { Navigate, useNavigate } from "react-router";

import './DogForm.css'

import { Dog } from "../../types/models"

import { EditDogFormData, PhotoFormData } from "../../types/forms";

interface EditDogProps {
  handleEditDog: (formData: EditDogFormData, photoData: PhotoFormData) => void;
  dog: Dog
}

const EditDogForm = (props: EditDogProps): JSX.Element => {
  const navigate = useNavigate()
  const { dog } = props

  const [formData, setFormData] = useState<EditDogFormData>({
    id: dog.id,
    name: dog.name,
    age: dog.age,
    breed: dog.breed,
    about: dog.about,
  })

  const [photoData, setPhotoData] = useState<PhotoFormData>({
    photo: null
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleChangePhoto = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      setPhotoData({ photo: evt.target.files.item(0) })
    }
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    props.handleEditDog(formData, photoData)
  }

  return(
    <>
      <h2>Editing {dog.name}</h2>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <section id='inputs'>
          <div className='input'>
            <input
              type="text"
              value={formData.name}
              name="name"
              onChange={handleChange}
            />
            <label htmlFor="name">Name</label>
          </div>
          <div className='input'>
            <input
              type="text"
              value={formData.age}
              name="age"
              onChange={handleChange}
            />
            <label htmlFor="age">
              Age
            </label>
          </div>
          <div className='input'>
            <input
              type="text"
              value={formData.breed}
              name="breed"
              onChange={handleChange}
            />
            <label htmlFor="breed">
              Breed
            </label>
          </div>
          <div className='input'>
            <textarea
              value={formData.about}
              name="about"
              onChange={handleChange}
            />
            <label htmlFor="about">
              About
            </label>
          </div>
          <div>


            {dog.photo ? <p id='photo-status'>&#10004;</p> : <p id='photo-status'>No Photo</p>}

            <input
              type="file"
              className='custom-upload'
              id="photo-upload"
              name="photo"
              onChange={handleChangePhoto}
            />
            <label className='button' htmlFor="photo-upload">
            {dog.photo ? `Change Photo` : `Upload Photo`}
            </label>
          </div>
        </section>
        <div id='submit-buttons'>
          
          <button>
            Update!
          </button>

          <button>
            Cancel
          </button>

        </div>
      </form>
    </>
  )

}

export default EditDogForm