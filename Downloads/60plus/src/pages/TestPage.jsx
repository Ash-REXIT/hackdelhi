import React from 'react';

// Simple test component to verify React is working
export default function TestPage() {
  return (
    <div className="test-page">
      <h1>Page is working!</h1>
      <p>If you see this, the React components are rendering correctly.</p>

      <style>{`
        .test-page {
          padding: 2rem;
          text-align: center;
          background: #f4edff;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        h1 {
          color: #8235d0;
          font-family: 'Gambarino', serif;
        }
        p {
          color: #1a0a2e;
          font-family: 'Nunito Sans', sans-serif;
        }
      `}</style>
    </div>
  );
}