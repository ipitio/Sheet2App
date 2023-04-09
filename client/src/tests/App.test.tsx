import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom/extend-expect';

test('renders auth google link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Sign into S2A with Google/i);
  expect(linkElement).toBeInTheDocument();
});
