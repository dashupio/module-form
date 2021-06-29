
// import dependencies
import React from 'react';

// text field
const FieldTextareaView = (props = {}) => {

  // return text field
  return (
    <>
      { typeof props.value === 'string' ? props.value : `${JSON.stringify(props.value)}` }
    </>
  );
};

// export default
export default FieldTextareaView;