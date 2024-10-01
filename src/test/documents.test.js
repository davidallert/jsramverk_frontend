import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import GetDocuments from '../pages/Documents';

// test('renders ', () => {
//   const { container } = render(<App />);

//   expect(screen.getByText(/folinodocs/i)).toBeInTheDocument();
// });
// test('renders debugging', () => {
//   render(<GetDocuments/>);
//   screen.debug();
// });

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
    // const labelElement = await screen.findByText('Document 1');
    const labelElement = await waitFor(() => screen.getByText(/"Document 1"/i));
    expect(labelElement).toBeInTheDocument();
    // await waitFor(() => {
    //   expect(screen.getByText(/'Document 1'/i)).toBeInTheDocument();
    // }, { timeout: 3000 }); // 3 seconds
});
