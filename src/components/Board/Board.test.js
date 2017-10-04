import React from 'react';
import { shallowWithIntl } from 'enzyme-react-intl';
import Board from './Board';

it('renders without crashing', () => {
  shallowWithIntl(<Board />);
});
