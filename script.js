let indiceAtual = 0; // Controla qual card está visível
let dadosJson = [];  // Armazena os dados carregados do JSON

function mostrarVideo() { // Define a função para exibir e reproduzir um vídeo
      const video = document.getElementById("meuVideo"); // Obtém o elemento de vídeo pelo ID "meuVideo"
      const elementosPagina = document.querySelectorAll("header, .navbar, main, .buttons, .footer, .card");
      elementosPagina.forEach(el => el.style.display = "none");

      video.style.display = "block"; // Altera o estilo para exibir o vídeo (torna visível)
      video.play();                  // Inicia a reprodução do vídeo
      video.addEventListener("ended", () => { // Adiciona um evento que dispara quando o vídeo termina
      video.style.display = "none"; // Oculta o vídeo novamente quando a reprodução acaba
      elementosPagina.forEach(el => el.style.display = "");
    }, { once: true }); // Fim do callback do evento

    }

// Função para invocar o mago dentro do card
function invocarMago(botao) {
  const template = document.getElementById("template-mago");
  const clone = template.content.cloneNode(true);
  const cardVisual = botao.parentElement.querySelector(".card-visual");

  const scene = clone.querySelector(".scene");
  scene.style.transform = "scale(0.5)";
  
  cardVisual.innerHTML = ""; // Limpa a imagem atual
  cardVisual.style.backgroundImage = "none"; // Remove o background
  cardVisual.style.display = "flex"; // Garante alinhamento
  cardVisual.style.justifyContent = "center";
  cardVisual.style.alignItems = "center";
  cardVisual.appendChild(clone); // Adiciona o mago
  botao.remove(); // Remove o botão após invocar
}

// Função para exibir o card baseado no índice atual
function renderizarCard() {
  const container = document.getElementById("resultados-pesquisa");
  container.innerHTML = ""; // Limpa o conteúdo anterior

  if (dadosJson.length === 0) return;

  const obj = dadosJson[indiceAtual];
  
  // Cria o botão apenas se o card tiver a propriedade "mago"
  const botaoMago = obj.mago ? `<button onclick="invocarMago(this)" style="margin-top: 1rem; font-size: 0.9rem; padding: 0.5rem 1rem;">Invocar Mago</button>` : "";

  const card = document.createElement("div");
  card.classList.add("card", "active");
  
  card.innerHTML = `
    <h2>${obj.nome}</h2>
    <div class="card-visual" style="background-image: url('${obj.foto}')"></div>
    <p>${obj.descricao}</p>
    ${botaoMago}
  `;
  
  container.appendChild(card);

  if (obj.mago) {
    invocarMago(card.querySelector("button"));
  }
}

function proximo() {
  indiceAtual = (indiceAtual + 1) % dadosJson.length; // Avança e volta ao zero se chegar no fim
  renderizarCard();
}

function anterior() {
  indiceAtual = (indiceAtual - 1 + dadosJson.length) % dadosJson.length; // Volta e vai para o fim se for menor que zero
  renderizarCard();
}

 fetch("data.json") // Carrega o arquivo JSON
  .then(response => response.json()) // Converte a resposta para JSON
  .then(objetos => { 
    dadosJson = objetos; // Salva os dados na variável global
    renderizarCard();    // Exibe o primeiro card
  })
  .catch(error => console.error("Erro ao carregar JSON:", error)); // Captura e exibe erros na carga do JSON

/** 🧙‍♂️ */


