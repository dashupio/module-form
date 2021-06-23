
// import dependencies
import React from 'react';

// text field
const FieldBooleanView = (props = {}) => {

  // return text field
  return (
    <>
      { props.value ? 'True' : 'False' }
    </>
  );
};

// export default
export default FieldBooleanView;