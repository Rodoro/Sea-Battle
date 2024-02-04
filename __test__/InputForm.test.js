import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import InputForm from '../src/components/interface/InputForm';

describe('InputForm', () => {
    it('renders the heading', () => {
        render(<InputForm text="Test Heading" type="text" value="" placeholder="Placeholder" />);

        const headingElement = screen.getByRole('heading', { name: /Test Heading/i });
        expect(headingElement).toBeInTheDocument();
    });

    it('renders the input field with the correct type', () => {
        render(<InputForm text="Test Heading" type="email" value="" placeholder="Placeholder" />);

        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toHaveAttribute('type', 'email');
    });

    it('renders the input field with the correct placeholder', () => {
        render(<InputForm text="Test Heading" type="text" value="" placeholder="Test Placeholder" />);

        const inputElement = screen.getByPlaceholderText(/Test Placeholder/i);
        expect(inputElement).toBeInTheDocument();
    });
});
