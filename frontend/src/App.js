import React from 'react';
import './App.css';
import useProjects from './hooks/useProjects';

// Header component
function Header({ student }) {
  return (
    <div>
      <h1>{student.name}</h1>
      <p>{student.degree} {student.points} studiepoeng</p>
    </div>
  );
}

// Experience component
function Experience({ children }) {
  return <div>{children}</div>;
}

// Experiences component that renders a list of experiences
function Experiences({ experiences }) {
  return (
    <div>
      {experiences.length > 0 ? (
        experiences.map((experience, index) => (
          <Experience key={index}>
            <p>{experience.name}</p>
          </Experience>
        ))
      ) : (
        <p>Ingen erfaringer</p>
      )}
    </div>
  );
}

// Contact form component
function Contact({ student }) {
  return (
    <div>
      <p>Kontakt studenten på: {student.email}</p>
    </div>
  );
}

// Project component
function Project({ project }) {
  return (
    <div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <p><strong>Status:</strong> {project.status}</p> {/* Nytt felt */}
      <p><strong>Opprettet:</strong> {project.createdAt}</p>
      <p><strong>Publisert:</strong> {project.publishedAt}</p>
      <p><strong>Kategori:</strong> {project.category}</p>
      <p><strong>Tags:</strong> {project.tags.join(', ')}</p> {/* Nytt felt */}
      <p><strong>Synlighet:</strong> {project.public ? 'Public' : 'Private'}</p> {/* Nytt felt */}
      {project.link && <p><strong>Ekstern lenke:</strong> <a href={project.link}>{project.link}</a></p>} {/* Nytt felt */}
    </div>
  );
}

// Main App component
function App() {
  const { projects, loading, error } = useProjects();

  const student = {
    name: 'Halgeir Geirson',
    degree: 'Bachelor IT',
    points: 180,
    email: 'student@hiof.no',
    experiences: [
      { name: 'Figma UI for customer X' },
      { name: 'Website for customer Y' },
    ],
  };

  return (
    <main>
      <Header student={student} />
      <Experiences experiences={student.experiences} />
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
      <Contact student={student} />
    </main>
  );
}

export default App;
