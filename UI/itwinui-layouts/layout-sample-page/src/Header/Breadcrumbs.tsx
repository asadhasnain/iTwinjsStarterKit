import React from 'react';
import { HeaderBreadcrumbs, HeaderButton, MenuItem, MenuDivider } from '@itwin/itwinui-react';
import { SvgCheckmark, SvgProject, SvgModel } from '@itwin/itwinui-icons-react';

export const Breadcrumbs = () => (
  <HeaderBreadcrumbs
    items={[
      <HeaderButton
        key='projectBreadcrumb'
        name='Project Alpha'
        description='Alpha'
        startIcon={
          <img
            src='https://itwinplatformcdn.azureedge.net/iTwinUI/stadium.png'
            alt='Project thumbnail'
            draggable='false'
          />
        }
        onClick={() => {}}
        menuItems={() => [
          <MenuItem
            key='projectA'
            sublabel='Alpha'
            startIcon={
              <img
                src='https://itwinplatformcdn.azureedge.net/iTwinUI/stadium.png'
                alt='Project thumbnail'
                draggable='false'
                style={{ margin: 2}}
              />
            }
            endIcon={<SvgCheckmark />}
            isSelected
          >
            Project Alpha
          </MenuItem>,
          <MenuItem key='projectB' sublabel='Beta' startIcon={<SvgProject />}>
            Project Beta
          </MenuItem>,
          <MenuItem key='projectC' sublabel='Charlie' startIcon={<SvgProject />}>
            Project Charlie
          </MenuItem>,
          <MenuDivider key='divider' />,
          <MenuItem key='myProjects'>My projects</MenuItem>,
        ]}
      />,
      <HeaderButton
        key='iModelBreadcrumb'
        name='iModel Alpha'
        description='Alpha'
        startIcon={<SvgModel />}
        onClick={() => {}}
        isActive
        menuItems={() => [
          <MenuItem key='iModelA' sublabel='Alpha' startIcon={<SvgModel />} endIcon={<SvgCheckmark />} isSelected>
            iModel Alpha
          </MenuItem>,
          <MenuItem key='iModelB' sublabel='Beta' startIcon={<SvgModel />} >
            iModel Beta
          </MenuItem>,
          <MenuItem key='iModelC' sublabel='Charlie' startIcon={<SvgModel />}>
            iModel Charlie
          </MenuItem>,
          <MenuDivider key='divider' />,
          <MenuItem key='myiModels'>My iModels</MenuItem>,
        ]}
      />,
    ]}
  />
);