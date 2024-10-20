import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/index.css';
import auth from '../models/auth';

const GetDocuments = () => {
  const [documentList, setDocumentList] = useState([]);
  const [message, setMessage] = useState("");

  const fetchDocuments = async () => {
    try {
      // For deployment: https://jsramverk-editor-daae23-cucfhygme0ete5ea.swedencentral-01.azurewebsites.net/documents
      // For testing: http://localhost:1337/documents
      const response = await fetch('https://jsramverk-editor-daae23-cucfhygme0ete5ea.swedencentral-01.azurewebsites.net/documents', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': auth.token,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const data = await response.json();
      // console.log(data.data.res[0].title);
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  useEffect(() => {
    const dataFetchingEffect = async () => {
      const result = await fetchDocuments();
      // If there is an error when verifying the token.
      if (result.name) {
        setMessage(`${result.name}: ${result.message}`)
        return;
      }
      console.log('Result:', result);
      const documentArray = result.data.res;
      const list = documentArray.map(document =>
          <div key={document._id}>
            <h2>
              <Link to={`/document/${document._id}`}>
                {document.title}
              </Link>
            </h2>
            <p>{document.content}</p>
            <p><i>{document._id}</i></p>
          </div>
      )
      setDocumentList(list);
    };

    dataFetchingEffect();
  }, []);

    return (
      <div className='width-half center'>
        <h1>Fetched Data</h1>
        {documentList}
        {message}
      </div>
    );
}

export default GetDocuments;
