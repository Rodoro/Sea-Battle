import React from 'react'

type MarkupTextProps = {
    children: string;
};

const MarkText: React.FC<MarkupTextProps> = ({ children }) => {
    const markupText = (text: string): JSX.Element => {
        const boldRegex = /\*([^*]+)\*/g; // Регулярное выражение для выделения жирного текста
        const italicRegex = /_([^_]+)_/g; // Регулярное выражение для выделения курсивного текста
        const underlineRegex = /~([^~]+)~/g; // Регулярное выражение для выделения подчеркнутого текста

        const boldText = text.replace(boldRegex, '<strong>$1</strong>'); // Замена жирного текста разметкой
        const italicText = boldText.replace(italicRegex, '<em>$1</em>'); // Замена курсивного текста разметкой
        const markup = italicText.replace(underlineRegex, '<u>$1</u>'); // Замена подчеркнутого текста разметкой

        return <div dangerouslySetInnerHTML={{ __html: markup }} />;
    };

    return markupText(children)
}

export default MarkText
