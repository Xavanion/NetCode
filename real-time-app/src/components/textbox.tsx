import React from 'react';
import '../styles/textbox.css';

type Props = {
  curText: string;
  setText: (value: string) => void;
};

function Textbox({ curText, setText }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  return (
    <div className="textbox-container">
      <textarea
        value={curText}
        onChange={handleChange}
        placeholder="Enter your text here"
        className="textarea"
      />
    </div>
  );
}
export default Textbox;
