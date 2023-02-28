import { Profile } from "../../types/models";

interface FamilyInfoProps {
  profile: Profile
}

const FamilyInfo = (props: FamilyInfoProps): JSX.Element => {
  const {profile} = props
  
  return (
    <>
      {profile.lastName
      ?
        <h1 id='title'>Hi! We're the {profile.lastName}s</h1>
      :
        <h1 id='title'>Hi! I'm {profile.name}</h1>
      }
      
      
      
      <p>{profile.about}</p>
      {
        (profile.children !== (0 || null))
      ?
        (
          (profile.children === 1)
        ?
          <p>We have {profile.children} kid.</p>
        :
          <p>We have {profile.children} kids.</p>
        
        )
      
      :
        <p>We don't have any kids.</p>
      }
      {
        (profile.backyard === 'none')
      ?
        <p>We don't have a backyard.</p>
      :
        <p>Our backyard is {profile.backyard}.</p>
      }


    </>
  )


}

export default FamilyInfo