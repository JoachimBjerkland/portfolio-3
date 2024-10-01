// Project component
function Project({ project }) {
    return (
      <div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <p><strong>Status:</strong> {project.status}</p>
        <p><strong>Opprettet:</strong> {project.createdAt}</p>
        <p><strong>Publisert:</strong> {project.publishedAt}</p>
        <p><strong>Kategori:</strong> {project.category}</p>
        <p><strong>Tags:</strong> {project.tags.join(', ')}</p>
        <p><strong>Synlighet:</strong> {project.public ? 'Public' : 'Private'}</p>
        {project.link && <p><strong>Ekstern lenke:</strong> <a href={project.link}>{project.link}</a></p>}
  
        {/* Vis demoer */}
        <h4>Demoer</h4>
        {project.demos.length > 0 ? (
          <ul>
            {project.demos.map((demo, index) => (
              <li key={index}><a href={demo.url}>{demo.name}</a></li>
            ))}
          </ul>
        ) : (
          <p>Ingen demoer tilgjengelig</p>
        )}
  
        {/* Vis filer */}
        <h4>Filer</h4>
        {project.files.length > 0 ? (
          <ul>
            {project.files.map((file, index) => (
              <li key={index}><a href={file.url}>{file.name}</a></li>
            ))}
          </ul>
        ) : (
          <p>Ingen filer tilgjengelig</p>
        )}
  
        {/* Vis forfatter */}
        <h4>Forfatter</h4>
        {project.author && (
          <div>
            <p><strong>Navn:</strong> {project.author.name}</p>
            <p><strong>Bio:</strong> {project.author.bio}</p>
          </div>
        )}
      </div>
    );
  }
  