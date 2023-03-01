// npm modules
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// services
import * as authService from '../../services/authService'

// stylesheets
import styles from './SignupForm.module.css'

// types
import { AuthFormProps } from '../../types/props'
import { SignupFormData } from '../../types/forms'
import { handleErrMsg } from '../../types/validators'

const SignupForm = (props: AuthFormProps): JSX.Element => {

  const navigate = useNavigate()

  const [message, setMessage] = useState('')

  const updateMessage = (msg: string): void => setMessage(msg)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    passwordConf: '',
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    updateMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    if(isSubmitted) return
    try {
      setIsSubmitted(true)
      await authService.signup(formData)
      props.handleAuthEvt()
      navigate('/profile/edit')
    } catch (err) {
      console.log(err)
      handleErrMsg(err, updateMessage)
      setIsSubmitted(false)
    }
  }

  const { name, email, password, passwordConf } = formData

  const isFormInvalid = (): boolean => {
    return !(name && email && password && password === passwordConf)
  }

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <section id='inputs'>
        <div className='input'>
          <input
            type="text"
            className="name"
            value={name}
            name="name"
            onChange={handleChange}
          />
          <label htmlFor="name">Name</label>
        </div>
        <div className='input'>
          <input
            type="text"
            className="email"
            value={email}
            name="email"
            onChange={handleChange}
          />
          <label htmlFor="email">
            Email
          </label>
        </div>
        <div className='input'>
          <input
            type="password"
            className="password"
            value={password}
            name="password"
            onChange={handleChange}
          />
          <label htmlFor="password">
            Password
          </label>
        </div>
        <div className='input'>
          <input
            type="password"
            className="confirm"
            value={passwordConf}
            name="passwordConf"
            onChange={handleChange}
          />
          <label htmlFor="confirm">
            Confirm Password
          </label>
        </div>
      </section>
      <div id='submit-buttons'>
        
        <button 
          disabled={isFormInvalid() || isSubmitted} 
          className={styles.button}
        >
          {!isSubmitted ? "Sign Up" : "🚀 Sending..."}
        </button>

        <button>Cancel</button>

      </div>
    </form>
  )
}

export default SignupForm
