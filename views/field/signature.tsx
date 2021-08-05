
// import dependencies
import { Form } from 'react-bootstrap';
import SignatureCanvas from 'react-signature-canvas';
import React, { useRef, useEffect } from 'react';

// text field
const FieldSignature = (props = {}) => {

  // use ref
  const signatureRef = useRef(null);

  // on change
  const onClear = () => {
    // get data
    props.onChange(props.field, null);
    signatureRef.current?.clear();
  };

  // on change
  const onChange = () => {
    // get data
    props.onChange(props.field, JSON.stringify(signatureRef.current?.toData()));
  };

  // use effect
  useEffect(() => {
    // check value
    if (!props.value || !signatureRef.current || !signatureRef.current?.isEmpty()) return;

    // set value
    signatureRef.current.fromData(JSON.parse(props.value));
  }, [!!signatureRef.current]);

  // return text field
  return (
    <Form.Group className={ props.noLabel ? '' : 'mb-3' } controlId={ props.field.uuid }>
      { !props.noLabel && (
        <Form.Label className="d-flex">
          { props.field.label || (
            <a href="#!" onClick={ (e) => !props.onConfig(props.field) && e.preventDefault() }>
              <i>Set Label</i>
            </a>
          ) }
          <a href="#!" className="ms-auto" onClick={ (e) => onClear(e) }>
            Clear
          </a>
        </Form.Label>
      ) }
      <div>
        <SignatureCanvas
          ref={ signatureRef }
          onEnd={ onChange }
          penColor="#000"
          canvasProps={
            {
              width     : 250,
              height    : 100,
              className : 'sig-canvas rounded',
            } }
          />
      </div>
      { !!props.field.help && !props.noLabel && (
        <Form.Text className="form-help">
          { props.field.help }
        </Form.Text>
      ) }
    </Form.Group>
  );
};

// export default
export default FieldSignature;