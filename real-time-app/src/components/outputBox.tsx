import React from 'react';

function Outputbox() {
  return (
    <div style={styles.outputboxContainer}>
      <textarea
        readOnly
        placeholder="Output will be shown here"
        style={styles.textarea}
      />
    </div>
  );
}

// Styles with type assertions for CSS properties
const styles = {
  outputboxContainer: {
    flex: 1, // Takes up the remaining 50% of the width
    display: 'flex',
    justifyContent: 'center' as 'center', // Center the output area horizontally
    alignItems: 'center' as 'center', // Center the output area vertically
    padding: '10px',
    overflow: 'hidden' as 'hidden', // Prevent overflow outside the container
  } as React.CSSProperties,

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
  } as React.CSSProperties,
};

export default Outputbox;
