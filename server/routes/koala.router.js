const express = require('express');
const router = express.Router();

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
   let koala = req.body;
   console.log(`adding koala`, koala);
   let sqlText = `INSERT INTO "koala" ("name", "age", "gender", "transfer", "notes")
   VALUES ($1, $2, $3, $4, $5);`;

   pool.query(sqlText, [koala.name, koala.age, koala.gender, koala.transfer, koala.notes])
      .then((response) => {
         res.sendStatus(201);
      }).catch((error) => {
         console.log('Failed to POST', error);
         res.sendStatus(500);
      });
});

// PUT
router.put('/:id', (req, res) => {

   let koalaID = req.params.id;
   let koalaData = req.body;
   console.log(`Updating koala id: ${koalaID} with data`, koalaData);

   // hard update koala.readyToTransfer to 'true'
   let sqlText = `UPDATE "koala" SET "transfer" = 'true' WHERE "id" = $1;`;

   pool.query(sqlText, [koalaID])
      .then((result) => {
         res.sendStatus(200);
      }).catch((error) => {
         console.log('Failed to PUT', error);
         res.sendStatus(500);
      });
})

// DELETE

module.exports = router;
