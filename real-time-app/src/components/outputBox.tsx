import '../styles/outputBox.css';


type Props = {
  curText: string;
};

function Outputbox({ curText }: Props) {
  return (
    <div className="outputboxContainer">
      <textarea
        readOnly
        value={curText}
        placeholder="Output will be shown here"
        className="output_textarea"
      />
    </div>
  );
}
export default Outputbox;
