
// import dependencies
import React from 'react';

// text field
const FieldFileView = (props = {}) => {

  // get value
  const value = Array.isArray(props.value) ? props.value : (props.value ? [props.value] : []);

  // return text field
  return (
    <div>
      { value.map((file, i) => {
        // return jsx
        return (
          <a key={ `file-${file.id}` } href={ file.url } target="_blank" className="me-2">
            { file.name }
          </a>
        );
      }) }
    </div>
  );
};

// export default
export default FieldFileView;