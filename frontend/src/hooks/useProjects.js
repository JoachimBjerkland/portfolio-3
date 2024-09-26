import { useEffect, useState } from 'react';
import { projectSchema } from '../validations/projectSchema';

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/projects');
        if (!response.ok) throw new Error('Feil ved lasting av prosjekter');

        const data = await response.json();

        // Valider prosjektene med Zod
        const validatedProjects = data.map((project) => projectSchema.parse(project));

        setProjects(validatedProjects);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
};

export default useProjects;
