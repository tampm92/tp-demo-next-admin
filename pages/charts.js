import { Row } from 'antd'
import { ColStyled, CardStyled, StyledTable } from '@/components/partials/users/style'
import React, { useRef, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
const Line = dynamic(
  () => import("@ant-design/charts").then((mod) => mod.Line),
  { ssr: false }
)

const Column = dynamic(
  () => import("@ant-design/charts").then((mod) => mod.Column),
  { ssr: false }
)

const ChartsPage = () => {
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
  };

  const [dataColumn, setDataColumn] = useState([]);
  useEffect(() => {
      asyncColumnFetch();
  }, []);
  const asyncColumnFetch = () => {
      fetch('https://gw.alipayobjects.com/os/bmw-prod/be63e0a2-d2be-4c45-97fd-c00f752a66d4.json').then(response => response.json()).then(json => setDataColumn(json)).catch(error => {
          console.log('fetch data failed', error);
      });
  };
  var config = {
      data: dataColumn,
      xField: '城市',
      yField: '销售额',
      xAxis: { label: { autoRotate: false } },
      scrollbar: { type: 'horizontal' }
  };

  return (
    <Row gutter={16}>
      <ColStyled xs={24}>
        <CardStyled title="Line">
          <Line {...configLine} />
        </CardStyled>
      </ColStyled>
      <ColStyled xs={24}>
        <CardStyled title="Column">
          <Column {...config} />
        </CardStyled>
      </ColStyled>
    </Row>
  )
}

export default ChartsPage