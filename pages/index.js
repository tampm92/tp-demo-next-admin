import React, { useRef, useEffect, useState } from 'react'
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
import dynamic from 'next/dynamic'
const Line = dynamic(
  () => import("@ant-design/charts").then((mod) => mod.Line),
  { ssr: false }
)
const Rose = dynamic(
  () => import("@ant-design/charts").then((mod) => mod.Rose),
  { ssr: false }
)

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

  const [dataLine, setDataLine] = useState([]);
  useEffect(() => {
    asyncLineFetch();
  }, []);
  const asyncLineFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json')
      .then((response) => response.json())
      .then((json) => setDataLine(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  var configLine = {
    data: dataLine,
    xField: 'year',
    yField: 'value',
    seriesField: 'category',
    yAxis: {
      label: {
        formatter: function formatter(v) {
          return ''.concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
            return ''.concat(s, ',');
          });
        },
      },
    },
    color: ['#1979C9', '#D62A0D', '#FAA219'],
  }

  var dataRose = [
    {
      type: 'Type 1',
      value: 27,
    },
    {
      type: 'Type 2',
      value: 25,
    },
    {
      type: 'Type 3',
      value: 18,
    },
    {
      type: 'Type 4',
      value: 15,
    },
    {
      type: 'Type 5',
      value: 10,
    },
    {
      type: 'Other',
      value: 5,
    },
  ];
  var configRose = {
    data: dataRose,
    xField: 'type',
    yField: 'value',
    seriesField: 'type',
    radius: 0.9,
    legend: { position: 'bottom' },
  };

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
            <ColStyled xs={24} md={12} lg={6}>
              <ShadowCard>
                <UserCard
                  TOTAL_USERS={state.TOTAL_USERS}
                />
              </ShadowCard>
            </ColStyled>

            <ColStyled xs={24} md={12} lg={6}>
              <ShadowCard>
                <VisitCard
                  TOTAL_VISITS={state.TOTAL_VISITS}
                />
              </ShadowCard>
            </ColStyled>

            <ColStyled xs={24} md={12} lg={6}>
              <ShadowCard>
                <LikeCard
                  TOTAL_LIKES={state.TOTAL_LIKES}
                />
              </ShadowCard>
            </ColStyled>

            <ColStyled xs={24} md={12} lg={6}>
              <ShadowCard>
                <CommentCard
                  TOTAL_COMMENTS={state.TOTAL_COMMENTS}
                />
              </ShadowCard>
            </ColStyled>

            <ColStyled xs={24} lg={12}>
              <Line {...configLine} />
            </ColStyled>
            <ColStyled xs={24} lg={12}>
              <Rose {...configRose} />
            </ColStyled>

          </CardStyled>
        </ColStyled>
      </Row>
    </>
  )
}
