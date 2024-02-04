import React from 'react';
import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import ButtonForm from '../src/components/interface/ButtonForm';

describe('ButtonForm component', () => {
    it('renders button with correct text', () => {
        const { getByText } = render(<ButtonForm>Submit</ButtonForm>);
        const buttonElement = getByText('Submit');
        expect(buttonElement).toBeInTheDocument();
    });

    it('applies correct styling classes', () => {
        const { getByText } = render(<ButtonForm>Submit</ButtonForm>);
        const buttonElement = getByText('Submit');
        expect(buttonElement).toHaveClass('w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600');
    });
});
