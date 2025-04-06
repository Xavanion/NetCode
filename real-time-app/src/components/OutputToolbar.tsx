import '../styles/Toolbar.css';

type Props = {
  activeOutput: 'terminal' | 'review';
  setActiveOutput: (val: 'terminal' | 'review') => void;
};

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
