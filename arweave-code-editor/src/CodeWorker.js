// src/codeWorker.js

self.onmessage = (event) => {
    try {
      // Capture console.log output
      let consoleOutput = '';
      const consoleBackup = console.log;
      console.log = (message) => { consoleOutput += message + '\n'; };
  
      // Run the code
      const result = eval(event.data); // Caution: eval is used in a controlled worker environment
  
      console.log = consoleBackup; // Restore console
      self.postMessage(consoleOutput || (result !== undefined ? String(result) : 'No output'));
    } catch (error) {
      self.postMessage(`Error: ${error.message}`);
    }
  };
  