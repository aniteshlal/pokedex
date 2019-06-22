const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 3000;
const url = require("url");
app.use(cors());

// app.get("/", (req, res) => res.send("Hello World!!!!"));

function createArrayRange(start, end) {
  var foo = [];
  for (var i = start; i <= end; i++) {
    foo.push(i);
  }
  //   console.log(foo);
  return foo;
}

/**
 *
 *
 * @param {array} arr array of ids of pokemon
 */
function formatName(name) {
  return name.charAt(0).toUpperCase() + name.substring(1);
}

var data = [];
function makeRequestsFromArray(arr) {
  let index = 1;
  function request() {
    if (data[index - 1]) {
      index++;
      return request();
    } else if (index >= arr.length) {
      return "done";
    } else {
      return axios
        .get("https://pokeapi.co/api/v2/pokemon/" + index)
        .then(function(response) {
          index++;
          //   console.log("pokemon id: " + response.data.id);
          //   console.log("index: " + index + " arr length : " + arr.length);
          //   response.data.name = response.data.name.toUpperCase();
          response.data.name = formatName(response.data.name);
          //   console.log(response.data.name);
          data.push(response.data);

          return request();
        });
    }
  }
  return request();
}

app.get("/", async function(req, res) {
  try {
    await makeRequestsFromArray(createArrayRange(1, 37));
    // console.log("data length: " + data.length);
    res.send(data);
  } catch (e) {
    console.log("error");
  }
});

function getRangeOfPokemon(start, end) {
  let index = 1;
  a = [];
  function request() {
    if (data[start - 1]) {
      start++;
      return request();
    } else {
      return axios
        .get("https://pokeapi.co/api/v2/pokemon/" + start)
        .then(function(response) {
          start++;
          //   console.log("pokemon id " + response.data.id);
          a.push(response.data);
          //   console.log("length of a(new pokemons not in cache)" + a.length);
          if (response.data.id == 29) {
            response.data.name = "Nidoran ♀";
          }
          if (response.data.id == 32) {
            response.data.name = "Nidoran ♂";
          }
          response.data.name = formatName(response.data.name);
          data[response.data.id - 1] = response.data;
          if (start >= end) {
            return a;
          }
          return request();
        });
    }
  }
  return request();
}

app.get("/getByIDs", async function(req, res) {
  try {
    var urlParts = url.parse(req.url, true);
    var query = urlParts.query;
    if (query.startID && query.endID) {
      var pokemonBatch = await getRangeOfPokemon(query.startID, query.endID);
      console.log("Output pokemonBatch array\n" + pokemonBatch.length);
      res.send(pokemonBatch);
    } else {
      console.log("Output data array");
      res.send(data);
    }
  } catch (e) {
    console.log(e);
  }
});

app.get("/getPokemon", async function(req, res) {
  try {
    var maxPokemon = 807;
    var urlParts = url.parse(req.url, true);
    var query = urlParts.query;
    // console.log(query.ID);
    if (query.ID >= 1 && query.ID <= maxPokemon) {
      if (data[query.ID - 1]) {
        // console.log(data);
        res.send(data[query.ID - 1]);
        // console.log("already in cache" + query.ID);
      } else {
        axios
          .get("https://pokeapi.co/api/v2/pokemon/" + query.ID)
          .then(response => {
            // data[response.data.id] = response.data;
            // console.log(response.data.id);
            // console.log(response.data.name);
            data[response.data.id - 1] = response.data;
            res.send(response.data);
            console.log("already in cache");
          });
      }
    } else {
      res.send(
        " Not in range of valid query parameters\n Range is 1-" + maxPokemon
      );
    }
  } catch (e) {
    console.log(e);
  }
});

app.get("/getpokemon1", function(req, res) {
  axios
    .get("https://pokeapi.co/api/v2/pokemon/1")
    .then(response => {
      // data[response.data.id] = response.data;
      // console.log(response.data.id);
      // console.log(response.data.name);
      res.send(response.data);
    })
    .catch(error => {
      console.log(error);
    });
});

// var http = require("https");

// var urls = [];
// urls.push("https://pokeapi.co/api/v2/pokemon/1");
// urls.push("https://pokeapi.co/api/v2/pokemon/2");

// // for (pokemonId = 1; pokemonId <= 2; pokemonId++) {
// //   var baseURL = "https://pokeapi.co/api/v2/pokemon/";
// //   var getURL = baseURL + pokemonId;
// //   getURL = baseURL + pokemonId;
// //   urls.push(getURL);
// // }

// var completed_requests = 0;

// urls.forEach(function(url) {
//   var responses = [];
//   http.get(url, function(res) {
//     res.on("data", function(chunk) {
//       responses.push(chunk);
//     });

//     res.on("end", function() {
//       if (completed_requests++ == urls.length - 1) {
//         // All downloads are completed
//         console.log("body:", responses.join());
//         app.get("/", function(req, res){
//             // var myJsonString = JSON.stringify(responses);
//         });
//       }
//     });
//   });
// });

// app.get("/", function(req, res) {
//   var pokemonURLS = [];
//   for (pokemonId = 1; pokemonId <= 50; pokemonId++) {
//     var baseURL = "https://pokeapi.co/api/v2/pokemon/";
//     var getURL = baseURL + pokemonId;
//     getURL = baseURL + pokemonId;
//     pokemonURLS.push(getURL);
//   }

//   var mainObject = {},
//     promises = [];

//   pokemonURLS.forEach(function(myUrl) {
//     //   console.log(myUrl);
//     promises.push(
//       axios.get(myUrl).then(response => {
//         // data[response.data.id] = response.data;
//         console.log("in push promise " + myUrl);
//         console.log(response.data.id);
//       })
//     );
//   });

//   axios.all(promises).then(function(results) {
//     results.forEach(function(response) {
//       console.log("in all promise");
//       console.log(response.data.id);
//       console.log(response.data.name);
//       mainObject[response.identifier] = response.value;
//     });
//   });
// });

// app.get("/", function(req, res) {
//   var data = [];
//   var pokemonId = 1;
//   var baseURL = "https://pokeapi.co/api/v2/pokemon/";
//   var getURL = baseURL + pokemonId;

//   for (pokemonId = 1; pokemonId <= 50; pokemonId++) {
//     getURL = baseURL + pokemonId;
//     axios
//       .get(getURL)
//       .then(response => {
//         // data[response.data.id] = response.data;
//         console.log(response.data.id);
//         console.log(response.data.name);
//         // res.send(response);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
