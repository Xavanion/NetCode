import './styles/outputBox.css';

function Outputbox() {
  return (
    <div className="outputboxContainer">
      <textarea
        readOnly
        placeholder="Output will be shown here"
        className="textarea"
      />
    </div>
  );
}

export default Outputbox;
