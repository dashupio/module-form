
// import dependencies
import React from 'react';
import { convert } from 'html-to-text';

// text field
const FieldWysiwygView = (props = {}) => {

  // return text field
  return (
    <>
      { convert(props.value || '') }
    </>
  );
};

// export default
export default FieldWysiwygView;