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
    props.handleCreateDog(formData, photoData)
  }

  return(
    <>
      <h2>List A Dog</h2>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className='not-landing'
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
              Age (in years)
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


            {photoData.photo ? <p id='photo-status'>&#10004;</p> : <p id='photo-status'>No Photo</p>}

            <input
              type="file"
              className='custom-upload'
              id="photo-upload"
              name="photo"
              onChange={handleChangePhoto}
            />
            <label className='button' htmlFor="photo-upload">
              Upload Photo
            </label>
          </div>
        </section>
        <div id='submit-buttons'>
          <button className='button'>
            Create!
          </button>

        </div>
      </form>
    </>
  )

}

export default CreateDogForm