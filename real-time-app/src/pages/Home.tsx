import './styles/Home.css';
import Textbox from '../components/textbox';
import Outputbox from '../components/outputBox';
import Toolbar from '../components/Toolbar';
import { useRopes } from '../hooks/useRopes';

function Home() {
  const [text, updateText, outputText ] = useRopes()
  return (
    <div className="pageContainer">
      <h1 className='codeHeader'>Codin time</h1>
      <div className="boxContainer">
        <div className="inputBox">
          <Toolbar />
          <Textbox curText={text} setText={updateText}/>
        </div>
        <Outputbox curText={outputText}/>
      </div>
    </div>
  );
}
export default Home;
