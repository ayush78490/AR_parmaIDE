// src/components/OutputArea.jsx
function OutputArea({ output }) {
    return (
      <div
        style={{
          marginTop: '20px',
          padding: '10px',
          backgroundColor: '#1e1e1e',
          color: '#d4d4d4',
          borderRadius: '5px',
          height: '100px',
          overflowY: 'auto',
        }}
      >
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    );
  }
  
  export default OutputArea;
  