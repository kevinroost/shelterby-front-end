import { useState } from 'react'
import { Profile } from '../../types/models';
import { Navigate } from "react-router-dom"
import { EditProfileFormData } from '../../types/forms'

interface EditProfileProps {
  profile?: Profile;
  handleEditProfile: (formData: EditProfileFormData) => void
}

const EditProfile = (props: EditProfileProps): JSX.Element => {
  const {profile} = props
  console.log('EDIT PAGE', profile);
  
  if (!profile) {
    return <Navigate to='/' replace />
  }
  const [formData, setFormData] = useState<EditProfileFormData>({
    id: profile.id,
    name: profile.name,
    lastName: profile.lastName ? profile.lastName : '',
    children: profile.children ? profile.children : 0,
    backyard: profile.backyard ? profile.backyard : 'None',
    email: profile.email,
    phoneNumber: profile.phoneNumber ? profile.phoneNumber : ''
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    props.handleEditProfile(formData)
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
          type="text"
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
          type="text"
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
      </div>
      <div>
        <label htmlFor="email">
          Email Address
        </label>
        <input
          type="text"
          value={formData.email?formData.email:''}
          name="email"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">
          Phone Number
        </label>
        <input
          type="text"
          value={formData.phoneNumber?formData.phoneNumber:''}
          name="phoneNumber"
          onChange={handleChange}
        />
      </div>
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