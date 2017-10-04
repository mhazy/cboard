import React from 'react';
import { shallow } from 'enzyme';
import InputImage from './InputImage';

const cssClasses = {
  SYMBOL_OUTPUT: 'SymbolOutput',
  SCROLL_CONTAINER: 'SymbolOutput__scroll-container',
  SYMBOLS_CONTAINER: 'SymbolOutput__symbols-container'
};

it('renders without crashing', () => {
  shallow(<InputImage />);
});
