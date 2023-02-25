import { Profile } from "../../types/models";

interface FamilyInfoProps {
  profile: Profile
}

const FamilyInfo = (props: FamilyInfoProps): JSX.Element => {
  const {profile} = props
  console.log('component', profile);
  
  return (
    <>
      <h1>{profile.name}</h1>
    </>
  )


}

export default FamilyInfo