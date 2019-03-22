declare module 'react-chartkick' {
  import React from 'react';
  type dataType = {
    name: 'Продажа' | 'Покупка';
    data: [Date, number][];
  };
  interface ComponentProps {
    data: dataType[];
    min: string;
    max: string;
    legend: string;
    width: string;
    height: string;
  }
  export const LineChart: React.ComponentClass<ComponentProps>;
}
