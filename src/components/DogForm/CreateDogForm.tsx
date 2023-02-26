import { useState } from "react";

import { EditDogFormData } from "../../types/forms"

interface CreateDogProps {
  handleCreateDog: (formData: EditDogFormData) => void;
}

const CreateDogForm = (props: CreateDogProps): JSX.Element => {


  const [formData, setFormData] = useState<EditDogFormData>({
    name: '',
    age: 0,
    breed: '',
    about: '',
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    props.handleCreateDog(formData)
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
          Create!
        </button>

        <button>Cancel</button>

      </div>
    </form>
  )

}

export default CreateDogForm