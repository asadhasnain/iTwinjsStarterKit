import React from 'react';
import { HeaderLogo } from '@itwin/itwinui-react';
import { SvgImodelHollow } from '@itwin/itwinui-icons-react';

export const AppLogo = () => (
  <HeaderLogo logo={<SvgImodelHollow />}>
    iTwinUI-layouts
  </HeaderLogo>
);