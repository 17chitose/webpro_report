"use strict";

const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: true }));

let nazokake_naiyo = [
  { name:"東京駅", kakeru:"総武本線，中央線，etc", toku:"403831", kokoro:"0" },
  { name:"東京駅", kakeru:"総武本線，中央線，etc", toku:"403831", kokoro:"0" },
  { name:"東京駅", kakeru:"総武本線，中央線，etc", toku:"403831", kokoro:"0" },
  { name:"東京駅", kakeru:"総武本線，中央線，etc", toku:"403831", kokoro:"0" },
  { name:"東京駅", kakeru:"総武本線，中央線，etc", toku:"403831", kokoro:"0" },
];

app.get("/", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('nazokake', {data: nazokake_naiyo} );
});

// Create
app.get("/create", (req, res) => {
  res.redirect('/public/nazokake_new.html');
});

app.get("/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = nazokake_naiyo[ number ];
  res.render('nazokake_detail', {id: number, data: detail} );
});

// Delete
app.get("/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  nazokake_naiyo.splice( req.params.number, 1 );
  res.redirect('/' );
});

// Create
app.post("/", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const name = req.body.name;
  const kakeru = req.body.kakeru;
  const toku = req.body.toku;
  const kokoro = req.body.kokoro;
  nazokake_naiyo.push( { name: name, kakeru: kakeru, toku: toku, kokoro: kokoro } );
  console.log( nazokake_naiyo );
  res.render('nazokake', {data: nazokake_naiyo} );
});

// Edit
app.get("/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = nazokake_naiyo[ number ];
  res.render('nazokake_edit', {id: number, data: detail} );
});

// Update
app.post("/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  nazokake_naiyo[req.params.number].name = req.body.name;
  nazokake_naiyo[req.params.number].kakeru = req.body.kakeru;
  nazokake_naiyo[req.params.number].toku = req.body.toku;
  nazokake_naiyo[req.params.number].kokoro = req.body.kokoro;
  console.log( nazokake_naiyo );
  res.redirect('/' );
});


app.listen(8080, () => console.log("Example app listening on port 8080!"));