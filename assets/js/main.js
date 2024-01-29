let page = document.body.id;
let corpo = document.getElementById("principal");

if (page === "principal") {
  const pokemonList = document.getElementById("pokemonList");
  const loadMoreButton = document.getElementById("loadMoreButton");

  const maxRecords = 151;
  const limit = 10;
  let offset = 0;

  function convertPokemonToLi(pokemon) {
    return `
          <li id="pokemon-geral" class="pokemon ${pokemon.type}">
              <span class="number">#${pokemon.number}</span>
              <span class="name">${pokemon.name}</span>

              <div class="detail">
                  <ol class="types">
                      ${pokemon.types
                        .map((type) => `<li class="type ${type}">${type}</li>`)
                        .join("")}
                  </ol>

                  <img src="${pokemon.photo}" class="imagem"
                      alt="${pokemon.name}">
              </div>
          </li>
      `;
  }

  async function loadPokemonItens(offset, limit) {
    await pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
      const newHtml = pokemons.map(convertPokemonToLi).join("");
      pokemonList.innerHTML += newHtml;
    });
    evento();
  }

  loadPokemonItens(offset, limit);

  loadMoreButton.addEventListener("click", () => {
    offset += limit;
    const qtdRecordsWithNexPage = offset + limit;

    if (qtdRecordsWithNexPage >= maxRecords) {
      const newLimit = maxRecords - offset;
      loadPokemonItens(offset, newLimit);

      loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
      loadPokemonItens(offset, limit);
    }
  });

  //Adicionar evento de click em todos pokemons
  function evento() {
    let elementsArray = document.querySelectorAll("#pokemon-geral");

    console.log("Antes do Loop");
    elementsArray.forEach(function (elem) {
      console.log("Dentro do Loop");
      elem.addEventListener("click", () => {
        console.log("clicado");

        numero = elem.children[0].textContent;
        nome = elem.children[1].textContent;
        imagem = elem.children[2].children[1].getAttribute("src");

        //Execucao com limpeza
        removeALL();
        corpo.innerHTML = `<div id="top" class="top">
          <button type="button" class="voltar">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </button>
    
          <button type="button" class="Like">
            <ion-icon name="heart-outline"></ion-icon>
          </button>
    
          <div class="nome">
            <span id="nome">${nome}</span>
          </div>
    
          <div class="numero">
            <span id="numero">${numero}</span>
          </div>
    
          <img src="${imagem}" alt="Bulbasur" />
        </div>
  
        <div id="bot" class="bot">
          <h1>About</h1>
          <table class="tabela">
            <tr>
              <td>Species</td>
              <td class="species">Seed</td>
            </tr>
            <tr>
              <td>Heigh</td>
              <td class="height">2'3.6''(0.70cm)</td>
            </tr>
            <tr>
              <td>Weight</td>
              <td class="weight">15.2 libs (6.9kg)</td>
            </tr>
            <tr>
              <td>Abilities</td>
              <td class="abilities">Overgrow, Chlorophyl</td>
            </tr>
          </table>
    
          <h1>Breading</h1>
          <table>
            <tr>
              <td>Gender</td>
              <td class="gender">87.5% 12.5%</td>
            </tr>
            <tr>
              <td>Egg Groups</td>
              <td class="egg-group">Monster</td>
            </tr>
    
            <tr>
              <td>Egg Cycle</td>
              <td class="egg-cycle">Grass</td>
            </tr>
          </table>
        </div>
  `;

        //Estilizacao(Ligar o html com detalhe do pokemon  com o respectivo  CSS)
        let head = document.getElementsByTagName("HEAD")[0];
        //create new link
        let link = document.createElement("link");
        //set the attribute for link element
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = "./assets/css/poke-data.css";
        //Append the link element to html head
        head.appendChild(link);
      });
    });
  }
} else if (page === "detalhe") {
  topContent.children[2].children[0].innerHTML = pokemon.name;
  topContent.children[3].children[0].innerHTML = pokemon.number;
  topContent.children[4].src = imagem;
}

function removeALL() {
  for (child of corpo.children) {
    child.remove();
  }
}

/*
console.log("Funcionando");
let elementsArray = document.querySelectorAll("#pokemon-geral");
console.log(typeof elementsArray);

console.log("Antes do Loop");
elementsArray.forEach(function (elem) {
  console.log("Dentro do Loop");
  elem.addEventListener("click", () => {
    console.log("clicado");
  });

  elem.addEventListener("mouseover", () => {
    elem.style.background = "cyan";
  });

  elem.addEventListener("mouseout", () => {
    elem.style.background = "white";
  });
});
*/
