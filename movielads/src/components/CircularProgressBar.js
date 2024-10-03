import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const CircularProgressBar = ({ value }) => {

    const getProgressBarColor = (value) => {
        if (value >= 80) return 'green';
        if (value >= 60) return 'lightgreen';
        if (value >= 40) return 'yellow';
        if (value >= 20) return 'orange';
        return 'red';
    };

    const color = getProgressBarColor(value);



    return (
        <div style={{ width: '80px', height: '80px' }}>
            <CircularProgressbar
                value={value}
                text={`${value.toFixed(1)}%`}
                background
                backgroundPadding={6}
                styles={buildStyles({
                backgroundColor: 'darkgray',
                textColor: "black",
                pathColor: color,
                trailColor: "transparent"
                })}
            />
        </div>
    );
};

export default CircularProgressBar;
