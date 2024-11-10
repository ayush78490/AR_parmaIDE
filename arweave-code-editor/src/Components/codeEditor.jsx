// src/components/CodeEditor.jsx
function CodeEditor({ code, setCode }) {
    return (
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{
          width: '100%',
          height: '400px',
          fontSize: '16px',
          backgroundColor: '#1e1e1e',
          color: '#d4d4d4',
          padding: '10px',
          borderRadius: '5px',
        }}
        placeholder="Write your code here..."
      />
    );
  }
  
  export default CodeEditor;
  