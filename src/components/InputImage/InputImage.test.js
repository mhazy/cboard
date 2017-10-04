import React from 'react';
import { shallow } from 'enzyme';
import InputImage from './InputImage';

const cssClasses = {
  INPUT_IMAGE: 'InputImage',
  LABEL: 'InputImage__label',
  INPUT: 'InputImage__input',
  IMG: 'InputImage__img'
};

it('renders without crashing', () => {
  const props = {
    onChange: () => {}
  };
  shallow(<InputImage {...props} />);
});

it('renders input', () => {
  const props = {
    onChange: () => {}
  };
  const wrapper = shallow(<InputImage {...props} />);
  const input = wrapper.find(`.${cssClasses.INPUT}`);
  expect(input).toHaveLength(1);
});

it('renders img', () => {
  const props = {
    image: 'path/dummy.svg',
    onChange: () => {}
  };
  const wrapper = shallow(<InputImage {...props} />);
  const img = wrapper.find(`.${cssClasses.IMG}`);
  expect(img.prop('src')).toBe(props.image);
});

it('renders label', () => {
  const props = {
    label: 'dummy label',
    onChange: () => {}
  };
  const wrapper = shallow(<InputImage {...props} />);
  const label = wrapper.find(`.${cssClasses.LABEL}`);
  expect(label).toHaveLength(1);
  expect(label.text()).toEqual(props.label);
});
