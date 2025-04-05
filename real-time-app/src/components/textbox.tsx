import React, { useState } from 'react';

function Textbox() {
  const [text, setText] = useState<string>(''); // State to hold the input value

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div style={styles.textboxContainer}>
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Enter your text here"
        style={styles.textarea}
      />
    </div>
  );
}

// Styles with type assertions for CSS properties
const styles = {
  textboxContainer: {
    flex: 1, // Takes up 50% of the width
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    overflow: 'hidden',
  } as React.CSSProperties, // Type assertion for textbox container styles

  textarea: {
    width: '100%',
    height: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    resize: 'none',
    overflowY: 'auto',
    boxSizing: 'border-box',
  } as React.CSSProperties, // Type assertion for textarea styles
};

export default Textbox;
