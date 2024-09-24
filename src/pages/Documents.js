import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/index.css';

const GetDocuments = () => {
  const [documentList, setDocumentList] = useState([]);

  const fetchDocuments = async () => {
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
      </div>
    );
}

export default GetDocuments;
