const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();

app.use(express.json());
// app.use(cors);

app.get("/", (req, res) => {
  return res.status(200).send({
    message: "API Rodando",
  });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files/");
  },
  filename: function (req, file, cb) {
    // Extração da extensão do arquivo original:
    const extensaoArquivo = file.originalname.split(".")[1];

    // Cria um código randômico que será o nome do arquivo
    const novoNomeArquivo = require("crypto").randomBytes(64).toString("hex");

    // Indica o novo nome do arquivo:
    cb(null, `${novoNomeArquivo}.${extensaoArquivo}`);
  },
});

const upload = multer({ storage });

app.get("/todos", async (req, res) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/");
  const todos = await response.json();

  return res.status(200).send(todos);
});

app.post("/files", upload.single("file"), (req, res) => {
  return res.status(200).send(req.file || { message: "none" });
});

module.exports = app;
