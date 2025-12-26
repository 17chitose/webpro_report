"use strict";

const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: true }));

let todolist = [
  { id:1, name:"買い物", detail:"トマトときゅうりを買う" },
  { id:2, name:"掃除", detail:"クローゼットのいらない服を捨てる" },
  { id:3, name:"仕様書作成", detail:"webプログラミングの利用者向けの仕様書を作る" },
  { id:4, name:"荷物受け取り", detail:"12/26 17時頃着の荷物を受け取る" },
  { id:5, name:"レポート作成", detail:"科学技術史のレポートを作成する" },
];

app.get("/", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('todo', {data: todolist} );
});

// Create
app.get("/create", (req, res) => {
  res.redirect('/public/todo_new.html');
});

app.get("/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = todolist[ number ];
  res.render('todo_detail', {id: number, data: detail} );
});

// Delete
app.get("/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  todolist.splice( req.params.number, 1 );
  res.redirect('/' );
});

// Create
app.post("/", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = todolist.length + 1;
  const name = req.body.name;
  const detail = req.body.detail;
  todolist.push( { id: id, name: name, detail: detail} );
  console.log( todolist );
  res.render('todo', {data: todolist} );
});

// Edit
app.get("/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = todolist[ number ];
  res.render('todo_edit', {id: number, data: detail} );
});

// Update
app.post("/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  todolist[req.params.number].name = req.body.name;
  todolist[req.params.number].detail = req.body.detail;
  console.log( todolist );
  res.redirect('/' );
});


app.listen(8080, () => console.log("Example app listening on port 8080!"));