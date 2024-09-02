const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('db ' + connection.state);
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM `exams`;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            //console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }


    async searchByNameAndColumn(name, column) {
        try {
            // List of allowed column names
            const allowedColumns = [
                'college_Name', 'Exam_name', 'Exam_Logo', 'Description ', 'Description_img ', 
                'Eligibility', 'Eligibility_img', 'Registration', 'Registration_img', 'Syllabus', 'Syllabus_img'
            ];
        
            console.log(`Received column name: ${column}`); // Debug logging
            if (!allowedColumns.includes(column)) {
                console.error('Invalid column name:', column); // Debug logging
                throw new Error('Invalid column name');
            }
        
            const response = await new Promise((resolve, reject) => {
                // Use parameterized query to prevent SQL injection
                const query = `SELECT * FROM exams WHERE ?? LIKE ?;`;
                const formattedName = `%${name}%`; // Format the name for the LIKE query
        
                connection.query(query, [column, formattedName], (err, results) => {
                    if (err) {
                        console.error('Database query error:', err); // Debug logging
                        reject(new Error(err.message));
                    } else {
                        resolve(results);
                    }
                });
            });
        
            return response;
        } catch (error) {
            console.error('Error in searchByNameAndColumn:', error); // Debug logging
            throw error; // Rethrow error to be caught in app.js
        }
    }
    
}


module.exports = DbService;
