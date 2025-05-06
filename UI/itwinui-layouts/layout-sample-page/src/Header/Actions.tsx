import React from 'react';
import { IconButton, DropdownMenu, MenuItem, MenuExtraContent, MenuDivider, Avatar, Text, Select } from '@itwin/itwinui-react';
import { SvgNotification, SvgHelpCircular, SvgExit } from '@itwin/itwinui-icons-react';

export const Actions = () => (
  <>
    <IconButton key='notifications' styleType='borderless' label="Notifications">
      <SvgNotification />
    </IconButton>
    <DropdownMenu
      key='help'
      menuItems={() => [
        <MenuItem key='getting-started'>Getting started</MenuItem>,
        <MenuItem key='report-a-problem'>Report a problem</MenuItem>,
        <MenuItem key='communities'>Communities</MenuItem>,
      ]}
    >
      <IconButton styleType='borderless' label="Help">
        <SvgHelpCircular />
      </IconButton>
    </DropdownMenu>
    <DropdownMenu
      key='profile'
      role='menu'
      menuItems={() => [
        <MenuExtraContent key={0}>
          <>
            <Text variant='leading'>Terry Rivers</Text>
            <Text isMuted style={{ marginBottom: 8 }}>
              terry.rivers@email.com
            </Text>
            <Select
              options={[
                { value: 'User', label: 'User' },
                { value: 'Moderator', label: 'Moderator' },
                { value: 'Administrator', label: 'Administrator' },
              ]}
              value={'Administrator'}
            />
          </>
        </MenuExtraContent>,
        <MenuDivider key={1} />,
        <MenuItem key='view-profile'>View profile</MenuItem>,
        <MenuItem key='sign-out' endIcon={<SvgExit />}>
          Sign out
        </MenuItem>,
      ]}
    >
      <IconButton styleType='borderless' label="Profile">
        <Avatar
          size='medium'
          image={
            <img
              src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png'
              alt='Terry Rivers'
            />
          }
        />
      </IconButton>
    </DropdownMenu>
  </>
);