import { User } from "../../types/models"
import { Link, Navigate } from "react-router-dom"


interface MyProfileProps {
  user: User | null
}

const MyProfile = (props: MyProfileProps): JSX.Element => {


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
          LISTED DOGS LINK TO EDIT DOG
          <br/>
          FUTURE DOGS LINK TO DOG DEETS
        </h1>

        <Link to='/profile/edit'>
          Edit The {props.user.profile.lastName}s
        </Link>
    </>
  )

}

export default MyProfile