declare module 'react-svg-spinner' {
  import React from 'react';
  interface ComponentProps {
    color?: string;
    thickness?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    gap: 1 | 2 | 3 | 4 | 5;
    speed?: 'fast' | 'slow';
    size: string;
  }
  const Spinner: React.FunctionComponent<ComponentProps>;
  export default Spinner;
}
