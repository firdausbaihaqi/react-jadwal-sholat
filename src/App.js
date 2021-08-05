import './styles/App.css';

import Jadwal from './components/Jadwal';


function App() {
  return (
    <main className="App" style={{ backgroundColor: '#282c34' }}>
      <section className="container text-light mt-5">
        <Jadwal />
      </section>
    </main>
  );
}

export default App;
