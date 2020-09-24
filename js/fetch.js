const url = "http://worldtimeapi.org/api/timezone/";
var str = "";
var lista = [];
var zona;

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    for (const product of data) {
      lista.push(product);
    }
  });
