import '../styles/outputBox.css';

type Props = {
  curText: string;
  activeOutput: 'terminal' | 'review';
};

function Outputbox({ curText, activeOutput,  }: Props) {
  return (
    <div className="outputbox-container">

      <textarea
        readOnly
        value={curText}
        placeholder={activeOutput === 'terminal' ? 'Output will be shown here' : 'Code review will be shown here'}
        className="output_textarea"
      />
    </div>
  );
}

export default Outputbox;
