
import translate from "translate";
import express from "express";
import cors from "cors"

import exphbs from "express-handlebars"

const app = express();
const PORT = 5081;

translate.engine = 'google';
translate.key = 'SUA_CHAVE_DA_API_DO_GOOGLE_TRANSLATE'; 

app.use(express.json());
app.use(cors());

app.use(express.static('public'))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.get('/traduzir', (req, res) => {
  res.render('traduzir')
})

app.post('/traduzir', async (req, res) => {
  const { texto, idiomaDestino } = req.body;
  

  try {
    const traducao = await translate(texto, { to: idiomaDestino })
    res.json({ traducao });
    console.log(traducao)
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao traduzir texto' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor está ouvindo na porta ${PORT}`);
});