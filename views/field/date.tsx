
// import dependencies
import moment from 'moment';
import InputMask from 'react-input-mask';
import React, { useRef, useState, useEffect } from 'react';
import { Date as DatePicker, Select } from '@dashup/ui';
import { Form, Overlay, Popover, Button, InputGroup, OverlayTrigger, Tooltip, Dropdown, DropdownButton } from 'react-bootstrap';

// import date
import './date.scss';

// text field
const FieldDate = (props = {}) => {
  // use state
  const [end, setEnd] = useState(props.value?.end ? new Date(props.value?.end) : null);
  const [type, setType] = useState(props.value?.type);
  const [first, setFirst] = useState(true);
  const [start, setStart] = useState(new Date(props.value?.start || new Date()));
  const [period, setPeriod] = useState(props.value?.period);
  const [repeat, setRepeat] = useState(props.value?.repeat);
  const [amount, setAmount] = useState(props.value?.amount || 1);
  const [endOpen, setEndOpen] = useState(false);
  const [startOpen, setStartOpen] = useState(false);
  const [untilOpen, setUntilOpen] = useState(false);
  const [repeatOpen, setRepeatOpen] = useState(false);

  // get format
  const getFormat = (mask = false) => {
    // get mask
    if (mask) {
      // check type
      if (props.field.date === 'date') return 'aaa 99 9999';

      // mask
      return 'aaa 99 9999 99:99 aa';
    }

    // check type
    if (props.field.date === 'date') return 'MMM D YYYY';

    // return with time
    return 'MMM D YYYY hh:mm a';
  };

  // masks
  const [endMask, setEndMask] = useState(moment(end || start || new Date()).format(getFormat()));
  const [startMask, setStartMask] = useState(moment(start || new Date()).format(getFormat()));

  // refs
  const endRef = useRef(null);
  const startRef = useRef(null);
  const untilRef = useRef(null);
  const repeatRef = useRef(null);

  // value
  const getValue = () => {
    // get actual end
    let actualEnd = type === 'lasting' ? moment(start).add(amount || 1, period || 'minute').toDate() : end;
    let actualStart = start;

    // check values
    if (props.field.date === 'date') {
      if (actualEnd) actualEnd = moment(actualEnd).startOf('day').toDate();
      if (actualStart) actualStart = moment(actualStart).startOf('day').toDate();
    }

    // return value
    return {
      end   : actualEnd,
      start : actualStart,
      type,
      amount,
      period,
      repeat,
    };
  };

  // on start
  const onEnd = (e) => {
    // parsed date
    const parsedDate = moment(e.target.value, getFormat()).toDate();

    // set end
    if (!isNaN(parsedDate.getTime())) {
      setEnd(parsedDate);
    }
  };

  // on start
  const onStart = (e) => {
    // set mask
    setStartMask(e.target.value);
    
    // parsed date
    const parsedDate = moment(e.target.value, getFormat()).toDate();

    // set end
    if (!isNaN(parsedDate.getTime())) {
      setStart(parsedDate);
    }
  };

  // get period
  const getPeriod = () => {
    // return triggers
    return ['Day', 'Week', 'Month', 'Year'].map((r) => {
      // return object
      return {
        label    : `${r}(s)`,
        value    : r.toLowerCase(),
        selected : (repeat?.period || '').toLowerCase() === r.toLowerCase(),
      };
    });
  };

  // get ends
  const getEnds = () => {
    // return triggers
    return ['Forever', 'Until'].map((ends) => {
      // return object
      return {
        label    : ends,
        value    : ends.toLowerCase(),
        selected : (repeat?.ends || '').toLowerCase() === ends.toLowerCase(),
      };
    });
  };

  // set ref
  const setRef = (fn, date) => {
    // set value
    fn(moment(date).format(getFormat()));
  };

  // use effect
  useEffect(() => {
    // on change
    if (props.onChange && !first) props.onChange(props.field, getValue());

    // set first
    if (first) setFirst(false);
  }, [getValue()]);

  // return text field
  return (
    <Form.Group className={ props.noLabel ? '' : 'mb-3' } controlId={ props.field.uuid }>
      { !props.noLabel && (
        <Form.Label>
          { props.field.label || (
            <a href="#!" onClick={ (e) => !props.onConfig(props.field) && !e.preventDefault() && e.stopPropagation() }>
              <i>Set Label</i>
            </a>
          ) }
        </Form.Label>
      ) }

      <div className="d-flex flex-row">
        <InputGroup className="flex-2" ref={ startRef }>
          { props.field.duration && type && (
            <InputGroup.Text>
              Start
            </InputGroup.Text>
          ) }
          <InputMask
            mask={ getFormat(true) }
            type="text"
            value={ startMask }
            onFocus={ (e) => setStartOpen(true) }
            onChange={ (e) => onStart(e) }
            className="form-control"
            />
        </InputGroup>
        { props.field.duration && (
          <OverlayTrigger
            overlay={
              <Tooltip>
                { type ? 'Duration' : 'Add Duration' }
              </Tooltip>
            }
            placement="top"
          >
            <InputGroup className={ `ms-2 ${type ? 'flex-1' : 'flex-0'}` } ref={ endRef }>
              <DropdownButton
                title={ (
                  <i className="fa fa-arrow-right" />
                ) }
                variant={ type ? 'primary' : 'secondary' }
              >
                <Dropdown.Item onClick={ () => setType('date') }>
                  Ends on Date
                </Dropdown.Item>
                <Dropdown.Item onClick={ () => setType('lasting') }>
                  Lasting
                </Dropdown.Item>
                <Dropdown.Item onClick={ () => setType(null) }>
                  No End
                </Dropdown.Item>
              </DropdownButton>
              { type === 'date' && (
                <>
                  <InputGroup.Text>
                    End
                  </InputGroup.Text>
                  <InputMask
                    mask={ getFormat(true) }
                    type="text"
                    value={ endMask }
                    onFocus={ (e) => setEndOpen(true) }
                    onChange={ (e) => onEnd(e) }
                    className="form-control"
                    />
                </>
              ) }
              { type === 'lasting' && (
                <>
                  <InputGroup.Text>
                    Lasting
                  </InputGroup.Text>
                  <Form.Control ref={ endRef } type="number" value={ amount } onChange={ (e) => setAmount(parseInt(e.target.value)) } />
                  <DropdownButton
                    title={ period ? `${period.charAt(0).toUpperCase()}${period.slice(1)}(s)` : 'Minute(s)' }
                    variant="primary"
                  >
                    <Dropdown.Item onClick={ () => setPeriod('minute') }>
                      Minute(s)
                    </Dropdown.Item>
                    <Dropdown.Item onClick={ () => setPeriod('hour') }>
                      Hour(s)
                    </Dropdown.Item>
                    <Dropdown.Item onClick={ () => setPeriod('day') }>
                      Day(s)
                    </Dropdown.Item>
                    <Dropdown.Item onClick={ () => setPeriod('week') }>
                      Week(s)
                    </Dropdown.Item>
                    <Dropdown.Item onClick={ () => setPeriod('month') }>
                      Month(s)
                    </Dropdown.Item>
                    <Dropdown.Item onClick={ () => setPeriod('year') }>
                      Year(s)
                    </Dropdown.Item>
                  </DropdownButton>
                </>
              ) }
            </InputGroup>
          </OverlayTrigger>
        ) }
        
        { props.field.repeat && (
          <OverlayTrigger
            overlay={
              <Tooltip>
                { repeat ? 'Repeat' : 'Add Repeat' }
              </Tooltip>
            }
            placement="top"
          >
            <Button ref={ repeatRef } className="ms-2" variant={ repeat ? 'primary' : 'secondary' } onClick={ () => setRepeatOpen(true) }>
              <i className="fa fa-repeat" />
              { !!repeat && (
                <span className="ms-2">
                  Every { repeat?.amount > 1 ? `${repeat.amount.toLocaleString()} ${repeat.period || 'day'}s` : (repeat.period || 'day') }
                  { repeat?.ends === 'until' ? ` until ${moment(repeat.until || end || start).format(getFormat())}` : '' }
                </span>
              )}
            </Button>
          </OverlayTrigger>
        ) }
      </div>

      <Overlay target={ startRef.current } show={ startOpen } onHide={ (e) => setStartOpen(false) } placement="bottom-start">
        <Popover className="popover-date">
          <div className="p-2">
            <DatePicker date={ start } time={ props.field.date !== 'date' } onChange={ (s) => !setStart(s) && setRef(setStartMask, s) } />
            <button className="btn btn-primary w-100 mt-3" onClick={ (e) => !setStartOpen(false) && !e.preventDefault() && e.stopPropagation() }>
              Confirm
            </button>
          </div>
        </Popover>
      </Overlay>

      <Overlay target={ endRef.current } show={ endOpen } onHide={ (e) => setEndOpen(false) } placement="bottom-start">
        <Popover className="popover-date">
          <div className="p-2">
            <DatePicker date={ end } time={ props.field.date !== 'date' } onChange={ (s) => !setEnd(s) && setRef(setEndMask, s) } />
            <button className="btn btn-primary w-100 mt-3" onClick={ (e) => !setEndOpen(false) && !e.preventDefault() && e.stopPropagation() }>
              Confirm
            </button>
          </div>
        </Popover>
      </Overlay>

      <Overlay target={ untilRef.current } show={ untilOpen } onHide={ (e) => setUntilOpen(false) } placement="bottom-start">
        <Popover className="popover-date">
          <div className="p-2">
            <DatePicker date={ repeat?.until } time={ props.field.date !== 'date' } onChange={ (s) => setRepeat({ ...repeat, until : s }) } />
            <button className="btn btn-primary w-100 mt-3" onClick={ (e) => !setUntilOpen(false) && !e.preventDefault() && e.stopPropagation() }>
              Confirm
            </button>
          </div>
        </Popover>
      </Overlay>

      <Overlay target={ repeatRef.current } show={ repeatOpen } onHide={ (e) => setRepeatOpen(false) } placement="bottom-end">
        <Popover className="popover-date">
          <div className="p-2">
            <div className="mb-3">
              <label className="form-label">
                Repeat Every
              </label>
              <div className="d-flex flex-row align-items-center">
                <input className="d-inline-flex me-2 flex-1 form-control" placeholder="Repeat Every" type="number" value={ repeat?.amount || 1 } onChange={ (e) => setRepeat({ ...repeat, amount : parseInt(e.target.value) }) } />
                <div className="d-inline-flex flex-1">
                  <Select options={ getPeriod() } className="w-100" defaultValue={ getPeriod().filter((f) => f.selected) } onChange={ (val) => setRepeat({ ...repeat, period : val?.value }) } isClearable />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">
                Repeat Until
              </label>
              <Select options={ getEnds() } defaultValue={ getEnds().filter((f) => f.selected) } onChange={ (val) => setRepeat({ ...repeat, ends : val?.value }) } isClearable />
            </div>
            { repeat?.ends === 'until' && (
              <div className="mb-3">
                <label className="form-label">
                  Until
                </label>
                <Form.Control ref={ untilRef } type="text" className="flex-1 ms-2" value={ moment(repeat?.until || end || start).format(getFormat()) } onFocus={ (e) => setUntilOpen(true) } onChange={ (e) => {} } />
              </div>
            ) }
            <div className="d-flex flex-row">
              <button className="btn btn-danger flex-0 me-2" onClick={ () => !setRepeatOpen(false) && setRepeat(null) }>
                <i className="fa fa-trash" />
              </button>
              <button className="btn btn-primary flex-1" onClick={ (e) => !setRepeatOpen(false) && !e.preventDefault() && e.stopPropagation() }>
                Confirm
              </button>
            </div>
          </div>
        </Popover>
      </Overlay>

      { !!props.field.help && !props.noLabel && (
        <Form.Text className="form-help">
          { props.field.help }
        </Form.Text>
      ) }
    </Form.Group>
  );
};

// export default
export default FieldDate;