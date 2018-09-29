const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');

var app = express();
const port = 1994;
var url = bodyParser.urlencoded({extended:false})
const cors = require('cors');
app.use(cors())

app.set('view engine' , 'ejs');
app.use(url)
app.use(bodyParser.json())

const conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '031998',
    database : 'sakumusic',
    port: 3306
    });

app.get('/newreleases', function(req,res){
    console.log(req.query)
    var sql = `
    SELECT al.id as album_id, ar.name as artist_name, album_art, album_name, artist_id
    FROM albums al
    JOIN artists ar
    ON al.artist_id = ar.id
    ORDER BY release_date DESC LIMIT 8`
    conn.query(sql, (err,results)=>{
        if(err) throw err;
        console.log(results)
        res.send({albums:results});
    })
})

app.get('/artists/:id', function(req,res){
    console.log(req.query)
    var sql = 'SELECT * FROM artists where id=' + req.params.id
    conn.query(sql, (err,results)=>{
        if(err) throw err;
        console.log(results)
        res.send(results);
    })
})

app.get('/albumAndTracks/:id', function(req,res){
    var sql = 'SELECT * FROM albums WHERE id=' + req.params.id
    var sql1 = 'SELECT * FROM tracks WHERE album_id=' + req.params.id
    conn.query(sql, (err,results)=>{
        if(err) throw err;
        console.log(results)
        conn.query(sql1, (err,results1)=>{
            if(err) throw err;
            res.send({album: results, tracks:results1})
        })
    })
})

app.get('/admin', function(req,res){
    console.log(req.query)
    data = req.query
    function tableselect(){
        return(
            {
            albums: ()=> {
                return(
                    sql = `SELECT al.id as album_id, ar.name as artist_name, album_art, album_name, artist_id, release_date, description 
                        FROM albums al JOIN artists ar ON al.artist_id = ar.id ` )
                },
            artists: ()=>{
                return(
                    sql = `SELECT * from artists` )
                },
            genres: ()=>{
                return(
                    sql = `SELECT * from genres` )
                },
            tracks: ()=>{
                return(
                    sql = `SELECT al.album_name as album_name, ar.name as artist_name, tr.id, tr.number, tr.name, playtime, title_track, ranking 
                        FROM tracks tr JOIN albums al ON tr.album_id = al.id JOIN artists ar ON tr.artist_id = ar.id ` )
                },
            }
        )
    }

    var sql1 = `SELECT id, name FROM artists ORDER BY name`
    conn.query(tableselect()[data.table](), (err,results)=>{
        if(err) throw err;
        console.log(results)
        conn.query(sql1, (err,results1)=>{
            if(err) throw err;
            res.send({table: results, listArtists:results1})
        })
    })
})

app.put('/admin/:table/:id', function(req,res){
    var data = req.body
    function tableselect(){
        return(
            {
            albums: ()=> {
                return(
                    sql = `UPDATE albums SET ? WHERE id=${req.params.id}` )
                },
            artists: ()=>{
                return(
                    sql = `SELECT * from artists ` )
                },
            genres: ()=>{
                return(
                    sql = `SELECT * from genres ` )
                },
            tracks: ()=>{
                    return(
                        sql = `SELECT al.album_name, ar.name as artist_name, tr.id, tr.number, tr.name, playtime, title_track, ranking 
                         FROM tracks tr JOIN albums al ON tr.album_id = al.id JOIN artists ar ON tr.artist_id = ar.id ` )
                    },
            }
        )
    }

    conn.query(tableselect()[req.params.table](), data, (err,results)=>{
        if(err) throw err;
        res.send(results)
        console.log(results)
    })
})

app.post('/admin', function(req,res){
    var data = {
        artist_id: req.body.artist_id,
        album_name: req.body.album_name,
        release_date: req.body.release_date,
        album_art: req.body.album_art,
        description: req.body.description
    }
    function tableselect(){
        return(
            {
            albums: ()=> {
                return(
                    sql = `INSERT INTO albums SET ?`  )
                },
            artists: ()=>{
                return(
                    sql = `SELECT * from artists ` )
                },
            genres: ()=>{
                return(
                    sql = `SELECT * from genres ` )
                },
            tracks: ()=>{
                    return(
                        sql = `SELECT al.album_name, ar.name as artist_name, tr.id, tr.number, tr.name, playtime, title_track, ranking 
                         FROM tracks tr JOIN albums al ON tr.album_id = al.id JOIN artists ar ON tr.artist_id = ar.id ` )
                    },
            }
        )
    }

    conn.query(tableselect()[req.body.table](), data, (err,results)=>{
        if(err) throw err;
        res.send(results)
        console.log(results)
    })
})

app.delete('/admin/:table/:id', function(req,res){
    function tableselect(){
        return(
            {
            albums: ()=> {
                return(
                    sql = `DELETE FROM albums WHERE id=${req.params.id}` )
                },
            artists: ()=>{
                return(
                    sql = `DELETE FROM artists WHERE id=${req.params.id}` )
                },
            genres: ()=>{
                return(
                    sql = `DELETE FROM genres WHERE id=${req.params.id}` )
                },
            tracks: ()=>{
                return(
                    sql = `DELETE FROM tracks WHERE id=${req.params.id}` )
                },
            }
        )
    }

    conn.query(tableselect()[req.params.table](), data, (err,results)=>{
        if(err) throw err;
        res.send(results)
        console.log(results)
    })
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`));