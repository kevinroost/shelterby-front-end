import { Profile } from "../../types/models"


interface FamilyCardProps {
  profile: Profile
}

const FamilyCard = (props: FamilyCardProps): JSX.Element => {
  const { profile } = props

  return (
    <>
      <h4>{profile.lastName}</h4>
    </>
  )


}

export default FamilyCard