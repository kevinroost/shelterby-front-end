// npm modules
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// services
import styles from './LoginForm.module.css'

// stylesheets
import * as authService from '../../services/authService'

// types
import { AuthFormProps } from '../../types/props'
import { LoginFormData } from '../../types/forms'
import { handleErrMsg } from '../../types/validators'

const LoginForm = (props: AuthFormProps): JSX.Element => {

  const navigate = useNavigate()

  const [message, setMessage] = useState('')

  const updateMessage = (msg: string): void => setMessage(msg)
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    updateMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    try {
      await authService.login(formData)
      props.handleAuthEvt()
      navigate('/dogs')
    } catch (err) {
      console.log(err)
      handleErrMsg(err, updateMessage)
      navigate('/')
    }
  }



  const { email, password } = formData

  const isFormInvalid = (): boolean => {
    return !(email && password)
  }

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className={styles.container}
    >
      <p>{message}</p>
      <section id='inputs'>
        <div  className='input'>
          <input
            type="text"
            className="email"
            value={formData.email}
            name="email"
            onChange={handleChange}
          />
          <label htmlFor="email" className={styles.label}>Email</label>
        </div>
        <div  className='input'>
          <input
            type="password"
            className="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
          />
          <label htmlFor="password" className={styles.label}>Password</label>
        </div>
      </section>
      <div id='submit-buttons'>
        <button disabled={isFormInvalid()} className={styles.button}>
          Log In
        </button>
        <button>
          Cancel
        </button>

      </div>
    </form>
  )
}

export default LoginForm
