import React, { useState, useEffect } from 'react';

const MarkdownEditor = () => {
  const [markdownText, setMarkdownText] = useState('# Hello World\n\nThis is **bold** text and this is *italic* text.\n\n## Features\n- Real-time preview\n- useState for state management\n- useEffect for updates');
  const [previewHtml, setPreviewHtml] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Simple markdown to HTML converter
  const convertMarkdownToHtml = (markdown) => {
    let html = markdown
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      // Line breaks
      .replace(/\n/gim, '<br>');
    
    return html;
  };

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setPreviewHtml(convertMarkdownToHtml(markdownText));
      setIsLoading(false);
    }, 50);
    
    return () => clearTimeout(timer);
  }, [markdownText]);

  const handleTextareaChange = (event) => {
    setMarkdownText(event.target.value);
  };

  return (
    <div className="app">
      <h1>Markdown Editor</h1>
      
      <div style={{ display: 'flex', gap: '20px', height: '400px' }}>
        <div style={{ flex: 1 }}>
          <h2>Input</h2>
          <textarea
            value={markdownText}
            onChange={handleTextareaChange}
            style={{
              width: '100%',
              height: '300px',
              padding: '10px',
              fontFamily: 'monospace',
              fontSize: '14px'
            }}
            placeholder="Type your markdown here..."
          />
        </div>
        
        <div style={{ flex: 1 }}>
          <h2>Preview</h2>
          {isLoading && <div className="loading">Loading...</div>}
          <div 
            className="preview"
            style={{
              width: '100%',
              height: '300px',
              padding: '10px',
              border: '1px solid #ccc',
              overflow: 'auto',
              backgroundColor: '#f9f9f9'
            }}
            dangerouslySetInnerHTML={{ __html: previewHtml }}
          />
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;
