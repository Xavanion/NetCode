import '../styles/Toolbar.css';

type Props = {
  activeOutput: 'terminal' | 'review';
  setActiveOutput: (val: 'terminal' | 'review') => void;
};

/*
  Output Toolbar Component:
    Reusable output Toolbar UI component that lets the user:
      - Select to display output text
      - Select to display code review text

    Props:
      - activeOutput: string
        Used to tell which component to display
      - setActiveOutput: (val: string) => void
        Callback function to set the current tab displayed
*/
function OutputToolbar({ activeOutput, setActiveOutput }: Props) {
  return (
    <div className="toolbar">
        <ul>
            <li>
                <button
                    className={activeOutput === 'terminal' ? 'active' : ''}
                    onClick={() => setActiveOutput('terminal')}
                >
                    Terminal
                </button>
                <button
                    className={activeOutput === 'review' ? 'active' : ''}
                    onClick={() => setActiveOutput('review')}
                >
                    Review
                </button>
            </li>
        </ul>
    </div>
  );
}

export default OutputToolbar;
