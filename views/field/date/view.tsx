
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
  const getFormat = () => {
    // format
    let format = props.field.format || 'MMM DD YYYY hh:mm a';

    // check format
    if (props.field.date === 'date') format = 'MMM DD YYYY';
    if (props.field.date === 'datetime') format = 'MMM DD YYYY hh:mm a';

    // return with time
    return format;
  };

  // return text field
  return (
    <div>
      <span>
        { moment(start).format(getFormat()) }
      </span>
      { type === 'date' && !!end && ` until ${moment(end).format(getFormat())}` }
      { type === 'lasting' && !!end && ` for ${amount.toLocaleString()} ${period}${amount > 1 ? 's' : ''}`}
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