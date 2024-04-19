import React, { useState } from 'react';
import axios from 'axios';
import { ResponsiveBar } from '@nivo/bar';

function UploadCSV() {
    const [chartData, setChartData] = useState([]);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) {
            setUploadStatus('Please select a file to upload.');
            return;
        }
        uploadFile(file);
    };

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        setUploadStatus('Uploading...');
        
        try {
            const response = await axios.post('http://localhost:8080/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            handleResponse(response);
        } catch (error) {
            handleError(error);
        }
    };

    const handleResponse = (response) => {
        if (response.status === 200) {
            processData(response.data);
            setUploadStatus('Upload successful.');
        } else {
            setUploadStatus('No data in file or file format is incorrect.');
        }
    };

    const processData = (data) => {
        const categoryCounts = data.reduce((acc, curr) => {
            const category = curr['Email Type']; // Adjust the key based on your actual data
            acc[category] = (acc[category] || 0) + 1;
            return acc;
        }, {});

        const formattedChartData = Object.keys(categoryCounts).map(key => ({
            "Category": key,
            "Count": categoryCounts[key]
        }));

        setChartData(formattedChartData);
    };

    const handleError = (error) => {
        console.error('Error uploading file:', error);
        if (error.response) {
            setUploadStatus(`Failed to upload file. Server responded with ${error.response.status}: ${JSON.stringify(error.response.data)}`);
        } else {
            setUploadStatus('Failed to upload file. Error: ' + error.message);
        }
    };

    return (
        <div style={{ height: 500, width: '100%' }}>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            {uploadStatus && <p>{uploadStatus}</p>}
            <div style={{ height: 400, width: '100%', marginTop: 20 }}>
                <ResponsiveBar
                    data={chartData}
                    keys={['Count']}
                    indexBy="Category"
                    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                    padding={0.3}
                    valueScale={{ type: 'linear' }}
                    indexScale={{ type: 'band', round: true }}
                    colors={{ scheme: 'nivo' }}
                    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Category',
                        legendPosition: 'middle',
                        legendOffset: 32
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Count',
                        legendPosition: 'middle',
                        legendOffset: -40
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                    legends={[
                        {
                            dataFrom: 'keys',
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 120,
                            translateY: 0,
                            itemsSpacing: 2,
                            itemWidth: 100,
                            itemHeight: 20,
                            itemDirection: 'left-to-right',
                            itemOpacity: 0.85,
                            symbolSize: 20,
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                />
            </div>
        </div>
        );
    }
    
    export default UploadCSV;