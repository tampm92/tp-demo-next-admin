import {
  MainIcon,
  CardDivider,
  NumberInfoStyled
} from './style'

const VisitCard = ({ TOTAL_VISITS }) => {
  return (
    <>
      <div style={{ display: 'flex'}}>
        <MainIcon type="environment" style={{ color: '#F73F3F' }} />
        <NumberInfoStyled subTitle="Total visits" total={TOTAL_VISITS} />
      </div>
      <CardDivider />
    </>
  )
}

export default VisitCard
