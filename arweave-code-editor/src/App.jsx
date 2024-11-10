// src/App.jsx
import { useState, useEffect } from 'react';
import CodeEditor from './Components/codeEditor';
import WalletConnect from './Components/walletConnect';
import OutputArea from './Components/OutputArea';
import Arweave from 'arweave';

const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
});

function App() {
  const [code, setCode] = useState(`console.log('Hello World');`);
  const [output, setOutput] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [worker, setWorker] = useState(null);

  useEffect(() => {
    // Initialize the Web Worker
    const codeWorker = new Worker(new URL('./CodeWorker.js', import.meta.url));
    codeWorker.onmessage = (event) => setOutput(event.data);
    setWorker(codeWorker);

    return () => codeWorker.terminate(); // Clean up worker on unmount
  }, []);

  // Save code to Arweave
  const saveCodeToArweave = async () => {
    try {
      const transaction = await arweave.createTransaction({ data: code });
      transaction.addTag('Content-Type', 'text/plain');
      await arweave.transactions.sign(transaction);
      await arweave.transactions.post(transaction);
      setTransactionId(transaction.id);
      alert(`Code saved! Transaction ID: ${transaction.id}`);
    } catch (error) {
      console.error('Error saving to Arweave:', error);
    }
  };

  // Load code from Arweave
  const loadCodeFromArweave = async () => {
    if (!transactionId) {
      alert('Enter a transaction ID to load code');
      return;
    }

    try {
      const response = await arweave.transactions.getData(transactionId, { decode: true, string: true });
      setCode(response);
    } catch (error) {
      console.error('Error retrieving from Arweave:', error);
    }
  };

  // Compile code by sending it to the worker
  const compileCode = () => {
    if (worker) {
      worker.postMessage(code);
    }
  };

  return (
    <div>
      <h1>Arweave Code Editor</h1>
      <WalletConnect />
      <CodeEditor code={code} setCode={setCode} />
      <button onClick={saveCodeToArweave}>Save to Arweave</button>
      <button onClick={loadCodeFromArweave}>Load from Arweave</button>
      <input
        type="text"
        placeholder="Transaction ID"
        value={transactionId}
        onChange={(e) => setTransactionId(e.target.value)}
      />
      <button onClick={compileCode}>Compile</button>
      <OutputArea output={output} />
    </div>
  );
}

export default App;
