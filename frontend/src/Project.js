import React from 'react';

function Project({ project }) {
  return (
    <div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <p><strong>Opprettet:</strong> {project.createdAt}</p>
      <p><strong>Publisert:</strong> {project.publishedAt}</p>
      <p><strong>Kategori:</strong> {project.category}</p>
    </div>
  );
}

export default Project;
