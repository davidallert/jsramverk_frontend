import { render, screen, waitFor, act } from '@testing-library/react';
import GetDocument from '../pages/Document';
import userEvent from '@testing-library/user-event'

test("title variable gets value when text is entered", async () => {
    render(<GetDocument />);
    await act(async () => {
        const user = userEvent.setup();
        const titleInput = screen.getByLabelText("Title");
        await user.clear(titleInput)
        await user.type(titleInput, 'Document');
        expect(titleInput).toHaveValue('Document');
    })
});

test("content variable gets value when text is entered", async () => {
    render(<GetDocument />);
    await act(async () => {
        const user = userEvent.setup();
        const contentInput = screen.getByLabelText("Content");
        await user.clear(contentInput)
        await user.type(contentInput, 'Document content');
        expect(contentInput).toHaveValue('Document content');
    })
});