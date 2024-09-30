import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import './App.scss';

function App() {
  return (
    <div className="appContainer">
      <Hero />
      <Projects />
      <Skills />
    </div>
  );
}

export default App;