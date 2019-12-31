import React from 'react';

import spinner from './spinner2.gif';

const Spinner = () => 
  <img
    src={spinner}
    style={{ width: '200px', margin: 'auto', display: 'block' }}
    alt="Loading..."
  />

export default Spinner;