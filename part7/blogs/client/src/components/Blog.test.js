import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

test('renders content title&author', () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 0
  }

  const { container } = render(<Blog blog={blog} />);
  const div1 = container.querySelector('.blog-title-author');
  const div2 = container.querySelector('.blog-more-info');

  expect(div1).toBeDefined();
  expect(div2).toBeNull();
})

test('like button clicked 2 times', async () => {

  const incrementLikes = jest.fn();
  const user = userEvent.setup();

  const { container } = render(<Blog blog={blog} incrementLikes={incrementLikes} />);

  const likeButton = container.querySelector('.like-button');

  await user.click(likeButton);
  await user.click(likeButton);

  expect(incrementLikes.mock.calls).toHaveLength(2);
})