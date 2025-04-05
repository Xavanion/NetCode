import React, { useState } from 'react';

function Textbox() {
  const [text, setText] = useState<string>(''); // State to hold the input value

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div style={styles.pageContainer}>
      {/* Textbox container */}
      <div style={styles.textboxContainer}>
        <textarea
          value={text}
          onChange={handleChange}
          placeholder="Enter your text here"
          style={styles.textarea}
        />
      </div>
    </div>
  );
}

// Styles with type assertions for CSS properties
const styles = {
  pageContainer: {
    width: '100vw', // Full width of the viewport
    height: '100vh', // Full height of the viewport
    display: 'flex',
    flexDirection: 'column' as 'column', // Stack content vertically
    justifyContent: 'flex-start' as 'flex-start', // Align items from the top
  } as React.CSSProperties, // Type assertion for page container styles

  textboxContainer: {
    flex: 1, // Take up the remaining space after the navbar
    display: 'flex',
    justifyContent: 'center' as 'center', // Center the textarea horizontally
    alignItems: 'center' as 'center', // Center the textarea vertically
    padding: '10px',
    overflow: 'hidden' as 'hidden', // Prevent overflow outside the container
  } as React.CSSProperties, // Type assertion for textbox container styles

  textarea: {
    width: '100%',
    height: '100%', // Fill the available space inside the container
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    resize: 'none' as 'none', // Prevent resizing of the textarea
    overflowY: 'auto' as 'auto', // Enable vertical scrolling when content overflows
    boxSizing: 'border-box' as 'border-box', // Ensure padding and border are included in element size
  } as React.CSSProperties, // Type assertion for textarea styles
};

export default Textbox;
