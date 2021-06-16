
// import dependencies
import React from 'react';
import dotProp from 'dot-prop';

// text field
const FieldImageView = (props = {}) => {

  // get value
  const value = Array.isArray(props.value) ? props.value : (props.value ? [props.value] : []);

  // return text field
  return (
    <div>
      { value.map((image, i) => {
        // return jsx
        return (
          <a key={ `image-${image.id}` } href={ image.url } target="_blank" className="me-2">
            <img className="img-fluid rounded" src={ dotProp.get(image, 'thumbs.1x-sq.url') } />
          </a>
        );
      }) }
    </div>
  );
};

// export default
export default FieldImageView;