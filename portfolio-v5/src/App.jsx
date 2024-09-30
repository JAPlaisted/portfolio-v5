import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import './App.scss';
import CTA from './components/Cta';

function App() {
  return (
    <div className="appContainer">
      <Hero />
      <header>
        <h2>My Projects</h2>
        <p>Here are some projects I have developed recently</p>
      </header>
      <Projects />
      <Skills />
      <CTA />
    </div>
  );
}

export default App;