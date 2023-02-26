import { useState } from "react"
import { User } from "../../types/models"
import { Link, useLocation } from "react-router-dom"

import { Dog } from "../../types/models"

import { EditDogFormData } from "../../types/forms"



interface EditDogProps {
  handleEditDog: (formData: EditDogFormData) => void
}

const EditDog = (props: EditDogProps): JSX.Element => {
  const location = useLocation()
  const dog = location.state.dog

  const [formData, setFormData] = useState<EditDogFormData>({
    id: dog.id,
    name: dog.name,
    age: dog.age,
    breed: dog.breed,
    about: dog.about,
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    props.handleEditDog(formData)
  }

  return (
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
      {/* <div className={styles.inputContainer}>
        <label htmlFor="photo-upload" className={styles.label}>
          Upload Photo
        </label>
        <input
          type="file"
          id="photo-upload"
          name="photo"
          onChange={handleChangePhoto}
        />
      </div> */}
      <div>
        <button>
          Update!
        </button>

        <button>Cancel</button>

      </div>
    </form>
  )

}

export default EditDog