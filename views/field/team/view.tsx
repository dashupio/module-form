
// import dependencies
import React from 'react';
import dotProp from 'dot-prop';

// text field
const FieldTeamView = (props = {}) => {

  // get value
  const value = Array.isArray(props.value) ? props.value : (props.value ? [props.value] : []);

  // return text field
  return (
    <div>
      { value.map((team, i) => {
        // return jsx
        return (
          <span key={ `${props.id}-team-${team.id}` } className="me-1">
            { !!dotProp.get(team, 'image.0.thumbs.sm-sq.url') && (
              <img className="avatar rounded rounded-circle me-2" src={ dotProp.get(team, 'image.0.thumbs.sm-sq.url') } />
            ) }
            { team.name }
          </span>
        );
      }) }
    </div>
  );
};

// export default
export default FieldTeamView;