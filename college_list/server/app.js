const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));


// read
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
    
})

// search
app.get('/search', (request, response) => {
    const { name, column } = request.query; // Get both name and column from query parameters
    const db = dbService.getDbServiceInstance();

    if (!name || !column) {
        return response.status(400).json({ error: 'Both name and column are required' });
    }

    console.log(`Received search request - Name: ${name}, Column: ${column}`); // Debug logging

    const result = db.searchByNameAndColumn(name, column);
    
    result
        .then(data => response.json({ data: data }))
        .catch(err => {
            console.error('Error in /search endpoint:', err); // Debug logging
            response.status(500).json({ error: 'Internal Server Error' });
        });
});





app.listen(process.env.PORT, () => console.log('app is running'));