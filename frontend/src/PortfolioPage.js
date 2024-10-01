import React from 'react';
import useProjects from './hooks/useProjects';
import Project from './Project';
import Layout from './Layout';

function PortfolioPage() {
  const { projects, loading, error } = useProjects();

  return (
    <Layout>
      <h2>Portefølje</h2>
      {loading ? (
        <p>Laster prosjekter...</p>
      ) : error ? (
        <p>Feil ved lasting av prosjekter: {error}</p>
      ) : (
        projects.length > 0 ? (
          projects.map((project) => (
            <Project key={project.id} project={project} />
          ))
        ) : (
          <p>Ingen prosjekter</p>
        )
      )}
    </Layout>
  );
}

export default PortfolioPage;
