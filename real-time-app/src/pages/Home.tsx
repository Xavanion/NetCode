import './styles/Home.css';
import Textbox from '../components/textbox';
import Outputbox from '../components/outputBox';
import Toolbar from '../components/Toolbar';
import OutputToolbar from '../components/OutputToolbar';
import { useRopes } from '../hooks/useRopes';
import { useState } from 'react';

function Home() {
  const [text, updateText, outputText ] = useRopes()
  const [responseText, setReviewText] = useState('');
  const [activeOutput, setActiveOutput] = useState<'terminal' | 'review'>('terminal');


  return (
    <div className="pageContainer">
      <h1 className='codeHeader'>Codin time</h1>
      <div className="boxContainer">
        <div className="inputBox">
          <Toolbar curText={text} reviewText={setReviewText}/>
          <Textbox curText={text} setText={updateText}/>
        </div>
        <div className='outputBoxContainer'>
          <OutputToolbar
            activeOutput={activeOutput}
            setActiveOutput={setActiveOutput}
          />
          <Outputbox
            curText={activeOutput === 'terminal' ? outputText : responseText}
            activeOutput={activeOutput}
          />
        </div>
      </div>
    </div>
  );
}
export default Home;
