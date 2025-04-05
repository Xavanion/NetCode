import './styles/Home.css'
import Textbox from '../components/textbox';
import Outputbox from '../components/outputBox';

function Home() {
  return (
    <div style={styles.pageContainer}>
      <h1>Home</h1>
      <div style={styles.boxContainer}>
        <Textbox />
        <Outputbox />
      </div>
    </div>
  );
}

// Styles for Home
const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column', // Stack the h1 and the container below it
    height: '100vh', // Ensure it takes up full screen height
    padding: '20px', // Optional padding
    boxSizing: 'border-box' as 'border-box',
} as React.CSSProperties, // Add the type assertion here to make it a valid CSSProperties object

  boxContainer: {
    display: 'flex',
    flexDirection: 'row', // Align children side by side
    width: '100%', // Take full width of the available space
    height: 'calc(100vh - 80px)', // Remaining height below navbar (adjust if needed)
} as React.CSSProperties, // Add the type assertion here too
};

export default Home;
