import '../styles/outputBox.css';

function Outputbox() {
  return (
    <div className="outputboxContainer">
      <textarea
        readOnly
        placeholder="Output will be shown here"
        className="output_textarea"
      />
    </div>
  );
}
export default Outputbox;
