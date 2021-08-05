
import React, { useRef, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';

// to html
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

// import
import './wysiwyg.scss';

// global timer
let timer;

// global debounce
const debounce = (func, timeout = 1000) => {

  // return debounced
  return (...args) => {
    // clear timeout previously
    clearTimeout(timer);

    // create new timeout
    timer = setTimeout(() => func(...args), timeout);
  };
}

// code
const Code = (props = {}) => {
  // content
  const contentBlock = htmlToDraft(`${props.value || ''}`);

  // let editor state
  let editorState;

  // check content block
  if (contentBlock) {
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    editorState = EditorState.createWithContent(contentState);
  }

  // set value
  const [value, setValue] = useState(editorState);

  // ref
  const editor = useRef(null);
  
  // on value
  const onValue = (val) => {
    // set value
    setValue(val);

    // debounce change
    debounce(props.onChange, 350)(draftToHtml(convertToRaw(val.getCurrentContent())));
  };

  // return jsx
  return (
    <Editor
      ref={ editor }
      editorState={ value }
      onEditorStateChange={ onValue }
    />
  );
};

// export default
export default Code;