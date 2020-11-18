import {
  MainIcon,
  CardDivider,
  NumberInfoStyled
} from './style'

const CommentCard = ({ TOTAL_COMMENTS }) => {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <MainIcon
          type="message"
          theme="twoTone"
          twoToneColor="rgb(205, 34, 255)"
        />
        <NumberInfoStyled subTitle="Comments" total={TOTAL_COMMENTS} />
      </div>
      <CardDivider />
    </>
  )
}

export default CommentCard