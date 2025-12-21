"use strict";

const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: true }));

let nazokake_naiyo = [
  { name:"埼玉県", kakeru:"埼玉県", toku:"中学時代に書いたポエム", kokoro:"どちらも，海無いで（う，見ないで）" },
  { name:"蚊取り線香", kakeru:"蚊取り線香", toku:"いい匂いの雑巾で牛乳を拭いた", kokoro:"どちらも，蚊が亡くなる（嗅がなくなる）でしょう" },
  { name:"ヒロイン", kakeru:"主人公の男の子が脇役の女の子といい感じ", toku:"大きな畑に種をまこう", kokoro:"どちらも，ヒロインですが負けました（広いんですが負けました）" },
  { name:"アキラ100%", kakeru:"メガネを掛けたアキラ100%", toku:"振られても何度もアタックする人", kokoro:"どちらも，アキラ目が悪い（諦めが悪い）でしょう" },
  { name:"なぞかけ", kakeru:"なぞかけ", toku:"サウナ", kokoro:"どちらも，ととのうでしょう" },
  { name:"シャーペン", kakeru:"シャーペン", toku:"成金が言いそうなセリフ", kokoro:"どちらも，折れやすいもの（俺安いもの）はダメなんだよね" },
  { name:"おにぎり", kakeru:"おにぎり", toku:"賑わっている居酒屋", kokoro:"どちらも，鮭が梅と（酒がうめえと）人気を独占しているでしょう" },
  { name:"冷やし中華", kakeru:"冷やし中華に彩りがないよ", toku:"反抗期の子供", kokoro:"どちらも，ハム買ってきます（歯向かってきます）" },
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