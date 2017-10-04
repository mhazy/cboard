import React from 'react';
import { shallow } from 'enzyme';
import SymbolOutput from './SymbolOutput';

it('renders without crashing', () => {
  shallow(<SymbolOutput />);
});
