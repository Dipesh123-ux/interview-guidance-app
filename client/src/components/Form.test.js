// Form.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Form from './Form';

// Mocking the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ result: 'Mocked result' }),
  })
);

describe('Form component', () => {
  test('renders Form component', () => {
    render(<Form />);
    expect(screen.getByText('GET THE BEST')).toBeInTheDocument();
    expect(screen.getByText('INTERVIEW GUIDANCE')).toBeInTheDocument();
    expect(screen.getByText('HERE!')).toBeInTheDocument();
  });

  test('handles button click', async () => {
    render(<Form />);
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Please Enter a role')).toBeInTheDocument();

    // Mocking user input
    fireEvent.change(screen.getByLabelText('Role'), { target: { value: 'Developer' } });
    fireEvent.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(screen.getByText('Please Enter the industry')).toBeInTheDocument();
    });

    // Mocking user input
    fireEvent.change(screen.getByLabelText('Industry'), { target: { value: 'IT' } });
    fireEvent.click(screen.getByText('Generate'));

    // Wait for fetch to complete
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    // Verify that the result is displayed
    expect(screen.getByText('Mocked result')).toBeInTheDocument();
  });
});
