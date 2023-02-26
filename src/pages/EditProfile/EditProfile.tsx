import { useState } from 'react'
import { User } from "../../types/models"
import { Navigate, Link, useLocation } from "react-router-dom"
import { EditProfileFormData } from '../../types/forms'

interface EditProfileProps {
  user: User | null;
  handleEditProfile: (formData: EditProfileFormData) => void
}

const EditProfile = (props: EditProfileProps): JSX.Element => {
  const location = useLocation()
  const profile = location.state.profile
  const [formData, setFormData] = useState<EditProfileFormData>({
    id: profile.id,
    name: profile.name,
    lastName: profile.lastName,
    children: profile.children,
    backyard: profile.backyard,
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    props.handleEditProfile(formData)
  }
  
  if (!props.user) {
    return <Navigate to='/' replace />
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
        <label htmlFor="lastName">
          Family Name
        </label>
        <input
          // type="text"
          value={formData.lastName}
          name="lastName"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="children">
          Children
        </label>
        <input
          // type="text"
          value={formData.children}
          name="children"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="backyard">
          Backyard
        </label>
        <select
            name="backyard"
            value={formData.backyard}
            onChange={handleChange}
          >
            <option value="None">None</option>
            <option value="Open">Open</option>
            <option value="Fenced">Fenced</option>
          </select>



        {/* <input
          // type="text"
          value={formData.backyard}
          name="backyard"
          onChange={handleChange}
        /> */}
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

export default EditProfile