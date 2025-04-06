import '../styles/outputBox.css';
import { useRopes } from '../hooks/useRopes';
import { useEffect, useState } from 'react';

function Outputbox() {
  const [outputText] = useRopes();
  const [output, setOutput] = useState(null);

  useEffect(()=> {
    setOutput(outputText);
  }, [outputText])
  return (
    <div className="outputboxContainer">
      <textarea
        readOnly
        placeholder="Output will be shown here"
        value={output}
        className="output_textarea"
      />
    </div>
  );
}
export default Outputbox;
