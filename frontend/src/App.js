import React, { useEffect, useState } from 'react';
import './App.css';
import useProjects from './hooks/useProjects';
import { isValidDate } from './utils/validators';
import { parseISO } from 'date-fns';
import Cookies from 'js-cookie'; // Importer js-cookie

// Header component
function Header({ student }) {
    return (
        <header className="App-header">
            <h1>{student.name}</h1>
            <p>{student.degree} {student.points} studiepoeng</p>
        </header>
    );
}

// Experience component
function Experience({ children }) {
    return <div className="experience">{children}</div>;
}

// Experiences component that renders a list of experiences
function Experiences({ experiences }) {
    return (
        <section className="App-experiences">
            <h2>Erfaringer</h2>
            {experiences.length > 0 ? (
                experiences.map((experience, index) => (
                    <Experience key={index}>
                        <p>{experience.name}</p>
                    </Experience>
                ))
            ) : (
                <p>Ingen erfaringer</p>
            )}
        </section>
    );
}

// Contact form component
function Contact({ student }) {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [submittedData, setSubmittedData] = useState(null);
    const [error, setError] = useState(null); // For å håndtere feil

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !message) {
            alert('Vennligst fyll inn både navn og melding.');
            return;
        }

        const entry = { name, message }; // Opprett ny oppføring

        try {
            const response = await fetch('http://localhost:5000/api/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(entry),
            });

            if (!response.ok) {
                throw new Error('Feil ved lagring av data');
            }

            const newEntry = await response.json();
            setSubmittedData(newEntry); // Oppdater tilstanden med den lagrede oppføringen
            setName('');
            setMessage('');
        } catch (error) {
            setError(error.message); // Sett feilmelding
        }
    };

    return (
        <section className="App-contact">
            <h2>Kontakt</h2>
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
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Vis feilmelding */}
        </section>
    );
}

// Project component
function Project({ project }) {
    return (
        <div className="Project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p><strong>Opprettet:</strong> {project.createdAt}</p>
            <p><strong>Publisert:</strong> {project.publishedAt}</p>
            <p><strong>Kategori:</strong> {project.category}</p>
            <p><strong>Status:</strong> {project.status}</p>
            <p><strong>Tags:</strong> {project.tags.join(', ')}</p>
            <p><strong>Link:</strong> <a href={project.externalLink} target="_blank" rel="noopener noreferrer">{project.externalLink}</a></p>
        </div>
    );
}

// Footer component
function Footer() {
    return (
        <footer className="App-footer">
            <p>&copy; 2024 Halgeir Geirson</p>
        </footer>
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

    useEffect(() => {
        Cookies.set('user.role', 'admin', { path: '/', expires: 1 });
    }, []);

    return (
        <>
            <Header student={student} />
            <main className="App-content">
                <Experiences experiences={student.experiences} />
                {loading ? (
                    <p>Laster prosjekter...</p>
                ) : error ? (
                    <p>Feil ved lasting av prosjekter: {error}</p>
                ) : (
                    projects.length > 0 ? (
                        <section className="Projects-container">
                            {projects.map((project) => (
                                <Project key={project.id} project={project} />
                            ))}
                        </section>
                    ) : (
                        <p>Ingen prosjekter</p>
                    )
                )}
                <Contact student={student} />
            </main>
            <Footer />
        </>
    );
}

export default App;
