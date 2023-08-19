import React from 'react'
import { Line } from 'react-chartjs-2'

// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto'

const LineChart = ({ data, yLabels }) => {
    const options = {
        maintainAspectRatio: false,
        responsive: false,
        scales: {
           y:
            {
               min: 0,
               max: 8,
               stepSize: 1,
               ticks: {
                    min: 0,
                    max: 8,
                    stepSize: 1,
                   callback: function (label, index, labels) {
                       if (!yLabels[label]) return '';
                        return yLabels[label];
                    }
                },
            },
            x:
            {
                min: 0,
                stepSize: 1,
            },
        },
    };
    return (
        <Line data={data} options={options} width={23 * data?.labels?.length} height={250}/>
    )
}

export default LineChart
