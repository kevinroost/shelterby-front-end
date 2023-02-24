import { User } from "../../types/models"
import { Navigate } from "react-router-dom"


interface EditProfileProps {
  user: User | null
}

const EditProfile = (props: EditProfileProps): JSX.Element => {


  if (!props.user) {
    return <Navigate to='/' replace />
  }

  return (
    <>
        <h1>
          UPDATE FORM GOES HERE
          <br/>
          {props.user.profile.lastName}
        </h1>
    </>
  )

}

export default EditProfile