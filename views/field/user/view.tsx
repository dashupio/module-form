
// import dependencies
import React from 'react';
import dotProp from 'dot-prop';

// text field
const FieldUserView = (props = {}) => {

  // get value
  const value = Array.isArray(props.value) ? props.value : (props.value ? [props.value] : []);

  // return text field
  return (
    <div>
      { value.map((user, i) => {
        // return jsx
        return (
          <a key={ `${props.id}-user-${user.id}` } href={ `/app/${props.dashup.get('_id')}/member/${user.id}/update` } className="me-1">
            { !!dotProp.get(user, 'avatar.0.thumbs.sm-sq.url') && (
              <img className="avatar rounded rounded-circle me-2" src={ dotProp.get(user, 'avatar.0.thumbs.sm-sq.url') } />
            ) }
            { user.name }
          </a>
        );
      }) }
    </div>
  );
};

// export default
export default FieldUserView;