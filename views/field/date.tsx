
// import dependencies
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { Date as DatePicker } from '@dashup/ui';
import { Form, Overlay, Popover } from 'react-bootstrap';

// import date
import './date.scss';

// text field
const FieldDate = (props = {}) => {
  // use state
  const [end, setEnd] = useState(new Date(props.value?.end || new Date()));
  const [start, setStart] = useState(new Date(props.value?.start || new Date()));
  const [endOpen, setEndOpen] = useState(false);
  const [startOpen, setStartOpen] = useState(false);

  // refs
  const startRef = useRef(null);

  // on start
  const onEnd = (d) => {
    // set end
    setEnd(d);

    // on change
    props.onChange(props.field, {
      end : d,
      start,
    });
  };

  // on start
  const onStart = (d) => {
    // set start
    setStart(d);

    // on change
    props.onChange(props.field, {
      end,
      start : d,
    });
  };

  // on hide
  const onHide = (e) => {
    // prevent default
    e.preventDefault();
    
    // set show
    setStartOpen(false);
  };

  // return text field
  return (
    <Form.Group className="mb-3" controlId={ props.field.uuid }>
      <Form.Label>
        { props.field.label || (
          <a href="#!" onClick={ (e) => !props.onConfig(props.field) && e.preventDefault() }>
            <i>Set Label</i>
          </a>
        ) }
      </Form.Label>

      <Form.Control ref={ startRef } type="text" value={ moment(start).format('MMM D YYYY') } onFocus={ (e) => setStartOpen(true) } onChange={ (e) => {} } />

      <Overlay target={ startRef.current } show={ startOpen } onHide={ (e) => setStartOpen(false) } placement="bottom-start">
        <Popover className="popover-date">
          <div className="p-2">
            <DatePicker date={ start } onChange={ (s) => onStart(s) } />
            <button className="btn btn-primary w-100 mt-3" onClick={ (e) => onHide(e) }>
              Confirm
            </button>
          </div>
        </Popover>
      </Overlay>

      { !!props.field.help && (
        <Form.Text className="form-help">
          { props.field.help }
        </Form.Text>
      ) }
    </Form.Group>
  );
};

// export default
export default FieldDate;