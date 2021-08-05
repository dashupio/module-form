
// import dependencies
import React, { useRef, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';

// text field
const FieldTextView = (props = {}) => {

  // use ref
  const signatureRef = useRef(null);

  // use effect
  useEffect(() => {
    // check value
    if (!signatureRef.current) return;

    // clear
    signatureRef.current.clear();

    // set value
    if (props.value) signatureRef.current.fromData(JSON.parse(props.value));
    signatureRef.current.off();
  }, [!!signatureRef.current, props.value]);

  // return text field
  return (
    <>
      <SignatureCanvas
        ref={ signatureRef }
        penColor="#000"
        canvasProps={
          {
            width     : 250,
            height    : 100,
            className : 'sig-canvas rounded',
          } }
        />
    </>
  );
};

// export default
export default FieldTextView;