
// import dependencies
import React from 'react';
import moment from 'moment';

// text field
const FieldDateView = (props = {}) => {
  // start/end
  const end   = props.value?.end;
  const start = props.value?.start;

  // no date
  if (!start) return <div />;

  // return text field
  return (
    <div>
      <span>
        { moment(start).format('MMM D YYYY') }
      </span>
      { end && (
        <>
          <i className="fa fa-arrow-right mx-2" />
          <span>
            { moment(end).format('MMM D YYYY') }
          </span>
        </>
      ) }
    </div>
  );
};

// export default
export default FieldDateView;