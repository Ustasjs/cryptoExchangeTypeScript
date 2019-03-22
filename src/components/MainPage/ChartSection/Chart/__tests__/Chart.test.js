import React from 'react';
import { LineChart } from 'react-chartkick';
import Spinner from 'react-svg-spinner';
import Chart from '../';
import { shallow } from 'enzyme';

describe('Component Chart', () => {
  const data = {
    min: '1',
    max: '100',
    purchase: '8',
    sell: '10',
    chartWidth: 700,
    chartHeight: 400,
    isDataLoaded: true
  };
  const select = () => true;
  const wrapper = shallow(<Chart data={data} select={select} />);

  describe('general markup', () => {
    it('Chart title is exist', () => {
      expect(wrapper.find('.title')).toHaveLength(1);
    });
    it('Chart buttons list is exist', () => {
      expect(wrapper.find('.chart__buttons')).toHaveLength(1);
    });
    it('5 chart buttons are exist', () => {
      expect(wrapper.find('.chart__button')).toHaveLength(5);
    });
    it('LineChart is exist', () => {
      expect(wrapper.find(LineChart)).toHaveLength(1);
    });
  });

  describe('loading data', () => {
    wrapper.setProps({ isDataLoaded: false });
    it('Spinner is exist', () => {
      expect(wrapper.find(Spinner)).toHaveLength(1);
    });
    it('Chart wrapper has a class name chart__content_hidden', () => {
      expect(wrapper.find('.chart__content_hidden')).toHaveLength(1);
    });
  });
});
