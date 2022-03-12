const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'kj6Qh$gda',
      database: 'business'
    },
    console.log('Connected to the business database.')
  );

  // Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });

// GET a single department
// db.query(`SELECT * FROM department WHERE id = 7`, (err, row) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(row);
// });

// Delete a department
// db.query(`DELETE FROM department WHERE id = ?`, 1, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result);
//   });

// Create a department 
// const sql = `INSERT INTO department (id, name) VALUES (?, ?)`;
// const params = [1, 'Accounting'];
// db.query(sql, params, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });