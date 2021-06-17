
// import dependencies
import React from 'react';
import moment from 'moment';

// text field
const FieldDateView = (props = {}) => {
  // start/end
  const end    = props.value?.end;
  const type   = props.value?.type;
  const start  = props.value?.start;
  const repeat = props.value?.repeat;
  const amount = props.value?.amount || 1;
  const period = props.value?.period || 'minute';

  // no date
  if (!start) return <div />;

  // get format
  const getFormat = (mask = false) => {
    // check type
    if (props.field.date === 'date') return 'MMM D YYYY';

    // return with time
    return 'MMM D YYYY hh:mm a';
  };

  // return text field
  return (
    <div>
      <span>
        { moment(start).format(getFormat()) }
      </span>
      { type === 'date' && end && (
        <span className="ms-2">
          until { moment(end).format(getFormat()) }
        </span>
      ) }
      { type === 'lasting' && end && (
        <span className="ms-2">
          for { amount.toLocaleString() } { period }{ amount > 1 ? 's' : ''}
        </span>
      ) }
      { repeat && (
        <>
          <i className="fa fa-repeat mx-2" />
          <span>
            Every { repeat?.amount > 1 ? `${repeat.amount.toLocaleString()} ${repeat.period || 'day'}s` : (repeat.period || 'day') }
            { repeat?.ends === 'until' ? ` until ${moment(repeat.until || end || start).format(getFormat())}` : '' }
          </span>
        </>
      ) }
    </div>
  );
};

// export default
export default FieldDateView;