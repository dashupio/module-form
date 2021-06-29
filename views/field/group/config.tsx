
// import dependencies
import { Color } from '@dashup/ui';
import React from 'react';

// colors
import colors from '../colors';

// global timer
let timer;

// global debounce
const debounce = (func, timeout = 1000) => {

  // return debounced
  return (...args) => {
    // clear timeout previously
    clearTimeout(timer);

    // create new timeout
    timer = setTimeout(() => func(...args), timeout);
  };
}

// text field
const FieldGroupConfig = (props = {}) => {

  // return text field
  return (
    <div>
      GROUP CONFIG
    </div>
  );
};

// export default
export default FieldGroupConfig;