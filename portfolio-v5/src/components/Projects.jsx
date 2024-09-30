import projects from '../projectsData';
import '../styles/Projects.scss'; 

const Projects = () => {
  return (
    <div className="projects-wrapper">
      {projects.map((project) => (
        <a href={project.link} key={project.id}>
          <article className="card-wrapper">
            <div
              className="card-image"
              style={{ backgroundImage: `url(${project.imageUrl})` }}
            ></div>
            <div className="project-summary">
              <h2 className="project-title">{project.title}</h2>
              <p className="created-date">Created: {project.createdDate}</p>
              <p className="project-desc">{project.description}</p>
            </div>
          </article>
        </a>
      ))}
    </div>
  );
};

export default Projects;