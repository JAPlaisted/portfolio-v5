import '../styles/Skills.scss'; 

const TAGS = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  // 'Tailwind',
  // 'Bootstrap',
  // 'Quasar',
  'ChakraUI',
  'React',
  // 'Next.js',
  'SCSS',
  'UI/UX',
  // 'GraphQL',
  'Node.JS',
  'LowDB',
  'Express',
  // 'Strapi',
  // 'Vercel',
  'Netlify',
  // 'AWS',
  'Render',
  // 'Docker',
];
const DURATION = 30000;
const ROWS = 3; 
const TAGS_PER_ROW = 12;

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

// eslint-disable-next-line react/prop-types
const InfiniteLoopSlider = ({ children, duration, reverse = false }) => {
  return (
    <div
      className="loop-slider"
      style={{
        '--duration': `${duration}ms`,
        '--direction': reverse ? 'reverse' : 'normal',
      }}
    >
      <div className="inner">
        {children}
        {children}
      </div>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const Tag = ({ text }) => (
  <div className="tag">
    <span>#</span> {text}
  </div>
);

const Skills = () => (
  <section className="skills-section">
    <header>
      <h2>Built on</h2>
    </header>
    <div className="tag-list">
      {[...new Array(ROWS)].map((_, i) => (
        <InfiniteLoopSlider
          key={i}
          duration={random(DURATION - 5000, DURATION + 5000)}
          reverse={i % 2}
        >
          {shuffle(TAGS).slice(0, TAGS_PER_ROW).map((tag, index) => (
            <Tag text={tag} key={index} />
          ))}
        </InfiniteLoopSlider>
      ))}
      <div className="fade"></div>
    </div>
  </section>
);

export default Skills;