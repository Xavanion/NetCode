import '../styles/outputBox.css';
import ReactMarkdown from 'react-markdown';

type Props = {
  curText: string;
  activeOutput: 'terminal' | 'review';
};

function Outputbox({ curText, activeOutput }: Props) {
  return (
    <div className="outputbox-container">
      {activeOutput === 'terminal' ? (
        <textarea
          readOnly
          value={curText}
          placeholder="Output will be shown here"
          className="output_textarea"
        />
      ) : (
        <div className="output_markdown_scroll">
          {curText.trim() === '' ? (
            <div className="markdown-placeholder">Code review will be shown here</div>
          ) : (
            <ReactMarkdown>{curText}</ReactMarkdown>
          )}
        </div>
      )}
    </div>
  );
}

export default Outputbox;
