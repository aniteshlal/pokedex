const BASEURL = window.location.origin;
document.getElementsByClassName("hamburger")[0].onclick = toggleNav;

function toggleNav() {
  navSize = document.getElementById("mySidenav").style.width;
  if (navSize === "0px") {
    return openNav();
  }
  return closeNav();
}

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  // document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  document.getElementsByClassName("hamburger");
  document.getElementsByClassName("hamburger")[0].classList.add("active");
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  // document.body.style.backgroundColor = "white";
  document.getElementsByClassName("hamburger")[0].classList.remove("active");
}

// var data;

function update_types_and_id(pokemon_details) {
  var type_and_id = modal.getElementsByClassName("types-and-id")[0];
  var id_detail = type_and_id.getElementsByClassName("detail-id")[0];
  id_detail.firstElementChild.innerHTML = "#" + pokemon_details.id;

  var type_detail = type_and_id.getElementsByClassName("detail-types")[0];
  // var currPokemon = pokemon_details;
  var typename = pokemon_details.types[0].type.name;
  type_detail.children[0].innerHTML = pokemon_details.types[0].type.name;
  var typecolor1 = typeColorMap.find(function(elem) {
    return typename === elem.name;
  });
  type_detail.children[0].style.backgroundColor = typecolor1.color;
  if (pokemon_details.types.length == 1) {
    type_detail.children[1].style.display = "none";
    modal.style.background = typecolor1.rgbColor;
  } else {
    type_detail.children[1].style.display = "";
    type_detail.children[1].innerHTML = pokemon_details.types[1].type.name;
    typename = pokemon_details.types[1].type.name;
    var typecolor2 = typeColorMap.find(function(elem) {
      return typename === elem.name;
    });
    type_detail.children[1].style.backgroundColor = typecolor2.color;
    modal.style.background =
      "linear-gradient(90deg," +
      typecolor1.rgbColor +
      " 50%, " +
      typecolor2.rgbColor +
      " 50%)";
  }
}

function update_stats(pokemon_details) {
  var stats_detail = modal.getElementsByClassName("stats-detail")[0];
  var pokemonData = pokemon_details;
  var pokemonStats = pokemonData.stats;
  var stat_bar_fig, stat_bar_bg;
  var typename = pokemon_details.types[0].type.name;
  var colortypemap = typeColorMap.find(function(elem) {
    return typename === elem.name;
  });
  var color = colortypemap.color;
  var modalheadcolor = colortypemap.modalheadercolor;
  console.log(modalheadcolor);
  var modalheader = modal.getElementsByClassName("modal-header")[0];
  modalheader.style.backgroundColor = modalheadcolor;
  var modalfoot = modal.getElementsByClassName("modal-footer")[0];
  modalfoot.style.backgroundColor = modalheadcolor;
  for (var i = 0; i < pokemonStats.length; i++) {
    var statname = pokemonStats[i].stat.name;
    var statvalue = pokemonStats[i].base_stat;
    var ratio = statvalue / 200;
    ratio = ratio > 1 ? 1 : ratio;

    stat_bar_bg = stats_detail
      .getElementsByClassName(statname)[0]
      .getElementsByTagName("div")[0];
    stat_bar_fig = stat_bar_fig = stats_detail
      .getElementsByClassName(statname)[0]
      .getElementsByTagName("div")[1];

    stat_bar_fig.innerHTML = statvalue;
    stat_bar_bg.style.transform = "scaleX(" + ratio + ")";
    stat_bar_bg.style.background = color;
  }
}

function update_detail_image(pokemon_details) {
  var modal = document.getElementById("myModal");
  var spirte_detail = modal.getElementsByClassName("pokemon-sprite-detail")[0];
  spirte_detail.style.backgroundImage =
    "url(" + pokemon_details.sprites.front_default + ")";
  spirte_detail.addEventListener("mouseenter", e => {
    spirte_detail.style.backgroundImage =
      "url(" + pokemon_details.sprites.back_default + ")";
  });
  spirte_detail.addEventListener("mouseleave", e => {
    spirte_detail.style.backgroundImage =
      "url(" + pokemon_details.sprites.front_default + ")";
  });
}

