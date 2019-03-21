const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const pool = require('./pool');

// GET
router.get('/', (req, res) => {

   pool.query(`SELECT * FROM "koala" ORDER BY "age" ASC;`)
      .then((result) => {
         res.send(result.rows);
      }).catch((error) => {
         console.log('DANGER in GET', error);
         res.sendStatus(500);
      });
});

// POST
router.post('/', (req, res) => {
   let koala = req.body();
   console.log(`adding koala`, koala);
   let sqlText = `INSERT INTO "koala" ("name", "age", "gender", "readyToTransfer", "notes")
   VALUES ($1, $2, $3, $4, $5);`;

   pool.query(sqlText, (koala.name, koala.age, koala.gender, koala.readyToTransfer, koala.notes))
      .then((response) => {
         res.sendStatus(201);
      }).catch((error) => {
         console.log('Failed to POST', error);
         res.sendStatus(500);
      });
});

// PUT

// DELETE

module.exports = koalaRouter;
