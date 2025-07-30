import React, { useState, useEffect } from 'react';

// Simple markdown parser function
const parseMarkdown = (text) => {
  if (!text) return '';
  
  return text
    // Headers
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    // Code blocks
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    // Inline code
    .replace(/`(.*?)`/g, '<code>$1</code>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Line breaks
    .replace(/\n/g, '<br>')
    // Lists (simple implementation)
    .replace(/^\* (.*$)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ol>$1</ol>');
};

const MarkdownEditor = () => {
  const [markdownText, setMarkdownText] = useState(`# Welcome to Markdown Editor

This is a **live preview** markdown editor built with React!

## Features
* Real-time preview
* State management with useState
* Live updates with useEffect
* Responsive design

### Try it out:
- Type some **bold text**
- Add some _italic text_
- Create [links](https://example.com)
- Use \`inline code\`

\`\`\`
// Code blocks work too!
function hello() {
  console.log("Hello, World!");
}
\`\`\`

> Start editing to see the live preview in action!`);

  const [parsedMarkdown, setParsedMarkdown] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate slight processing delay for loading state
    setIsLoading(true);
    const timer = setTimeout(() => {
      setParsedMarkdown(parseMarkdown(markdownText));
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [markdownText]);

  const handleInputChange = (e) => {
    setMarkdownText(e.target.value);
  };

  return (
    <div className="app">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <header style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
            Markdown Editor
          </h1>
          <p style={{ color: '#666' }}>
            Write Markdown on the left, see the live preview on the right
          </p>
        </header>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '20px', 
          minHeight: '500px' 
        }}>
          {/* Input Section */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }}>
            <div style={{ 
              backgroundColor: '#374151', 
              color: 'white', 
              padding: '10px 16px' 
            }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>
                Markdown Input
              </h2>
            </div>
            <textarea
              value={markdownText}
              onChange={handleInputChange}
              placeholder="Start typing your markdown here..."
              style={{
                width: '100%',
                height: '500px',
                padding: '16px',
                border: 'none',
                outline: 'none',
                resize: 'none',
                fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                fontSize: '14px',
                lineHeight: '1.5'
              }}
            />
          </div>

          {/* Preview Section */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }}>
            <div style={{ 
              backgroundColor: '#2563eb', 
              color: 'white', 
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>
                Live Preview
              </h2>
              {isLoading && (
                <div className="loading" style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid white',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    marginRight: '8px'
                  }}></div>
                  <span style={{ fontSize: '0.875rem' }}>Updating...</span>
                </div>
              )}
            </div>
            <div 
              className="preview"
              style={{
                padding: '16px',
                height: '500px',
                overflowY: 'auto',
                lineHeight: '1.6'
              }}
              dangerouslySetInnerHTML={{ __html: parsedMarkdown }}
            />
          </div>
        </div>

        <footer style={{ 
          marginTop: '30px', 
          textAlign: 'center', 
          color: '#666', 
          fontSize: '0.875rem' 
        }}>
          <p>Built with React, useState, and useEffect • Real-time Markdown rendering</p>
        </footer>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .preview h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.5em 0;
          color: #1f2937;
        }
        .preview h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.5em 0;
          color: #374151;
        }
        .preview h3 {
          font-size: 1.25em;
          font-weight: bold;
          margin: 0.5em 0;
          color: #4b5563;
        }
        .preview p {
          margin: 0.5em 0;
        }
        .preview ul, .preview ol {
          margin: 0.5em 0;
          padding-left: 1.5em;
        }
        .preview li {
          margin: 0.25em 0;
        }
        .preview code {
          background-color: #f3f4f6;
          padding: 0.125em 0.25em;
          border-radius: 0.25em;
          font-family: 'Courier New', monospace;
          font-size: 0.875em;
        }
        .preview pre {
          background-color: #1f2937;
          color: #f9fafb;
          padding: 1em;
          border-radius: 0.5em;
          overflow-x: auto;
          margin: 1em 0;
        }
        .preview pre code {
          background-color: transparent;
          padding: 0;
          color: inherit;
        }
        .preview a {
          color: #3b82f6;
          text-decoration: underline;
        }
        .preview a:hover {
          color: #1d4ed8;
        }
        .preview strong {
          font-weight: bold;
        }
        .preview em {
          font-style: italic;
        }
        
        @media (max-width: 768px) {
          .app > div > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default MarkdownEditor;
