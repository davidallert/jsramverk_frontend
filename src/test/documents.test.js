import { render, screen, waitFor, act } from '@testing-library/react';
import App from '../App';
import GetDocuments from '../pages/Documents';
import GetDocument from '../pages/Document';
import { MemoryRouter, Route, Routes } from 'react-router-dom';


test('renders title ', () => {
    render(<GetDocuments/>);
    const labelElement = screen.getByText("Fetched Data");
    expect(labelElement).toBeInTheDocument();
});

test('renders title label ', async () => {
  // await GetDocuments();
  render(<GetDocuments/>);
  // const labelElement = screen.ByText("Document 1");
  // expect(labelElement).toBeInTheDocument();

  // await waitFor(() => expect(screen.getByText("Document 1")).toBeInTheDocument());
    // const labelElement = await screen.findByText(/'Document 1'/i);

    // const labelElement = waitFor(() => screen.getByText(/"this is the first document."/i));
    
    // expect(labelElement).toBeInTheDocument();
    console.log(screen.debug()); // Debug DOM:en

    // Förväntar att texten "this is the first document." ska dyka upp i DOM:en
    const labelElement = await screen.findByText(/this is the first document./i);
    expect(labelElement).toBeInTheDocument();

});


test('renders document content correctly', async () => {
  render(
    <MemoryRouter initialEntries={['/document/66e6fce08939d00d5d5d578d']}>
      <Routes>
        <Route path="/document/:id" element={<GetDocument />} />
      </Routes>
    </MemoryRouter>
  );


  const loadingElements = screen.getAllByDisplayValue('Loading...');
  expect(loadingElements).toHaveLength(2);

  expect(loadingElements[0]).toHaveAttribute('name', 'title');
  expect(loadingElements[1]).toHaveAttribute('name', 'content');
});