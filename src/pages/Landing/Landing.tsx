import { useState } from 'react';

// stylesheets
import styles from './Landing.module.css'

//components
import LoginForm from '../../components/LoginForm/LoginForm';
import SignupForm from '../../components/SignupForm/SignupForm'


// types
import { User, Profile } from '../../types/models'

interface LandingProps {
  user: User | null;
  handleAuthEvt: () => void;
}

const Landing = (props: LandingProps): JSX.Element => {
  const [message, setMessage] = useState('')

  const updateMessage = (msg: string): void => setMessage(msg)


  return (
    <main className={styles.container}>
      <h1>ShelterBy</h1>
      <h3>Login</h3>
      <p>{message}</p>
      <LoginForm {...props} updateMessage={updateMessage} />
      <h3>Sign Up</h3>
      <p>{message}</p>
      <SignupForm {...props} updateMessage={updateMessage} />

    </main>
  )
}

export default Landing
