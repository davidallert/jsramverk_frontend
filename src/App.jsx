import React, { useState, useEffect } from 'react';

async function getDocuments() {
  try {
    const response = await fetch('https://jsramverk-editor-daae23-cucfhygme0ete5ea.swedencentral-01.azurewebsites.net/documents', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json(); // Resolves the promise
    // console.log(data.data.res[0].title);
    return data; // Return the data (not a promise)
  } catch (error) {
    console.error(error);
    return null; // Handle error by returning null or an appropriate default value
  }
}

function App() {
  const [data, setData] = useState();
  const [moreData, setMoredata] = useState();

  useEffect(() => {
    async function fetchData() {
      const result = await getDocuments();
      if (result && result.data && result.data.res) {
        setData(result.data.res);
        const list = [];
        for (let doc of result.data.res) {
          list.push(`${doc.title} ${doc.content} `)
        }
        setMoredata(list)
        // console.log(list[0]);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Fetched Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <div>{moreData}</div>
    </div>
  );
}

export default App;



// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }