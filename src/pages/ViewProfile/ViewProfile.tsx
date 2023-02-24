import { User } from "../../types/models"
import { Link, Navigate } from "react-router-dom"


interface ViewProfileProps {
  user: User | null
}

const ViewProfile = (props: ViewProfileProps): JSX.Element => {


  if (!props.user) {
    return <Navigate to='/' replace />
  }

  return (
    <>
        <h1>
          Profile info goes here
          <br/>
          {props.user.profile.lastName}
          <br/>
          LISTED DOGS
          <br/>
          FUTURE DOGS
        </h1>

        <Link to='/editFamily'>
          Edit The {props.user.profile.lastName}s
        </Link>
    </>
  )

}

export default ViewProfile