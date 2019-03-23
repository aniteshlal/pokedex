function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

var data;

function getPokemonStats(pokemonID) {
  var modal = document.getElementById('myModal');

  // Get the button that opens the modal
  var btn = document.getElementById("sprite-" + pokemonID);
  
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];


  console.log("name of pokemon - " + data[pokemonID-1].name);
  // When the user clicks the button, open the modal 
  btn.onclick = function() {
    modal.style.display = "block";
    console.log("clicking pokemon id = " + pokemonID);
    var modelHeader = document.getElementsByClassName("modal-header")[0];
    var pokemonName = modelHeader.getElementsByTagName("h2")[0];
    pokemonName.innerHTML = data[pokemonID-1].name;
  }
  
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
// var data = [];
var typeColorMap = [
  { name: "normal",   color: "#A8A878", rgbColor: "rgb(168, 168, 120)" },
  { name: "fighting", color: "#C03028", rgbColor: "rgb(192, 48, 40)" },
  { name: "flying",   color: "#A890F0", rgbColor: "rgb(168, 144, 240)" },
  { name: "poison",   color: "#A040A0", rgbColor: "rgb(160, 64, 160)" },
  { name: "ground",   color: "#E0C068", rgbColor: "rgb(224, 192, 104)" },
  { name: "rock",     color: "#B8A038", rgbColor: "rgb(184, 160, 56)" },
  { name: "bug",      color: "#A8B820", rgbColor: "rgb(168, 184, 32)" },
  { name: "ghost",    color: "#705898", rgbColor: "rgb(112, 88, 152)" },
  { name: "steel",    color: "#B8B8D0", rgbColor: "rgb(184, 184, 208)" },
  { name: "fire",     color: "#F08030", rgbColor: "rgb(240, 128, 48)" },
  { name: "water",    color: "#6890F0", rgbColor: "rgb(104, 144, 240)" },
  { name: "grass",    color: "#78C850", rgbColor: "rgb(120, 200, 80)" },
  { name: "electric", color: "#F8D030", rgbColor: "rgb(248, 208, 48)" },
  { name: "psychic",  color: "#F85888", rgbColor: "rgb(248, 88, 136)" },
  { name: "ice",      color: "#98D8D8", rgbColor: "rgb(152, 216, 216)" },
  { name: "dragon",   color: "#7038F8", rgbColor: "rgb(112, 56, 248)" },
  { name: "dark",     color: "#705848", rgbColor: "rgb(112, 88, 72)" },
  { name: "fairy",    color: "#EE99AC", rgbColor: "rgb(238, 153, 172)" }
];

request.open("GET", "http://localhost:3000/", true);

function findBackgroundColor(types) {
  if (types.length == 1) {
    var color = typeColorMap.find(obj => {
      return obj.name === types[0].type.name;
    }).color;
    backgroundColor = color;
  } else if (types.length == 2) {
    var color1 = typeColorMap.find(obj => {
      return obj.name === types[0].type.name;
    }).color;
    var color2 = typeColorMap.find(obj => {
      return obj.name === types[1].type.name;
    }).color;
    backgroundColor =
      "linear-gradient(-45deg," + color1 + " 50%, " + color2 + " 50%)";
  }
  return backgroundColor;
}

request.onload = function() {
  // Begin accessing JSON data here
  data = JSON.parse(request.response);
  //console.log(request.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach(pokemon => {
      const container = document.getElementById("pokemon-list");
      const card = document.createElement("li");
      var backgroundColor = findBackgroundColor(pokemon.types);
      // console.log(pokemon.types[0].type.name);
      card.setAttribute("class", "pokemon-container");
      card.setAttribute("style", "background: " + backgroundColor);
      const imageButton = document.createElement("button");
      imageButton.setAttribute("type", "button");
      imageButton.setAttribute("alt", "pokemon-image");
      imageButton.setAttribute("class", "pokemon-sprite sprite-" + pokemon.id);
      imageButton.setAttribute("id","sprite-" + pokemon.id);

      // imageButton.addEventListener("click", "getPokemonStats("+pokemon.id+")");
      imageButton.setAttribute("onclick", "getPokemonStats("+pokemon.id+")");
      imageButton.style.backgroundImage =
        "url(" + pokemon.sprites.front_default + ")";
      const span = document.createElement("span");
      span.setAttribute("class", "pokemon-name");

      span.textContent = pokemon.name;

      container.appendChild(card);
      card.appendChild(imageButton);
      card.appendChild(span);
      // console.log("Pokemon ID: " + pokemon.id);
      // console.log("Pokemon name: " + pokemon.name);
      // console.log("Pokemon image: " + pokemon.sprites.front_default);
    });
  } else {
    console.log("error");
  }
};
// Send request
request.send();
