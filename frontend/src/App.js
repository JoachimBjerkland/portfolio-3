import React, { useState, useEffect } from 'react';
import './App.css';

// Header component
function Header({ student }) {
  return (
    <div>
      <h1>{student.name}</h1>
      <p>
        {student.degree} {student.points} studiepoeng
      </p>
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
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !message) {
      alert('Vennligst fyll inn både navn og melding.');
      return;
    }

    setSubmittedData({ name, message });
    setName('');
    setMessage('');
  };

  return (
    <div>
      <p>Kontakt studenten på: {student.email}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Navn:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Melding:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send melding</button>
      </form>
      {submittedData && (
        <div>
          <h3>Innsendt data:</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

// Project component
function Project({ children }) {
  return <div>{children}</div>;
}

// Projects component to render a list of projects
function Projects({ projects }) {
  return (
    <>
      {projects.length > 0 ? (
        projects.map((project) => (
          <Project key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p><strong>Opprettet:</strong> {project.createdAt}</p>
            <p><strong>Kategori:</strong> {project.category}</p>
          </Project>
        ))
      ) : (
        <p>Ingen prosjekter</p>
      )}
    </>
  );
}

// Main App component
function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch projects from the backend
    fetch('http://localhost:5000/projects')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

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
        <Projects projects={projects} />
      )}
      <Contact student={student} />
    </main>
  );
}

export default App;
