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
    <div className="app min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Markdown Editor
          </h1>
          <p className="text-gray-600">
            Write Markdown on the left, see the live preview on the right
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
          {/* Input Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-800 text-white px-4 py-2">
              <h2 className="text-lg font-semibold">Markdown Input</h2>
            </div>
            <textarea
              className="w-full h-full p-4 border-none outline-none resize-none font-mono text-sm leading-relaxed"
              value={markdownText}
              onChange={handleInputChange}
              placeholder="Start typing your markdown here..."
              style={{ minHeight: '500px' }}
            />
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-blue-600 text-white px-4 py-2 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Live Preview</h2>
              {isLoading && (
                <div className="loading flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  <span className="text-sm">Updating...</span>
                </div>
              )}
            </div>
            <div 
              className="preview p-4 h-full overflow-y-auto prose prose-sm max-w-none"
              style={{ minHeight: '500px' }}
              dangerouslySetInnerHTML={{ __html: parsedMarkdown }}
            />
          </div>
        </div>

        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>Built with React, useState, and useEffect • Real-time Markdown rendering</p>
        </footer>
      </div>

      <style jsx>{`
        .prose h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.5em 0;
          color: #1f2937;
        }
        .prose h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.5em 0;
          color: #374151;
        }
        .prose h3 {
          font-size: 1.25em;
          font-weight: bold;
          margin: 0.5em 0;
          color: #4b5563;
        }
        .prose p {
          margin: 0.5em 0;
          line-height: 1.6;
        }
        .prose ul, .prose ol {
          margin: 0.5em 0;
          padding-left: 1.5em;
        }
        .prose li {
          margin: 0.25em 0;
        }
        .prose code {
          background-color: #f3f4f6;
          padding: 0.125em 0.25em;
          border-radius: 0.25em;
          font-family: 'Courier New', monospace;
          font-size: 0.875em;
        }
        .prose pre {
          background-color: #1f2937;
          color: #f9fafb;
          padding: 1em;
          border-radius: 0.5em;
          overflow-x: auto;
          margin: 1em 0;
        }
        .prose pre code {
          background-color: transparent;
          padding: 0;
          color: inherit;
        }
        .prose a {
          color: #3b82f6;
          text-decoration: underline;
        }
        .prose a:hover {
          color: #1d4ed8;
        }
        .prose strong {
          font-weight: bold;
        }
        .prose em {
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default MarkdownEditor;
