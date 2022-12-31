import { useEffect, useRef, useState } from 'react'
import { Menu, Image, Label, MenuItemProps, Input, Icon } from 'semantic-ui-react'
import useOnClickOutside from '../hooks/useClickOutside'
import ThemeSwitcher from '../hooks/ThemeSwitcher'

type NavBarProps = {
  avatarUrl: string
}

export default function NavBar({ avatarUrl }: NavBarProps) {
  const [activeItem, setActiveItem] = useState('inbox')

  const handleItemClick = (e: any, { name }: MenuItemProps) => {
    setActiveItem(name ?? '')
  }

  const { ref: menuRef, isComponentVisible: menuVisible, setIsComponentVisible: setMenuVisible } = useOnClickOutside()

  return (
    <Menu style={{ position: 'fixed', top: 0, width: '100%' }}>
      <Menu.Item>{'Home'}</Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item onClick={() => setMenuVisible(!menuVisible)}>
          {avatarUrl !== '' ? (
            <Image alt="profile image" src={avatarUrl} avatar />
          ) : (
            <Icon className="user" size="large"></Icon>
          )}
        </Menu.Item>
      </Menu.Menu>
      {/* see https://react.semantic-ui.com/layouts/sticky
       source: https://github.com/Semantic-Org/Semantic-UI-React/tree/master/docs/src/layouts
        changes:
         - banner image on top, keep navbar
         - background image

      */}
      {/* TODO  && isAuthenticated */}
      {menuVisible && (
        <Menu vertical ref={menuRef} style={{ position: 'absolute', top: '100%', right: 0 }}>
          <div style={{ alignSelf: 'center' }}>
            <Menu.Item name={'<twitch_user>'}>{'<twitch_user>'}</Menu.Item>
          </div>
          <Menu.Item name="inbox" active={activeItem === 'inbox'} onClick={handleItemClick}>
            <Label color="teal">1</Label>
            Inbox
          </Menu.Item>
          <Menu.Item>
            <ThemeSwitcher></ThemeSwitcher>
          </Menu.Item>
          <Menu.Item name="spam" active={activeItem === 'spam'} onClick={handleItemClick}>
            <Label>51</Label>
            Spam
          </Menu.Item>

          <Menu.Item name="updates" active={activeItem === 'updates'} onClick={handleItemClick}>
            <Label>1</Label>
            Updates
          </Menu.Item>
          <Menu.Item>
            <Input icon="search" placeholder="Search mail..." />
          </Menu.Item>
        </Menu>
      )}
    </Menu>
  )
}
