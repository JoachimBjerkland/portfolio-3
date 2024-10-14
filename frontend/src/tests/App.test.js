import { render, screen } from '@testing-library/react';
import App from '../App'; // Korrekt import

describe('App', () => {
    it('renders header with student name', () => {
        render(<App />);
        // Sjekker om riktig studentnavn er synlig
        expect(screen.getByText(/Halgeir Geirson/i)).toBeInTheDocument(); // Oppdatert til det faktiske navnet
    });
});
