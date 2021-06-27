
// import dependencies
import React from 'react';

// text field
const FieldAddressView = (props = {}) => {

  // return text field
  return (
    <>
      { props.value?.formatted }
    </>
  );
};

// export default
export default FieldAddressView;