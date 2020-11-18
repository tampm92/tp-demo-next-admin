import {
  MainIcon,
  CardDivider,
  NumberInfoStyled
} from './style'

const LikeCard = ({ TOTAL_LIKES }) => (
  <>
    <div style={{ display: 'flex' }}>
      <MainIcon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
      <NumberInfoStyled subTitle="Likes" total={TOTAL_LIKES} />
    </div>
    <CardDivider />
  </>
)

export default LikeCard