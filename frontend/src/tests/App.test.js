import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react'; // Importer act fra react
import App from '../App'; // Endret banen til App

describe('App', () => {
    it('renders header with student name', () => {
        // Wrapping the render call in act
        act(() => {
            render(<App />);
        });

        // Sjekker om riktig studentnavn er synlig
        const studentNames = screen.getAllByText(/Halgeir Geirson/i); // Endret til getAllByText
        expect(studentNames.length).toBeGreaterThan(0); // Sjekker at minst ett element med navnet finnes
    });
});
