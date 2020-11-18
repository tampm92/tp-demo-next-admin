import { useState, useEffect } from 'react'
import { Row, Comment } from 'antd'
import { ColStyled, CardStyled, StyledTable } from './style'
import Error from 'next/error'
import moment from 'moment'

const UserList = () => {
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let users = [
          {
            "userId": "google-oauth2|108833079302932965283",
            "email": "aaazureee@gmail.com",
            "givenName": "Hieu",
            "familyName": "Chu",
            "name": "Hieu Chu",
            "nickname": "aaazureee",
            "gender": null,
            "picture": "https://lh3.googleusercontent.com/a-/AAuE7mATTn3Wuy07beWJtOMX7N1XPHNyJxxlC7c_esKjXA",
            "role": null,
            "provider": "google-oauth2",
            "joinDate": "2019-10-03T20:19:14.390Z",
            "totalVisits": "1",
            "totalLikes": "10",
            "totalComments": "5"
          },
          {
            "userId": "google-oauth2|100113980168533672183",
            "email": "azureclone1@gmail.com",
            "givenName": "Azure",
            "familyName": "Chu",
            "name": "Azure Chu",
            "nickname": "azureclone1",
            "gender": null,
            "picture": "https://lh5.googleusercontent.com/-f4MNRypIDoU/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfbpn_5iSoUpgxSMpI6j1OsBadA4g/photo.jpg",
            "role": null,
            "provider": "google-oauth2",
            "joinDate": "2019-10-03T20:29:54.233Z",
            "totalVisits": "0",
            "totalLikes": "8",
            "totalComments": "2"
          },
          {
            "userId": "auth0|5d965d6bd8f7270dead2e2cb",
            "email": "azureclone1@gmail.com",
            "givenName": null,
            "familyName": null,
            "name": "azureclone1@gmail.com",
            "nickname": "ynwxx",
            "gender": null,
            "picture": "https://s.gravatar.com/avatar/a5e7052a7fb068f4e98a5f87972931dd?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Faz.png",
            "role": null,
            "provider": "auth0",
            "joinDate": "2019-10-03T20:43:25.195Z",
            "totalVisits": "0",
            "totalLikes": "10",
            "totalComments": "2"
          }
        ]
        users = users
          .filter(x => !x.role)
          .map(x => ({
            ...x,
            key: x.userId,
            totalLikes: +x.totalLikes,
            totalComments: +x.totalComments,
            totalVisits: +x.totalVisits
          }))

        users.sort(
          (a, b) =>
            new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
        )
        console.log(users)

        setUserList(users)
      } catch (e) {
        const { statusCode, message } = e.response.data
        setError({
          statusCode,
          message
        })
      }
    }
    fetchUsers()
  }, [])

  const [userList, setUserList] = useState([])
  const [error, setError] = useState(null)

  const columns = [
    {
      title: 'User',
      key: 'user',
      render: (_, record) => {
        const { email, name, nickname, picture, userId } = record
        let author = name
        if (userId.includes('auth0')) author = nickname

        return (
          <Comment
            author={
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'rgba(0, 0, 0, 0.65)'
                }}
              >
                {author}
              </span>
            }
            avatar={
              <img
                src={picture}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
            }
            content={
              <div
                style={{
                  fontSize: 14
                }}
              >
                {email}
              </div>
            }
          />
        )
      },
      width: '30%'
    },
    {
      title: 'Connection type',
      key: 'connection',
      render: (_, record) => {
        let connection = ''
        if (record.userId.includes('google')) {
          connection = 'Google'
        } else if (record.userId.includes('facebook')) {
          connection = 'Facebook'
        } else {
          connection = 'Email'
        }
        return <span>{connection}</span>
      },
      filters: [
        {
          text: 'Email',
          value: 'auth0'
        },
        {
          text: 'Google',
          value: 'google'
        },
        {
          text: 'Facebook',
          value: 'facebook'
        }
      ],
      onFilter: (value, record) => record.userId.includes(value),
      width: '15%'
    },
    {
      title: 'Join date',
      key: 'joinDate',
      render: (_, record) => {
        return <span>{moment(record.joinDate).format('D MMMM YYYY')}</span>
      },
      sorter: (a, b) =>
        new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime(),
      sortDirections: ['ascend', 'descend'],
      width: '15%'
    },
    {
      title: 'Likes',
      dataIndex: 'totalLikes',
      sorter: (a, b) => a.totalLikes - b.totalLikes,
      sortDirections: ['descend', 'ascend'],
      width: '13.33%'
    },
    {
      title: 'Comments',
      dataIndex: 'totalComments',
      sorter: (a, b) => a.totalComments - b.totalComments,
      sortDirections: ['descend', 'ascend'],
      width: '13.33%'
    },
    {
      title: 'Visits',
      dataIndex: 'totalVisits',
      sorter: (a, b) => a.totalVisits - b.totalVisits,
      sortDirections: ['descend', 'ascend'],
      width: '13.33%'
    }
  ]

  if (error)
    return <Error statusCode={error.statusCode} title={error.message} />

  return (
    <Row gutter={16}>
      <ColStyled xs={24}>
        <CardStyled title="User Management">
          <StyledTable
            dataSource={userList}
            columns={columns}
            pagination={{ pageSize: 25, hideOnSinglePage: true }}
            className="user-table"
          />
        </CardStyled>
      </ColStyled>
    </Row>
  )
}

export default UserList
