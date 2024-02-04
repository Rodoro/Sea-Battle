import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import MarkText from '../src/components/interface/MarkText';

test('renders text with bold, italic, and underline markup', () => {
    const text = 'This is *bold*, _italic_, and ~underlined~ text.';
    const { container } = render(<MarkText>{text}</MarkText>);
    const boldText = container.querySelector('strong');
    const italicText = container.querySelector('em');
    const underlineText = container.querySelector('u');

    expect(boldText).toBeInTheDocument();
    expect(italicText).toBeInTheDocument();
    expect(underlineText).toBeInTheDocument();
});

test('renders plain text without any markup', () => {
    const text = 'This is plain text without any markup.';
    const { container } = render(<MarkText>{text}</MarkText>);
    const boldText = container.querySelector('strong');
    const italicText = container.querySelector('em');
    const underlineText = container.querySelector('u');

    expect(boldText).toBeNull();
    expect(italicText).toBeNull();
    expect(underlineText).toBeNull();
});

test('renders text with repeated markup', () => {
    const text = 'This is **bold** and __bold__ text.';
    const { container } = render(<MarkText>{text}</MarkText>);
    const boldText = container.querySelectorAll('strong');

    expect(boldText.length).toBe(1);
});

test('renders text with nested markup', () => {
    const text = 'This is *bold and _italic_* text.';
    const { container } = render(<MarkText>{text}</MarkText>);
    const boldText = container.querySelector('strong');
    const italicText = container.querySelector('em');

    expect(boldText).toBeInTheDocument();
    expect(italicText).toBeInTheDocument();
});
