import { render, screen } from '@testing-library/react';
import Experiences from '../components/Experiences'; // Korrekt import

describe('Experiences', () => {
    it('renders experiences component', () => {
        render(<Experiences />);
        expect(screen.getByText(/Experiences Component/i)).toBeInTheDocument();
        expect(screen.getByText(/Dette er en liste over erfaringer./i)).toBeInTheDocument();
    });
});