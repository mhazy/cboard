import React from 'react';
import { shallow } from 'enzyme';
import Symbol from '../Symbol';
import { SymbolOutput } from './SymbolOutput';

const cssClasses = {
  SYMBOL_OUTPUT: 'SymbolOutput',
  SCROLL_CONTAINER: 'SymbolOutput__scroll-container',
  SYMBOLS_CONTAINER: 'SymbolOutput__symbols-container',
  SYMBOL: 'SymbolOutput__symbol',
  CLEAR: 'SymbolOutput__clear',
  BACKSPACE: 'SymbolOutput__backspace'
};

it('renders without crashing', () => {
  shallow(<SymbolOutput />);
});

it('renders with two symbols', () => {
  const props = {
    symbols: [
      { label: 'dummy label', image: 'dummy/image.svg' },
      { label: 'dummy label 2', image: 'dummy/image2.svg' }
    ]
  };
  const wrapper = shallow(<SymbolOutput {...props} />);
  expect(wrapper.find(Symbol)).toHaveLength(2);
});

it('deletes symbol on backspace click', () => {
  const props = {
    symbols: [
      { label: 'dummy label', image: 'dummy/image.svg' },
      { label: 'dummy label 2', image: 'dummy/image2.svg' }
    ],
    onChange: jest.fn()
  };
  const expectedArgument = [{ label: 'dummy label', image: 'dummy/image.svg' }];
  const wrapper = shallow(<SymbolOutput {...props} />);
  const backspace = wrapper.find(`.${cssClasses.BACKSPACE}`);
  backspace.simulate('click');
  expect(props.onChange.mock.calls[0][0]).toEqual(expectedArgument);
});

it('clear symbols on clear click', () => {
  const props = {
    symbols: [
      { label: 'dummy label', image: 'dummy/image.svg' },
      { label: 'dummy label 2', image: 'dummy/image2.svg' }
    ],
    onChange: jest.fn()
  };
  const expectedArgument = [];
  const wrapper = shallow(<SymbolOutput {...props} />);
  const clear = wrapper.find(`.${cssClasses.CLEAR}`);
  clear.simulate('click');
  expect(props.onChange.mock.calls[0][0]).toEqual(expectedArgument);
});
