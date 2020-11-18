import {
  MainIcon,
  CardDivider,
  NumberInfoStyled
} from './style'

const UserCard = ({ TOTAL_USERS }) => {
  return (
    <>
      <div style={{ display: 'flex' }}>
        <MainIcon type="team" style={{ color: 'rgb(24, 144, 255)' }} />
        <NumberInfoStyled subTitle="Total users" total={TOTAL_USERS} />
      </div>
      <CardDivider />
    </>
  )
}

export default UserCard
