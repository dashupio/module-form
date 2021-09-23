
// import dependencies
import IMask from 'imask';
import moment from 'moment';
import { IMaskInput } from 'react-imask';
import React, { useRef, useState, useEffect } from 'react';
import { Date as DatePicker, Select, Form, Overlay, Popover, Button, InputGroup, OverlayTrigger, Tooltip, Dropdown, DropdownButton } from '@dashup/ui';

// import date
import './date.scss';

// text field
const FieldDate = (props = {}) => {
  // value
  const value = props.value;

  // use state
  const [end, setEnd] = useState(value?.end ? new Date(value?.end) : null);
  const [type, setType] = useState(value?.type);
  const [first, setFirst] = useState(true);
  const [start, setStart] = useState(value?.start ? new Date(value?.start) : null);
  const [period, setPeriod] = useState(value?.period);
  const [repeat, setRepeat] = useState(typeof value?.repeat === 'object' ? value?.repeat : null);
  const [amount, setAmount] = useState(value?.amount || 1);
  const [endOpen, setEndOpen] = useState(false);
  const [startOpen, setStartOpen] = useState(false);
  const [untilOpen, setUntilOpen] = useState(false);
  const [repeatOpen, setRepeatOpen] = useState(false);

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

  // get mask
  const getMask = () => {
    // format
    const format = getFormat();

    return {
      mask    : Date,
      lazy    : false,
      pattern : format,
    
      format : (date) => {
        return moment(date).format(format);
      },
      parse : (str) => {
        return moment(str, format);
      },
    
      blocks : {
        Q : {
          to        : 1,
          mask      : IMask.MaskedRange,
          from      : 4,
          autofix   : true,
          maxLength : 1,

          placeholderChar : 'Q',
        },
        YYYY : {
          to        : 2100,
          mask      : IMask.MaskedRange,
          from      : 1,
          autofix   : true,
          maxLength : 4,

          placeholderChar : 'Y',
        },
        YY : {
          to        : 99,
          mask      : IMask.MaskedRange,
          from      : 1,
          autofix   : true,
          maxLength : 2,

          placeholderChar : 'Y',
        },
        MMMM : {
          mask      : IMask.MaskedEnum,
          enum      : ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          autofix   : true,
          maxLength : 9,

          placeholderChar : 'M',
        },
        MMM : {
          mask      : IMask.MaskedEnum,
          enum      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          autofix   : true,
          maxLength : 3,

          placeholderChar : 'M',
        },
        MM : {
          to        : 12,
          mask      : IMask.MaskedRange,
          from      : 1,
          autofix   : true,
          maxLength : 2,

          placeholderChar : 'M',
        },
        M : {
          to        : 12,
          mask      : IMask.MaskedRange,
          from      : 1,
          autofix   : true,
          maxLength : 2,

          placeholderChar : 'M',
        },
        dddd : {
          mask      : IMask.MaskedEnum,
          enum      : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          autofix   : true,
          maxLength : 9,

          placeholderChar : 'd',
        },
        ddd : {
          mask      : IMask.MaskedEnum,
          enum      : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          autofix   : true,
          maxLength : 3,

          placeholderChar : 'd',
        },
        DD : {
          to        : 31,
          mask      : IMask.MaskedRange,
          from      : 1,
          autofix   : true,
          maxLength : 2,

          placeholderChar : 'D',
        },
        D : {
          to        : 31,
          mask      : IMask.MaskedRange,
          from      : 1,
          autofix   : true,
          maxLength : 2,

          placeholderChar : 'D',
        },
        o : {
          mask      : IMask.MaskedEnum,
          enum      : ['st', 'rd', 'nd', 'th'],
          autofix   : true,
          maxLength : 2,

          placeholderChar : 's',
        },
        HH : {
          to        : 23,
          mask      : IMask.MaskedRange,
          from      : 0,
          autofix   : true,
          maxLength : 2,

          placeholderChar : 'H',
        },
        hh : {
          to        : 12,
          mask      : IMask.MaskedRange,
          from      : 1,
          autofix   : true,
          maxLength : 2,

          placeholderChar : 'h',
        },
        mm : {
          to        : 59,
          mask      : IMask.MaskedRange,
          from      : 0,
          autofix   : true,
          maxLength : 2,

          placeholderChar : 'm',
        },
        a : {
          mask      : IMask.MaskedEnum,
          enum      : ['am', 'pm'],
          autofix   : true,
          maxLength : 2,
        },
        LTS : {
          mask : '00:00:00 aa',
        },
        LT : {
          mask : '00:00 aa',
        }
      }
    }
  }

  // masks
  const [endMask, setEndMask] = useState((end || start) ? moment(end || start).format(getFormat()) : '');
  const [startMask, setStartMask] = useState(start ? moment(start).format(getFormat()) : '');
  const [untilMask, setUntilMask] = useState(repeat?.until ? moment(repeat.until).format(getFormat()) : '');

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

  // clear value
  const onClear = (e) => {
    setStart(null);
    setStartMask('');
  };

  // on start
  const onEnd = (v) => {
    // parsed date
    const parsedDate = v instanceof Date ? v : moment(v, getFormat()).toDate();

    // set mask
    setEndMask(v instanceof Date ? moment(v).format(getFormat()) : v);

    // set end
    if (!isNaN(parsedDate.getTime())) {
      setEnd(parsedDate);
    }
  };

  // on start
  const onStart = (v) => {
    // parsed date
    const parsedDate = v instanceof Date ? v : moment(v, getFormat()).toDate();

    // set mask
    setStartMask(v instanceof Date ? moment(v).format(getFormat()) : v);

    // set end
    if (!isNaN(parsedDate.getTime())) {
      setStart(parsedDate);
    }
  };

  // on start
  const onUntil = (v) => {
    // parsed date
    const parsedDate = v instanceof Date ? v : moment(v, getFormat()).toDate();

    // set mask
    setUntilMask(v instanceof Date ? moment(v).format(getFormat()) : v);

    // set end
    if (!isNaN(parsedDate.getTime())) {
      setRepeat({
        ...repeat,
        until : parsedDate,
      });
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

  // use effect
  useEffect(() => {
    // on change
    if (props.onChange && !first) props.onChange(props.field, getValue());

    // set first
    if (first) setFirst(false);
  }, [JSON.stringify(getValue())]);

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
          <IMaskInput
            { ...getMask() }
            value={ startMask }
            onClick={ (e) => !setStartOpen(true) && !start && onStart(new Date()) }
            onAccept={ (e) => onStart(e) }
            readOnly={ props.readOnly }
            className="form-control"
            />
          <OverlayTrigger
            overlay={
              <Tooltip>
                Clear Date
              </Tooltip>
            }
            placement="top"
          >
            <Button variant="secondary" onClick={ (e) => onClear(e) }>
              <i className="fa fa-times fa-fw" />
            </Button>
          </OverlayTrigger>
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
                  <IMaskInput
                    { ...getMask() }
                    value={ endMask }
                    onClick={ (e) => !setEndOpen(true) && !end && onStart(start || new Date()) }
                    onChange={ (e) => onEnd(e) }
                    readOnly={ props.readOnly }
                    className="form-control"
                    />
                </>
              ) }
              { type === 'lasting' && (
                <>
                  <InputGroup.Text>
                    For
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
        
        { !!props.field.repeat && (
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

      <Overlay target={ startRef.current } show={ startOpen } onHide={ (e) => setStartOpen(false) } placement="bottom-start" rootClose>
        <Popover className="popover-date">
          <div className="p-2">
            <DatePicker date={ start } time={ props.field.date !== 'date' } onChange={ (s) => onStart(s) } />
            <button className="btn btn-primary w-100 mt-3" onClick={ (e) => !setStartOpen(false) && !e.preventDefault() && e.stopPropagation() }>
              Confirm
            </button>
          </div>
        </Popover>
      </Overlay>

      <Overlay target={ endRef.current } show={ endOpen } onHide={ (e) => setEndOpen(false) } placement="bottom-start" rootClose>
        <Popover className="popover-date">
          <div className="p-2">
            <DatePicker date={ end } time={ props.field.date !== 'date' } onChange={ (e) => onEnd(e) } />
            <button className="btn btn-primary w-100 mt-3" onClick={ (e) => !setEndOpen(false) && !e.preventDefault() && e.stopPropagation() }>
              Confirm
            </button>
          </div>
        </Popover>
      </Overlay>

      <Overlay target={ untilRef.current } show={ untilOpen } onHide={ (e) => setUntilOpen(false) } placement="bottom-start" rootClose>
        <Popover className="popover-date">
          <div className="p-2">
            <DatePicker date={ repeat?.until } time={ props.field.date !== 'date' } onChange={ (u) => onUntil(u) } />
            <button className="btn btn-primary w-100 mt-3" onClick={ (e) => !setUntilOpen(false) && !e.preventDefault() && e.stopPropagation() }>
              Confirm
            </button>
          </div>
        </Popover>
      </Overlay>

      <Overlay target={ repeatRef.current } show={ repeatOpen } onHide={ (e) => setRepeatOpen(false) } placement="bottom-end" rootClose>
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
              <div className="mb-3" ref={ untilRef }>
                <label className="form-label">
                  Until
                </label>
                <IMaskInput
                  { ...getMask() }
                  value={ untilMask }
                  onClick={ (e) => !setUntilOpen(true) && !repeat?.until && onUntil(end || start || new Date()) }
                  onChange={ (e) => onUntil(e) }
                  readOnly={ props.readOnly }
                  className="form-control"
                  />
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