import React from 'react';
import { useWS } from '../hooks/useWS';
import { useRopes } from '../hooks/useRopes';
import './Textbox.css';

function Textbox() {
  const socket = useWS();
  const [text, setText] = useRopes(socket);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div className="textbox-container">
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Enter your text here"
        className="textarea"
      />
    </div>
  );
}

export default Textbox;
