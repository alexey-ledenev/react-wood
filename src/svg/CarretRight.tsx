import React, { FC, SVGProps } from 'react';

const CarretRight: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="8"
    viewBox="0 0 8 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1.087 8.77261C0.65721 8.77261 0.227417 8.45477 0.227417 7.84634L0.227417 1.68933C0.227417 0.826625 1.0297 0.581434 1.63141 0.917436L7.23782 3.99594C7.58166 4.17756 7.77267 4.45908 7.77267 4.76784C7.77267 5.07659 7.58166 5.35811 7.24737 5.53973L1.63141 8.61823C1.44994 8.71813 1.26847 8.77261 1.087 8.77261ZM1.19206 1.71658L1.18251 7.81001L6.73162 4.77692L1.19206 1.71658Z"
      fill="currentColor"
    />
  </svg>
);

export default CarretRight;
