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
app.get('/search', async (req, res) => {
    const name = req.query.name;
    const column = req.query.column;

    if (!name || !column) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    try {
        const dbService = DbService.getDbServiceInstance();
        const data = await dbService.searchByNameAndColumn(name, column);
        console.log('Data fetched from DB:', data); // Debug logging
        res.json({ data });
    } catch (error) {
        console.error('Error handling search request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});





app.listen(process.env.PORT, () => console.log('app is running'));