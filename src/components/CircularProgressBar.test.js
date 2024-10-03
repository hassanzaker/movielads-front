import React from 'react';
import { render } from '@testing-library/react';
import CircularProgressBar from './CircularProgressBar';
import 'react-circular-progressbar/dist/styles.css';

describe('CircularProgressBar', () => {
    it('renders the circular progress bar with the correct color based on the value', () => {
        const { getByText } = render(<CircularProgressBar value={85} />);
        const progressBarText = getByText('85.0%');
        
        // Asserts text content
        expect(progressBarText).toBeInTheDocument();
        
        // This checks for inline styles but might need to be adjusted based on your specific setup
        const progressBar = progressBarText.parentElement; // Assuming the text node's parent is the progress bar
        expect(progressBar).toHaveStyle(`pathColor: green`);
    });

    // Add more tests here for other value ranges
    it('displays red when value is below 20', () => {
        const { getByText } = render(<CircularProgressBar value={10} />);
        const progressBar = getByText('10.0%').parentElement;
        expect(progressBar).toHaveStyle(`pathColor: red`);
    });
});
