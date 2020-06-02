var express = require("express");
var app = express();

const translate = require("google-translate-free");
const languages = require("./langs").langs;
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.static("public"));
app.post("/", async (req, res) => {
  var randlangs = shuffle(Object.keys(languages));
  try {
    const rute = [];
    console.log(req.body);

    var { text, number } = req.body;
    var retutext = { text };

    for (let index = 0; index < number + 1; index++) {
      to = index === number ? "es" : randlangs.next().value;
      retutext = await translate(retutext.text, {
        to,
      });
      let fix_esp = await translate(retutext.text, {
        to: "es",
      });
      rute.push({
        from: languages[retutext.from.language.iso],
        to: languages[to],
        fix_esp: fix_esp.text,
        text: retutext.text,
      });
    }
    res.send({
      input: text,
      output: rute[rute.length - 1].text || null,
      rute,
      erro: "",
    });
  } catch (err) {
    res.send({ text: "", rute, err });
  }
});
function* shuffle(array) {
  let i = array.length;

  while (i--) {
    yield array.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
  }
}
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Example app listening on port 3000!"));
