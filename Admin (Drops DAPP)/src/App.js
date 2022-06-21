import './App.css';
import Header from './components/Header';
import Drop from './components/Drop';
import NearProvider from './provider/NearProvider';


function App() {
  return (
    <div className="App">
    <NearProvider>
        <Header/>
      <Drop/>
      </NearProvider>
      
    </div>
  );
}

export default App;
