import React from 'react';
import '../styles/textbox.css';

type Props = {
  curText: string;
  setText: (value: string) => void;
};


/*
  Textbox Component:
    Reusable Textbox component that lets someone:
      - Enter text to a textbox
      - Sync requests the text with the backend
      - Retrieve text updates from the backend

    Props:
      - curText: string
        A string that when called to retrieves the current text inputted in the textbox
      - setText: (value: string) => void
        A callback function used to update the textbox when typing

    Dependencies:
      - No outside dependencies outside of passed Props
*/
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
