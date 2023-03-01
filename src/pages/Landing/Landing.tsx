import { useState } from 'react';

// stylesheets
import './Landing.css'

//components
import LoginForm from '../../components/LoginForm/LoginForm';
import SignupForm from '../../components/SignupForm/SignupForm'


// types
import { User } from '../../types/models'

interface LandingProps {
  user: User | null;
  handleAuthEvt: () => void;
}

const Landing = (props: LandingProps): JSX.Element => {
  const [message, setMessage] = useState('')

  const updateMessage = (msg: string): void => setMessage(msg)


  return (
    <main className='container'>
      <h1 id='app-title'>ShelterBy</h1>
      <section id='forms'>
        
        <section className='landing-form' id='landing-form-left'>
          <h3>LOG IN</h3>
          <p>{message}</p>
          <LoginForm {...props} updateMessage={updateMessage} />
        </section>

        <section className='landing-form' id='landing-form'>
          <h3>SIGN UP</h3>
          <p>{message}</p>
          <SignupForm {...props} updateMessage={updateMessage} />
        </section>

      </section>

    </main>
  )
}

export default Landing
