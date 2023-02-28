// npm modules
import { useState } from 'react'

// components
import ChangePasswordForm from '../../components/ChangePasswordForm/ChangePasswordForm'

// stylesheets
import styles from './ChangePassword.module.css'

import { User } from '../../types/models'

// types
interface ChangePasswordProps {
  handleAuthEvt: () => void;
  user: User | null;
}

const ChangePassword = (props: ChangePasswordProps): JSX.Element => {
  const [message, setMessage] = useState('')

  const updateMessage = (msg: string): void => setMessage(msg)

  return (
    <main className={styles.container}>
      <h1>Change Password</h1>
      <p>{message}</p>
      <ChangePasswordForm {...props} updateMessage={updateMessage} />
    </main>
  )
}

export default ChangePassword
