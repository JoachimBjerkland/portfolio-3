// Project component
function Project({ project }) {
    return (
      <div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <p><strong>Status:</strong> {project.status}</p> {/* Viser status */}
        <p><strong>Opprettet:</strong> {project.createdAt}</p>
        <p><strong>Publisert:</strong> {project.publishedAt}</p>
        <p><strong>Kategori:</strong> {project.category}</p>
        <p><strong>Tags:</strong> {project.tags.join(', ')}</p> {/* Viser tags */}
        <p><strong>Synlighet:</strong> {project.public ? 'Public' : 'Private'}</p> {/* Viser public */}
        {project.link && <p><strong>Ekstern lenke:</strong> <a href={project.link}>{project.link}</a></p>} {/* Ekstern lenke */}
      </div>
    );
  }
  