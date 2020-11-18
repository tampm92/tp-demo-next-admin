import { Icon, Layout, Dropdown, Menu } from 'antd'
const { Header } = Layout
import styled from 'styled-components'

const TriggerBlock = styled.div`
  display: inline-block;
  height: 100%;
`

const HeaderBlock = styled(TriggerBlock)`
  padding: 0 12px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
`

const MyMenu = () => {
  return (
    <Menu>
      <Menu.Item key="profile">
        <Icon type="user" />
        Profile
      </Menu.Item>
      <Menu.Divider style={{ marginTop: -5, marginBottom: 0 }} />
      <Menu.Item key="logout">
        <Icon type="logout" />
        Logout
      </Menu.Item>
    </Menu>
  )
}

const HeaderLayout = ({ collapsed, handleToggle }) => {
  return (
    <Header
      style={{
        background: '#fff',
        padding: 0,
        boxShadow: '0 1px 4px rgba(0,21,41,.08)',
        display: 'flex'
      }}
    >

      <TriggerBlock>
        <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={handleToggle}
          style={{
            fontSize: 20,
            verticalAlign: 'middle'
          }}
        />
      </TriggerBlock>

      {(
        <div
          style={{
            marginLeft: 'auto'
          }}
        >
          <Dropdown overlay={<MyMenu />} placement="bottomRight">
            <HeaderBlock>
              <Icon
                type="user"
                style={{ fontSize: 16, marginRight: 8 }}
                title="User"
              />
              <span>Admin</span>
            </HeaderBlock>
          </Dropdown>
        </div>
      )}
    </Header>
  )
}

export default HeaderLayout