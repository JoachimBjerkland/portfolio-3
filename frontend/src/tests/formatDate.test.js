// src/tests/formatDate.test.js
import { render, screen } from '@testing-library/react';
import { formatDate } from '../utils/formatDate';

describe('formatDate', () => {
    it('should format a valid date string', () => {
        const input = '2023-10-10';
        const output = formatDate(input);
        expect(output).toBe('10. oktober 2023'); // Forventet format
    });

    it('should return "Invalid Date" for an invalid date string', () => {
        const input = 'not-a-date';
        const output = formatDate(input);
        expect(output).toBe('Invalid Date'); // Legg til feilhåndtering i formatDate-funksjonen
    });

    it('should handle an empty string', () => {
        const input = '';
        const output = formatDate(input);
        expect(output).toBe('Invalid Date'); // Legg til feilhåndtering i formatDate-funksjonen
    });
});
