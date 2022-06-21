import './App.css';
import Header from './components/Header';
import Drops from './components/Drops';
import NearProvider from './provider/NearProvider';


function App() {
  return (
    <div className="App">
    <NearProvider>
        <Header/>
        <Drops/>
      </NearProvider>
    </div>
  );
}

export default App;
