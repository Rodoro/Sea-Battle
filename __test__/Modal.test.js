import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import Modal from '../src/components/interface/Modal';
import { fireEvent } from '@testing-library/react';

test('renders modal when visible is true', () => {
    const { container } = render(<Modal visible={true} setVisible={() => {}} />);
    const modal = container.querySelector('.visible');

    expect(modal).toBeInTheDocument();
});


test('hides modal when visible is false', () => {
    const { container } = render(<Modal visible={false} setVisible={() => {}} />);
    const modal = container.querySelector('.invisible');

    expect(modal).toBeInTheDocument();
});


test('calls setVisible function when clicking outside the modal', () => {
    const setVisibleMock = jest.fn();
    const { container } = render(<Modal visible={true} setVisible={setVisibleMock} />);
    const modalOverlay = container.querySelector('.flex');

    fireEvent.click(modalOverlay);

    expect(setVisibleMock).toHaveBeenCalled();
});
