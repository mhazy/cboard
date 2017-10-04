import React from 'react';
import { shallow } from 'enzyme';
import { Symbol } from './Symbol';

const intl = { formatMessage: () => {} };

it('renders without crashing', () => {
  shallow(<Symbol />);
});
