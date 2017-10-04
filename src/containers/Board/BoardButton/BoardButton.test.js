import React from 'react';
import { shallow } from 'enzyme';
import { BoardButton } from './BoardButton';

it('renders without crashing', () => {
  shallow(<BoardButton />);
});
