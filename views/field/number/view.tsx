
// import dependencies
import React from 'react';

// text field
const FieldNumberView = (props = {}) => {

  // return text field
  return (
    <>
      { `${props.value || ''}` }
    </>
  );
};

// export default
export default FieldNumberView;