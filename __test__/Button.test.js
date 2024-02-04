import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '../src/components/interface/Button';

describe('Button component', () => {

    it('calls onClick handler when clicked', () => {
        const onClickMock = jest.fn();
        const { getByText } = render(<Button onClick={onClickMock}>Click me</Button>);
        const buttonElement = getByText('Click me');
        fireEvent.click(buttonElement);
        expect(onClickMock).toHaveBeenCalledTimes(1);
    });
});
