import React from 'react';
import Spinner from 'react-svg-spinner';
import ChartSection from '../';
import Chart from '../Chart';
import { shallow } from 'enzyme';

describe('Component ChartSection', () => {
  Object.defineProperty(window, 'matchMedia', {
    value: jest.fn(() => {
      return { matches: true };
    })
  });

  const data = {
    phoneOrientation: 'portrait'
  };
  const select = () => true;

  describe('general markup', () => {
    const wrapper = shallow(<ChartSection data={data} select={select} />);
    wrapper.setState({ phoneOrientation: false });
    it('Chart is exist', () => {
      expect(wrapper.find(Chart)).toHaveLength(1);
    });
  });

  describe('smaptphone portrait orientation', () => {
    const wrapper = shallow(<ChartSection data={data} select={select} />);
    wrapper.setState({ phoneOrientation: 'portrait' });
    it('There is a rotate phone icon', () => {
      expect(wrapper.find('.rotate-icon')).toHaveLength(1);
    });
  });
});
