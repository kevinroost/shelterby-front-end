import { Profile } from "../../types/models"


interface FamilyCardProps {
  profile: Profile
}

const FamilyCard = (props: FamilyCardProps): JSX.Element => {
  const { profile } = props

  return (
    <>
      <p className='fam-card'>The {profile.lastName} <br/> Family</p>
    </>
  )


}

export default FamilyCard