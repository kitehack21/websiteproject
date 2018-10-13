const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
const crypto = require('crypto')
const moment = require('moment');

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

app.get('/topsongs', function(req,res){
    console.log(req.query)
    var sql = `select tr.id as id, tr.name as track_name, tr.ranking as ranking, al.album_name as album_name, al.album_art as album_art, ar.name as artist_name from tracks tr JOIN albums al ON tr.album_id = al.id JOIN artists ar ON tr.artist_id = ar.id ORDER BY -ranking DESC LIMIT 6`
    conn.query(sql, (err,results)=>{
        if(err) throw err;
        console.log(results)
        res.send({albums:results});
    })
})

app.get('/artists/:id', function(req,res){
    var sql = 'SELECT * FROM artists where id=' + req.params.id
    conn.query(sql, (err,results)=>{
        if(err) throw err;
        console.log(results)
        res.send(results);
    })
})

app.get('/artistinfo/:id', function(req,res){
    var sql = `SELECT * FROM artists WHERE id=${req.params.id}`
    var sql1 = `SELECT * FROM albums WHERE artist_id=${req.params.id}`
    var sql2 = `SELECT tr.id as track_id, album_id, tr.artist_id as artist_id, number, tr.name as track_name, playtime, 
                ranking, al.album_name as album_name, release_date, title_track FROM tracks tr LEFT JOIN albums al
                ON al.id = tr.album_id WHERE tr.artist_id=1 ORDER BY release_date DESC`
    conn.query(sql, (err,results)=>{
        if(err) throw err;
        conn.query(sql1, (err,results1)=>{
            if(err) throw err;
            conn.query(sql2,(err,results2)=>{
                if(err) throw err;
                res.send({artist: results, albums: results1, tracks:results2});
            })
        })
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
    var sql2 = `SELECT id, album_name FROM albums ORDER BY album_name`
    conn.query(tableselect()[data.table](), (err,results)=>{
        if(err) throw err;
        console.log(results)
        conn.query(sql1, (err1,results1)=>{
            if(err1) throw err1;
            conn.query(sql2, (err2,results2)=>{
                if(err2) throw err2;
                res.send({table: results, listArtists:results1, listAlbums:results2})
            })
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
                    sql = `UPDATE albums SET ? WHERE id=${req.params.id}`)
                },
            artists: ()=>{
                return(
                    sql = `UPDATE artists SET ? WHERE id=${req.params.id}`)
                },
            genres: ()=>{
                return(
                    sql = `UPDATE genres SET ? WHERE id=${req.params.id}`)
                },
            tracks: ()=>{
                return(
                    sql = `UPDATE tracks SET ? WHERE id=${req.params.id}`)
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

app.post('/admin/:table', function(req,res){
    var data = req.body
    function tableselect(){
        return(
            {
            albums: ()=> {
                return(
                    sql = `INSERT INTO albums SET ?`  )
                },
            artists: ()=>{
                return(
                    sql = `INSERT INTO artists SET ?` )
                },
            genres: ()=>{
                return(
                    sql = `INSERT INTO genres SET ?` )
                },
            tracks: ()=>{
                return(
                    sql = `INSERT INTO tracks SET ?` )
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

var secret = "미야와키사쿠라宮脇"

app.get('/users', function(req,res){
    const cipher = crypto.createHmac("sha256", secret)
    .update(req.query.password)
    .digest("hex");

    sql = `SELECT id, username, email FROM users WHERE email = "${req.query.email}" AND password = "${cipher}"`
    conn.query(sql, (err,results)=>{
        if(err) throw err;
        console.log(results[0])
        sql1=`SELECT * FROM subscriptions WHERE user_id=${results[0].id} AND status = "active" ORDER BY end_date DESC`
        conn.query(sql1, (err1,results1)=>{
            if(err1) throw err1;
            console.log(results1[0])
            if(results1.length === 0){
                res.send({user:results[0], subscription: {...results1[0], status:"inactive"}})
            }
            else{
                if(results1[0].end_date > moment().format("YYYY/MM/DD")){
                    res.send({user:results[0], subscription: results1[0]})
                }
                else{
                    sql2=`UPDATE subscriptions SET ? WHERE user_id=${results[0].id} and start_date="${results1[0].start_date}"`
                    conn.query(sql2, {status:"inactive"}, (err2, results2)=>{
                        if (err2) throw err2
                        console.log(results2)
                        res.send({user:results[0], subscription: {...results1[0], status:"inactive"}})
                    })           
                }
            }        
        })
    })
})

app.get('/keeplogin', function(req,res){
    sql = `SELECT id, username, email FROM users WHERE email = "${req.query.email}"`
    conn.query(sql, (err,results)=>{
        console.log(results)
        sql1=`SELECT * FROM subscriptions WHERE user_id=${results[0].id} AND status = "active" ORDER BY end_date DESC`
        conn.query(sql1, (err1,results1)=>{
            if(err1) throw err1;
            console.log(results1[0])
            if(results1.length === 0){
                res.send({user:results[0], subscription: {...results1[0], status:"inactive"}})
            }
            else{
                if(results1[0].end_date > moment().format("YYYY/MM/DD")){
                    res.send({user:results[0], subscription: results1[0]})
                }
                else{
                    sql2=`UPDATE subscriptions SET ? WHERE user_id=${results[0].id} and start_date="${results1[0].start_date}"`
                    conn.query(sql2, {status:"inactive"}, (err2, results2)=>{
                        if (err2) throw err2
                        console.log(results2)
                        res.send({user:results[0], subscription: {...results1[0], status:"inactive"}})
                    })           
                }
            }        
        })
    })
})

app.post('/users', function(req,res){
    const cipher = crypto.createHmac("sha256", secret)
    .update(req.body.password)
    .digest("hex");

    var data = {
        username : req.body.username,
        email : req.body.email,
        password : cipher
    }

    sql = `SELECT * FROM users WHERE username = '${data.username}' OR email = '${data.email}'`
    sql1 = `INSERT INTO users SET ?`
    conn.query(sql, (err,results)=>{
        console.log(results.length)
        if(results.length == 0){
            conn.query(sql1, data, (err1,results1)=>{
                if(err1) throw err1;
                console.log(results1)
                res.send({username: req.body.username, email: req.body.email, id: results1.insertId, error:0})
            })
        }
        else{
            res.send({error:1})
        }
    })
})

app.post('/subscribe', function(req,res){
    var startDate = moment().format("YYYY/MM/DD")
    var endDate = moment().add(30,'d').format("YYYY/MM/DD")
    console.log(startDate)
    console.log(endDate)
    console.log(req.body.user_id)
    var data={
        user_id : req.body.user_id,
        streampass_id : req.body.streampass_id,
        start_date : startDate,
        end_date : endDate,
        status : "active"
    }

    sql= 'INSERT INTO subscriptions SET ? '
    conn.query(sql, data, (err,results)=>{
        if(err) throw err
        console.log(results)
        res.send(results)
    })
})

// app.post('/upload', function(req, res) {
//     if(req)
// })

app.get('/test', function(req,res){
    const cipher = crypto.createHmac("sha256", secret)
    .update(req.query.password)
    .digest("hex");
    console.log(cipher)
    sql = `SELECT id, username, email FROM users WHERE email = "${req.query.email}" AND password = "${cipher}"`
    conn.query(sql, (err,results)=>{
        if(err) throw err;
        console.log(results)
        sql1=`SELECT * FROM subscriptions WHERE user_id=${results[0].id} AND status = "active" ORDER BY end_date DESC`
        conn.query(sql1, (err1,results1)=>{
            if(err1) throw err1;
            console.log(results1)
            if(results1[0].end_date > moment().format("YYYY/MM/DD")){
                res.send({user:results, subscription: results1[0]})
            }
            else{
                sql2=`UPDATE `
                res.send({user:results, subscription: {...results1[0], status:"inactive"}})
            }
            
        })
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));