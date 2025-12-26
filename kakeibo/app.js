"use strict";

const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: true }));

let money = [
  { name:"お昼ご飯", category:"食費", price:1000 },
  { name:"ゲーム", category:"レジャー", price:3303 },
  { name:"お菓子", category:"お菓子", price:200 },
  { name:"交通費", category:"交通費", price:345 },
  { name:"夕飯", category:"食費", price:1600 },
];

app.get("/", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('kakeibo', {data: money} );
});

// Create
app.get("/create", (req, res) => {
  res.redirect('/public/kakeibo_new.html');
});

app.get("/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = money[ number ];
  res.render('kakeibo_detail', {id: number, data: detail} );
});

// Delete
app.get("/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  money.splice( req.params.number, 1 );
  res.redirect('/' );
});

// Create
app.post("/", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const name = req.body.name;
  const category = req.body.category;
  const price = req.body.price;
  money.push( { name: name, category: category, price: price } );
  console.log( money );
  res.render('kakeibo', {data: money} );
});

// Edit
app.get("/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = money[ number ];
  res.render('kakeibo_edit', {id: number, data: detail} );
});

// Update
app.post("/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  money[req.params.number].name = req.body.name;
  money[req.params.number].category = req.body.category;
  money[req.params.number].price = req.body.price;
  console.log( money );
  res.redirect('/' );
});


app.listen(8080, () => console.log("Example app listening on port 8080!"));