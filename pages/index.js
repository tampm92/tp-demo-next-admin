import { useState } from 'react'
import { Row, Dropdown, Icon, Menu, DatePicker } from 'antd'
import moment from 'moment'
import {
  ColStyled,
  UserCard,
  VisitCard,
  LikeCard,
  CommentCard
} from '@/components/partials/dashboard'
import {
  CardStyled,
  ShadowCard
} from '@/components/partials/dashboard/style'

const { RangePicker } = DatePicker

export default function Home() {
  const [state, setState] = useState({
    TOTAL_USERS: 800,
    TOTAL_VISITS: 200,
    TOTAL_LIKES: 150,
    TOTAL_COMMENTS: 500
  })

  const defaultEndDate = moment(new Date())
  const defaultStartDate = moment(defaultEndDate).subtract(7, 'days')

  const [startDate, setStartDate] = useState(defaultStartDate)
  const [endDate, setEndDate] = useState(defaultEndDate)

  const dateFormat = 'MMM D YYYY'
  const staticToday = moment(new Date())

  const generateMenu = (startDate, endDate) => {
    const disabledDate = current => {
      return current.valueOf() > staticToday.valueOf()
    }

    return (
      <Menu className="date-menu">
        <RangePicker
          defaultValue={[startDate, endDate]}
          value={[startDate, endDate]}
          format={dateFormat}
          size="large"
          allowClear={false}
          separator="-"
          disabledDate={disabledDate}
          ranges={{
            'Past week': [
              moment(staticToday).subtract(7, 'days'),
              moment(staticToday)
            ],
            'Past 2 weeks': [
              moment(staticToday).subtract(14, 'days'),
              moment(staticToday)
            ],
            'Past month': [
              moment(staticToday).subtract(30, 'days'),
              moment(staticToday)
            ]
          }}
          onChange={date => {
            console.log(date)
            if (date[0].valueOf() !== date[1].valueOf()) {
              console.log('not the same')
              setStartDate(date[0])
              setEndDate(date[1])
            } else {
              console.log('the same')
            }
          }}
        />
      </Menu>
    )
  }

  return (
    <>
      <Row gutter={16}>
        <ColStyled xs={24}>
          <CardStyled
            title="Overview"
            extra={
              <Dropdown
                overlay={generateMenu(startDate, endDate)}
                trigger={['click']}
                placement="bottomRight"
              >
                <Icon type="more" />
              </Dropdown>
            }
            type="stats"
          >
            <ColStyled xs={24} lg={12}>
              <ShadowCard>
                <UserCard
                  TOTAL_USERS={state.TOTAL_USERS}
                />
              </ShadowCard>
            </ColStyled>

            <ColStyled xs={24} lg={12}>
              <ShadowCard>
                <VisitCard
                  TOTAL_VISITS={state.TOTAL_VISITS}
                />
              </ShadowCard>
            </ColStyled>

            <ColStyled xs={24} lg={12}>
              <ShadowCard>
                <LikeCard
                  TOTAL_LIKES={state.TOTAL_LIKES}
                />
              </ShadowCard>
            </ColStyled>

            <ColStyled xs={24} lg={12}>
              <ShadowCard>
                <CommentCard
                  TOTAL_COMMENTS={state.TOTAL_COMMENTS}
                />
              </ShadowCard>
            </ColStyled>

          </CardStyled>
        </ColStyled>
      </Row>
    </>
  )
}
