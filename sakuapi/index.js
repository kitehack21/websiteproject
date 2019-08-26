const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const crypto = require('crypto')
const moment = require('moment');

const app = express();
const port = 1994;
const url = bodyParser.urlencoded({extended:false})
const cors = require('cors');
app.use(cors())

app.use(express.static('public'))
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

app.get('/genres' , function(req,res){
    var sql = "SELECT * FROM genres"
    conn.query(sql, (err,results)=>{
        if(err) throw err;
        console.log(results)
        res.send({genres:results});
    })
})
app.get('/topsongs', function(req,res){
    console.log(req.query)
    var sql = `select tr.id as id, tr.name as track_name, tr.ranking as ranking, al.id as album_id, al.album_name as album_name, al.album_art as album_art, ar.id as artist_id, ar.name as artist_name from tracks tr JOIN albums al ON tr.album_id = al.id JOIN artists ar ON tr.artist_id = ar.id ORDER BY -ranking DESC LIMIT 6`
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
    var sql1 = `SELECT * FROM albums WHERE artist_id=${req.params.id} ORDER BY release_date DESC`
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
    var sql2 = `SELECT g.id, g.name FROM genres g JOIN album_genres alg ON g.id=alg.genre_id JOIN albums al ON alg.album_id = al.id where al.id = ${req.params.id}`
    conn.query(sql, (err,results)=>{
        if(err) throw err;
        console.log(results)
        conn.query(sql1, (err,results1)=>{
            if(err) throw err;
            conn.query(sql2, (err, results2) => {
                if(err) throw err
                res.send({album: results, tracks:results1, genres: results2})
            })
        })
    })
})

app.get('/albums/browse', function(req,res){
    if(req.query.genre == null){
        var sql = `SELECT al.id as album_id, ar.name as artist_name, album_art, album_name, release_date, al.artist_id, count(tr.album_id) as tracksAmount
                    FROM albums al
                    JOIN artists ar
                    ON al.artist_id = ar.id
                    LEFT JOIN tracks tr
                    ON al.id = tr.album_id
                    GROUP BY tr.album_id
                    ORDER BY release_date DESC`
    }
    else{
        var sql = `SELECT al.id as album_id, ar.name as artist_name, album_art, album_name, release_date, al.artist_id, count(tr.album_id) as tracksAmount
        FROM albums al
        JOIN artists ar
        ON al.artist_id = ar.id
        LEFT JOIN tracks tr
        ON al.id = tr.album_id
        JOIN album_genres ag
        ON ag.album_id = al.id
        WHERE ag.genre_id = '${req.query.genre}'
        GROUP BY tr.album_id
        ORDER BY release_date DESC`
    }
    conn.query(sql, (err,results)=>{
        if(err) throw err;
        console.log(results)
        res.send({albums:results})
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

app.get("/suggestions", function(req,res){
    sql = `SELECT al.id as id, artist_id, album_name, album_art FROM albums al join album_genres alg ON al.id = alg.album_id WHERE alg.genre_id = 1 `
    conn.query(sql, (err,results)=>{
        if(err) throw err
        res.send(results)
    })
})

app.post(`/albumgenres`, function(req,res){
    var values = []
    for(var index in req.body.genres){
        values.push([req.body.album_id, req.body.genres[index].value])
    }
    sql1 = `INSERT INTO album_genres (album_id, genre_id) VALUES ?`
    conn.query(sql1, [values], (err1,results1)=>{
        if(err1) throw err1
        res.send(results1)
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

const secret = "미야와키사쿠라宮脇"

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

    sql = `SELECT * FROM subscriptions WHERE user_id = ${data.user_id} and status = "active"`
    sql1= 'INSERT INTO subscriptions SET ? '
    conn.query(sql, (err,results)=>{
        if(err) throw err
        console.log(results.length)
        if(results.length !== 0){
            res.send({error : 1})
        }
        else{
            conn.query(sql1, data, (err1,results1)=>{
                if(err1) throw err1
                console.log(results1)
                res.send(results1)
            })
        }
    })
})

app.get("/substatus/:id", function(req,res){
    sql = `SELECT sb.id as id, user_id, streampass_id, start_date, end_date, status, name, price FROM subscriptions sb JOIN streamingpass sp ON sb.streampass_id = sp.id WHERE user_id = ${req.params.id} ORDER BY start_date DESC, status`
    conn.query(sql, (err1,results1)=>{
        if(err1) throw err1
        console.log(results1)
        res.send(results1)
    })
})

app.put("/subcancel/:id", function(req,res){
    sql = `UPDATE subscriptions SET status="inactive" where id=${req.params.id} and status = "active"`
    conn.query(sql, (err1,results1)=>{
        if(err1) throw err1
        console.log(results1)
        res.send(results1)
    })
})


// app.post('/upload', function(req, res) {
//     if(req)
// })

app.get('/addPlaylist/:id', function(req,res){

    sql = `SELECT tr.id as track_id, tr.playtime as playtime, tr.name as track_name, tr.source as source, ar.name as artist_name, al.album_name as album_name, al.album_art as album_art FROM tracks tr JOIN artists ar ON tr.artist_id = ar.id JOIN albums al ON tr.album_id = al.id WHERE tr.id=${req.params.id}`

    conn.query(sql, (err, results)=>{
        if(err) throw err;
        res.send(results)
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));