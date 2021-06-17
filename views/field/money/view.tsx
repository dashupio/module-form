
// import dependencies
import React from 'react';

// text field
const FieldMoneyView = (props = {}) => {

  // return text field
  return (
    <>
      ${ parseInt(props.value || 0).toFixed(2) }
    </>
  );
};

// export default
export default FieldMoneyView;