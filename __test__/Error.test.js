import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import Error from '../src/components/interface/Error';

describe('Error', () => {
    test('renders error message with correct text', () => {
        const errorMessage = 'This is an error message';
        render(<Error text={errorMessage} />);
        const errorElement = screen.getByText(errorMessage);
        expect(errorElement).toBeInTheDocument();
    });

    test('applies correct styles to error message', () => {
        const errorMessage = 'This is an error message';
        render(<Error text={errorMessage} />);
        const errorElement = screen.getByText(errorMessage);
        expect(errorElement).toHaveClass('text-red-600 text-[16px] mb-4');
    });
});
