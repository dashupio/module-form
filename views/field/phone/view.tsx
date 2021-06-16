
// import dependencies
import React from 'react';

// text field
const FieldPhoneView = (props = {}) => {
  // return text field
  return props.value?.number ? (
    <a href={ `tel:${props.value.number}` } target="_BLANK">
      { props.value.number }
    </a>
  ) : <div />;
};

// export default
export default FieldPhoneView;