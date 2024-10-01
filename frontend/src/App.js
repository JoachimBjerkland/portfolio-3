import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout'; // Global layout komponent
import PortfolioPage from './PortfolioPage'; // Portfolio-siden

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

// Hjemmesiden
function HomePage() {
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
    <Layout>
      <Header student={student} />
      <Experiences experiences={student.experiences} />
      <Contact student={student} />
    </Layout>
  );
}

// Main App component
function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Portfolio-siden */}
        <Route path="/portfolio" element={<PortfolioPage />} />

        {/* Route for Hjemmesiden */}
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
