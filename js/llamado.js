function zonas() {
  for (const product of lista) {
    if (product.includes(document.querySelector("#consulta").value)) {
      fetch(url.concat(product))
        .then((response) => response.json())
        .then((data) => {
          /*
            abbreviation: "CDT" 
            client_ip: "189.128.109.173"
            datetime: "2020-09-24T00:49:54.506940-05:00"
            day_of_week: 4
            day_of_year: 267
            dst: true
            dst_from: "2020-04-05T08:00:00+00:00"
            dst_offset: 3600
            dst_until: "2020-10-25T07:00:00+00:00"
            raw_offset: -21600
            timezone: "America/Mexico_City"
            unixtime: 1600926594
            utc_datetime: "2020-09-24T05:49:54.506940+00:00"
            utc_offset: "-05:00"
            week_number: 39
      */
          var ciudad;
          var cnt = 0;

          ciudad = data.timezone.split("/");
          offset = data.utc_offset.split(":");
          var inner = "";
          inner +=
            `<div class="row lineas"><div class="col sidebar"><span class="badge badge-light"><i class="fas fa-trash-alt"></i></span></div><div class="col sidebar"><span class="badge badge-light">` +
            offset[0] +
            `</span></div>`;
          inner += `<div class="col-1">`;
          for (const product of ciudad) {
            if (cnt == 0) {
              inner += `<span class="twelve">` + product + `</span><br />`;
            }
            if (cnt == 1) {
              inner +=
                `<span class="twelve"><strong>` + product + `</strong></span>`;
            }
            if (cnt == 2) {
              inner += `<br /><span class="twelve">` + product + `</span>`;
            }
            cnt++;
          }
          inner += `</div>`;

          inner +=
            `<div class="col-1">` +
            `<span class="twelve"><strong>` +
            data.datetime.split("T")[1].slice(0, 5) +
            `hrs ` +
            data.abbreviation +
            `</strong></span><br /><span class="twelve">` +
            data.datetime.slice(0, 10) +
            `</span></div>`;

          inner += `<div class="col-8">`;
          var hora = parseInt(data.datetime.split("T")[1].slice(0, 3));
          for (var i = 0; i < 24; i++, hora++) {
            if (hora == 25) {
              hora = 1;
            }
            if (i == 0) {
              if (hora >= 7 && hora <= 19) {
                inner += `<span class="dia">` + hora + `</span>`;
              } else {
                inner += `<span class="noche">` + hora + `</span>`;
              }
            } else {
              if (hora >= 7 && hora <= 19) {
                inner += `<span class="dia"> ` + hora + `</span>`;
              } else {
                inner += `<span class="noche"> ` + hora + `</span>`;
              }
            }
          }
          inner += `</div></div>`;
          document.getElementById("ListaZonas").innerHTML += inner;
        });
      return;
    }
  }
}
