var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler')
const db_pool = require('../db/mysql-pool').dbpool;

router.get('/pallete', asyncHandler( async (req, res, next) => {
    const type = req.query.type;
    let sql = `SELECT * FROM pallete_info`;

    if( type == 'popular') {
        sql = `SELECT * FROM pallete_info t order BY t.like DESC`;
    } else if( type == 'random') {
        sql = `SELECT * FROM pallete_info t order BY RAND()`;
    } else if( type == 'collection') {

    } else if( type == 'tag') {
        const tag_id = req.query.tag_id;
        var count = tag_id.split(',').length;
        sql = `SELECT P.id, P.like, P.c0, P.c1, P.c2, P.c3 
                FROM pallete_info P 
                JOIN 
                (
                    SELECT P.id 
                    FROM pallete_info P 
                    JOIN pallete_tag_set TS ON P.id = TS.pallete_id
                    WHERE TS.tag_id IN ( ${tag_id} )
                    GROUP BY P.id
                    HAVING COUNT(*)>= ${count}
                ) AS T1
                ON P.id = T1.id
                `;
    } else {    //new
        
    }

    console.log(sql);
    const result = await db_pool.query(sql)
    console.log(result[0]);
    res.json(result[0])
}));

router.post('/like', asyncHandler( async (req, res, next) => {
    let pallete_id = req.body.params.pallete_id;
    let sql = `UPDATE pallete_info P SET P.like = P.like +1 where P.id = ${pallete_id}`;

    const result = await db_pool.query(sql)
    res.json(result[0])
}));

router.get('/taglist', asyncHandler( async (req, res, next) => {
    let sql = `SELECT id AS 'tag_id', tag_name , type 
                FROM tag_info T 
                WHERE T.type = '${req.query.type}' 
                ORDER BY T.order`;
    const result = await db_pool.query(sql)
    res.json(result[0])
}));

router.get('/pallete-tag-info', asyncHandler( async (req, res, next) => {
    let sql = `SELECT T.id AS tag_id, T.tag_name, T.type
                FROM pallete_tag_set PT 
                JOIN tag_info T ON PT.tag_id = T.id
                WHERE PT.pallete_id = ${req.query.pallete_id}`;
    const result = await db_pool.query(sql)
    res.json(result[0])
}));

module.exports = router;
