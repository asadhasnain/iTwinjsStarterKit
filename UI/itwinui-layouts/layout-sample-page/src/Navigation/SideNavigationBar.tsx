import {
  SvgConfiguration,
  SvgFolder,
  SvgHome,
  SvgModel,
} from '@itwin/itwinui-icons-react';
import { SidenavButton, SideNavigation } from '@itwin/itwinui-react';

export const SideNavigationBar = ({ activeItemKey = 'Home' }) => {
  return (
    <SideNavigation
      expanderPlacement='bottom'
      items={[
        <SidenavButton
          startIcon={<SvgHome />}
          key='Home'
          isActive={activeItemKey === 'Home'}
        >
          Home
        </SidenavButton>,
        <SidenavButton
          startIcon={<SvgModel />}
          key='Model'
          isActive={activeItemKey === 'Model'}
        >
          Model
        </SidenavButton>,
        <SidenavButton
          startIcon={<SvgFolder />}
          key='Browse'
          isActive={activeItemKey === 'Browse'}
        >
          Browse
        </SidenavButton>,
      ]}
      secondaryItems={[
        <SidenavButton startIcon={<SvgConfiguration />} key='configuration'>
          Configuration
        </SidenavButton>,
      ]}
      wrapperProps={{
        className: 'app-sidenav',
      }}
    />
  );
};
