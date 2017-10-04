import React from 'react';
import { shallow } from 'enzyme';
import Symbol from './Symbol';

it('renders without crashing', () => {
  shallow(<Symbol />);
});

it('renders with .Symbol__image', () => {
  const symbolSrc = 'path/to/img.svg';
  const wrapper = shallow(<Symbol src={symbolSrc} />);
  expect(wrapper.find('.Symbol__image')).toHaveLength(1);
});

it('renders with correct image source path', () => {
  const symbolSrc = 'path/to/img.svg';
  const wrapper = shallow(<Symbol src={symbolSrc} />);
  const symbolImage = wrapper.find('.Symbol__image');
  expect(symbolImage.prop('src')).toEqual(symbolSrc);
});

it('renders with .Symbol__label', () => {
  const wrapper = shallow(<Symbol label="dummy label" />);
  expect(wrapper.find('.Symbol__label')).toHaveLength(1);
});