function getPokemonStats(pokemonID) {
  var requestbyID = new XMLHttpRequest();
  requestbyID.open("GET", `${BASEURL}/getByID?ID=` + pokemonID);
  requestbyID.send();
  requestbyID.onload = function() {
    var pokemon_details = JSON.parse(requestbyID.response);
    console.log(pokemon_details);
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("sprite-" + pokemonID);

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";
    console.log("clicking pokemon id = " + pokemonID);
    var modelHeader = document.getElementsByClassName("modal-header")[0];
    var pokemonName = modelHeader.getElementsByTagName("h2")[0];
    pokemonName.innerHTML = pokemon_details.name.toUpperCase();

    update_stats(pokemon_details);
    update_types_and_id(pokemon_details);
    update_detail_image(pokemon_details);

    var modalheader = modal.getElementsByClassName("modal-header")[0];
    modalheader.style.backgroundColor =
      // When the user clicks on <span> (x), close the modal
      span.onclick = function() {
        modal.style.display = "none";
      };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  };
}

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
// btn.onclick = function () {
//   modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// var data = [];
var typeColorMap = [
  {
    name: "normal",
    color: "#A8A878",
    rgbColor: "rgb(168, 168, 120, 0.9)",
    modalheadercolor: "rgb(112, 112, 72)"
  },
  {
    name: "fighting",
    color: "#C03028",
    rgbColor: "rgb(192, 48, 40, 0.9)",
    modalheadercolor: "rgb(123, 30, 25)"
  },
  {
    name: "flying",
    color: "#A890F0",
    rgbColor: "rgb(168, 144, 240, 0.9)",
    modalheadercolor: "rgb(77, 30, 220)"
  },
  {
    name: "poison",
    color: "#A040A0",
    rgbColor: "rgb(160, 64, 160, 0.9)",
    modalheadercolor: "rgb(106, 42, 106)"
  },
  {
    name: "ground",
    color: "#E0C068",
    rgbColor: "rgb(224, 192, 104, 0.9)",
    modalheadercolor: "rgb(178, 140, 36)"
  },
  {
    name: "rock",
    color: "#B8A038",
    rgbColor: "rgb(184, 160, 56, 0.9)",
    modalheadercolor: "rgb(121, 106, 37)"
  },
  {
    name: "bug",
    color: "#A8B820",
    rgbColor: "rgb(168, 184, 32, 0.9)",
    modalheadercolor: "rgb(107, 117, 21)"
  },
  {
    name: "ghost",
    color: "#705898",
    rgbColor: "rgb(112, 88, 152, 0.9)",
    modalheadercolor: "rgb(74, 58, 100)"
  },
  {
    name: "steel",
    color: "#B8B8D0",
    rgbColor: "rgb(184, 184, 208, 0.9)",
    modalheadercolor: "rgb(102, 102, 153)"
  },
  {
    name: "fire",
    color: "#F08030",
    rgbColor: "rgb(240, 128, 48, 0.9)",
    modalheadercolor: "rgb(171, 79, 13)"
  },
  {
    name: "water",
    color: "#6890F0",
    rgbColor: "rgb(104, 144, 240, 0.9)",
    modalheadercolor: "rgb(20, 75, 204)"
  },
  {
    name: "grass",
    color: "#78C850",
    rgbColor: "rgb(120, 200, 80, 0.9)",
    modalheadercolor: "rgb(76, 140, 44)"
  },
  {
    name: "electric",
    color: "#F8D030",
    rgbColor: "rgb(248, 208, 48, 0.9)",
    modalheadercolor: "rgb(187, 151, 7)"
  },
  {
    name: "psychic",
    color: "#F85888",
    rgbColor: "rgb(248, 88, 136, 0.9)",
    modalheadercolor: "rgb(211, 9, 69)"
  },
  {
    name: "ice",
    color: "#98D8D8",
    rgbColor: "rgb(152, 216, 216, 0.9)",
    modalheadercolor: "rgb(66, 174, 174)"
  },
  {
    name: "dragon",
    color: "#7038F8",
    rgbColor: "rgb(112, 56, 248, 0.9)",
    modalheadercolor: "rgb(62, 7, 192)"
  },
  {
    name: "dark",
    color: "#705848",
    rgbColor: "rgb(112, 88, 72, 0.9)",
    modalheadercolor: "rgb(72, 56, 46)"
  },
  {
    name: "fairy",
    color: "#EE99AC",
    rgbColor: "rgb(238, 153, 172, 0.9)",
    modalheadercolor: "rgb(218, 37, 76)"
  }
];

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

var pokemons;
var req = new XMLHttpRequest();
req.open("GET", `${BASEURL}/pokemonNames`);
req.onprogress = () => {
  document.getElementById("pokemon-list-wrapper").style.visibility = "hidden";
};
req.onload = function() {
  document.getElementById("load").style.visibility = "hidden";
  document.getElementById("pokemon-list-wrapper").style.visibility = "visible";
  pokemons = JSON.parse(req.response).data; // data comes in as an array
  if (req.status >= 200 && req.status < 400) {
    pokemons.forEach(pokemon => {
      const container = document.getElementById("pokemon-list");
      const card = document.createElement("li");
      // var backgroundColor = findBackgroundColor(pokemon.types);
      // console.log(pokemon.types[0].type.name);
      card.setAttribute("class", "pokemon-container");
      // card.setAttribute("style", "background: " + backgroundColor);
      const imageButton = document.createElement("button");
      imageButton.setAttribute("type", "button");
      imageButton.setAttribute("alt", "pokemon-image");
      imageButton.setAttribute("class", "pokemon-sprite sprite-" + pokemon.id);
      imageButton.setAttribute("id", "sprite-" + pokemon.id);

      // imageButton.addEventListener("click", "getPokemonStats("+pokemon.id+")");
      imageButton.setAttribute(
        "onclick",
        "getPokemonStats(" + pokemon.id + ")"
      );
      imageButton.style.backgroundImage = "url(" + pokemon.front_image + ")";
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
req.send();
