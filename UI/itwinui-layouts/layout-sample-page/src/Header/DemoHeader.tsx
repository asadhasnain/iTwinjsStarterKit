/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { Header, MenuItem } from '@itwin/itwinui-react';
import { SvgSettings, SvgSmileyHappy, SvgNews, SvgInfoCircular } from '@itwin/itwinui-icons-react';
import { AppLogo } from './AppLogo';
import { Breadcrumbs } from './Breadcrumbs';
import { Actions } from './Actions';
import { MenuItems } from './MenuItems';

export type DemoHeaderProps = {
  isSlim?: boolean;
};

export const DemoHeader = ({ isSlim = false }: DemoHeaderProps) => {
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

export default DemoHeader;