import { useState } from "react";

import './DogForm.css'

import { EditDogFormData, PhotoFormData } from "../../types/forms"

interface CreateDogProps {
  handleCreateDog: (formData: EditDogFormData, photoData: PhotoFormData) => void;
}

const CreateDogForm = (props: CreateDogProps): JSX.Element => {

  const [formData, setFormData] = useState<EditDogFormData>({
    name: '',
    age: 0,
    breed: '',
    about: '',
  })

  const [photoData, setPhotoData] = useState<PhotoFormData>({
    photo: null
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleChangePhoto = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      setPhotoData({ photo: evt.target.files.item(0) })
    }
  }
  

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    props.handleCreateDog(formData, photoData)
  }

  return(
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          value={formData.name}
          name="name"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="age">
          Age
        </label>
        <input
          type="text"
          value={formData.age}
          name="age"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="breed">
          Breed
        </label>
        <input
          type="text"
          value={formData.breed}
          name="breed"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="about">
          About
        </label>
        <input
          type="text"
          value={formData.about}
          name="about"
          onChange={handleChange}
        />
      </div>
      <div>

        <label className='button' htmlFor="photo-upload">
          Upload Photo
        </label>

        {photoData.photo ? <p>&#10004;</p> : <p>Upload a Photo</p>}

        <input
          type="file"
          className='custom-upload'
          id="photo-upload"
          name="photo"
          onChange={handleChangePhoto}
        />
      </div>
      <div>
        <button className='button'>
          Create!
        </button>

      </div>
    </form>
  )

}

export default CreateDogForm