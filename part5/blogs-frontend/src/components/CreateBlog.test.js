import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateBlog from './CreateBlog';
import userEvent from '@testing-library/user-event';

test('<CreateBlog /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<CreateBlog createNote={createBlog} />)

  const input = screen.getByRole('textbox')
  const sendButton = screen.getByText('Create')

  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})