import projects from '../projectsData';
import '../styles/Projects.scss'; 

const Projects = () => {
  return (
    <div className="projects-wrapper">
      {projects.map((project) => (
        <a href={project.link} key={project.id} target="_blank" rel="noopener noreferrer">
          <article className="card-wrapper">
            {/* TODO: Add video on hover */}
            <div
              className="card-image"
              style={{ backgroundImage: `url(${project.imageUrl})` }}
            ></div>
            <div className="project-summary">
              <h2 className="project-title">{project.title}</h2>
              <p className="tech-stack">{project.techStack}</p>
              <p className="project-desc">{project.description}</p>
            </div>
          </article>
        </a>
      ))}
    </div>
  );
};

export default Projects;