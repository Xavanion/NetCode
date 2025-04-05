import './styles/Home.css';
import Textbox from '../components/textbox';
import Outputbox from '../components/outputBox';
import Toolbar from '../components/Toolbar';

function Home() {
  return (
    <div className="pageContainer">
      <h1>Home</h1>
      <div className="boxContainer">
        <div className="inputBox">
          <Toolbar />
          <Textbox />
        </div>
        <Outputbox />
      </div>
    </div>
  );
}
export default Home;
