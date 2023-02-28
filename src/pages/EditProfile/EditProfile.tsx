import { useState } from 'react'
import { Profile } from '../../types/models';
import { Navigate } from "react-router-dom"
import { EditProfileFormData } from '../../types/forms'

interface EditProfileProps {
  profile: Profile | null;
  handleEditProfile: (formData: EditProfileFormData) => void
}

const EditProfile = (props: EditProfileProps): JSX.Element => {
  const {profile} = props

  if (!profile) {
    return <Navigate to='/' replace />
  }
  const [formData, setFormData] = useState<EditProfileFormData>({
    id: profile.id,
    name: profile.name,
    lastName: profile.lastName ? profile.lastName : '',
    children: profile.children ? profile.children : 0,
    backyard: profile.backyard ? profile.backyard : 'none',
    email: profile.email,
    about: profile.about ? profile.about : '',
    phoneNumber: profile.phoneNumber ? profile.phoneNumber : ''
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    props.handleEditProfile(formData)
  }
  console.log(formData);
  

  return (
    <>
      <h2>Edit your info</h2>
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
              value={formData.lastName}
              name="lastName"
              onChange={handleChange}
            />
            <label htmlFor="lastName">
              Family Name
            </label>
          </div>
          <div className='input'>
            <input
              type="text"
              value={formData.children}
              name="children"
              onChange={handleChange}
            />
            <label htmlFor="children">
              Children
            </label>
          </div>
          <div className='input'>
            <select
                name="backyard"
                value={formData.backyard}
                onChange={handleChange}
              >
                <option value="none">none</option>
                <option value="open">open</option>
                <option value="fenced">fenced</option>
              </select>
            <label htmlFor="backyard">
              Backyard
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
          <div className='input'>
            <input
              type="text"
              value={formData.email?formData.email:''}
              name="email"
              onChange={handleChange}
            />
            <label htmlFor="email">
              Email Address
            </label>
          </div>
          <div className='input'>
            <input
              type="text"
              value={formData.phoneNumber?formData.phoneNumber:''}
              name="phoneNumber"
              onChange={handleChange}
            />
            <label htmlFor="phoneNumber">
              Phone Number
            </label>
          </div>
          <div id='submit-buttons'>
          
            <button>
              Update!
            </button>

            <button>
              Cancel
            </button>

        </div>
        </section>
      </form>
    </>
  )

}

export default EditProfile