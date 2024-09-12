import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Calculator from '../../src/Calculator';
import { calculate } from '../../src/api';

// for behaviour control in tests
jest.mock('../../src/api');

describe('Calculator Component', () => {
  // clear mocks and use fake timers
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  // revert to real timers
  afterEach(() => {
    jest.useRealTimers();
  });

  /**
   * Rnsure the Calculator component renders correctly
   * Checks for the presence of key buttons ('C' and '=') in the DOM
   */
  test('renders the Calculator component', () => {
    render(<Calculator />);
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.getByText('=')).toBeInTheDocument();
  });

  /**
   * Verify the basic number input functionality
   */
  test('adds numbers when clicked', () => {
    render(<Calculator />);
    userEvent.click(screen.getByText('1'));
    userEvent.click(screen.getByText('2'));
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  /**
   * Verify the addition operation
   */
  test('performs addition operation', async () => {
    calculate.mockResolvedValue(7);
    render(<Calculator />);

    userEvent.click(screen.getByText('3'));
    userEvent.click(screen.getByText('+'));
    userEvent.click(screen.getByText('4'));
    userEvent.click(screen.getByText('='));

    jest.runAllTimers();

    await waitFor(() => {
      expect(screen.getByText('7')).toBeInTheDocument();
    });

    expect(calculate).toHaveBeenCalledWith('+', 3, 4);
  });

  /**
   * Ensures that the display is empty after clicking on the 'C' button
   */
  test('clears the display when C is clicked', async () => {
    render(<Calculator />);
    userEvent.click(screen.getByText('5'));
    userEvent.click(screen.getByText('C'));

    await waitFor(() => {
      expect(screen.getByTestId('screen')).not.toHaveTextContent('5');
    });
  });

  /**
   * Verify that the square root special operation is performed correctly
   */
  test('performs a special operation (square root)', async () => {
    calculate.mockResolvedValue(2);
    render(<Calculator />);

    userEvent.click(screen.getByText('4'));
    userEvent.click(screen.getByText('√'));

    jest.runAllTimers();

    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument();
    });

    expect(calculate).toHaveBeenCalledWith('root', 4);
  });

  /**
   * Verify that the history updates after a calculation
   */
  test('updates the history after a calculation', async () => {
    calculate.mockResolvedValue(5);
    render(<Calculator />);

    userEvent.click(screen.getByText('2'));
    userEvent.click(screen.getByText('+'));
    userEvent.click(screen.getByText('3'));
    userEvent.click(screen.getByText('='));

    jest.runAllTimers();

    await waitFor(() => {
      expect(screen.getByText('2 + 3 = 5')).toBeInTheDocument();
    });
  });
});
