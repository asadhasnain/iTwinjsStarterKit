import { Header } from '@itwin/itwinui-react';
import { Actions } from './Actions';
import { AppLogo } from './AppLogo';
import { Breadcrumbs } from './Breadcrumbs';
import { MenuItems } from './MenuItems';

export type MainHeaderProps = {
  isSlim?: boolean;
};

export const MainHeader = ({ isSlim = false }: MainHeaderProps) => {
  return (
    <Header
      isSlim={isSlim}
      appLogo={<AppLogo />}
      breadcrumbs={<Breadcrumbs />}
      actions={[<Actions />]}
      menuItems={() => [
       <MenuItems />
      ]}
    />
  );
};

export default MainHeader;