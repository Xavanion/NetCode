import React from 'react';
import { useWS } from '../hooks/useWS';
import { useRopes } from '../hooks/useRopes';
import './styles/textbox.css';

function Textbox() {
  const socket = useWS();
  const [text, setText] = useRopes(socket.current);

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
