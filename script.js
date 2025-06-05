const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSIcdcj9mOi2OTRJ0SfIWObQ7n_lgXiHvo7wpQHYU69F1vTq19o8W5PfSPcCwdjd0YCbli2neMOnRLn/pub?gid=0&single=true&output=csv';

const tempoAtualizacao = 30; // segundos
let contador = tempoAtualizacao;

async function carregarDados() {
  try {
    const resposta = await fetch(sheetURL + '&cachebust=' + new Date().getTime());
    const texto = await resposta.text();
    const linhas = texto.trim().split('\n').map(linha => linha.split(','));

    const cabecalhos = linhas[0];
    const dados = linhas.slice(1);

    const container = document.getElementById('cursos');
    container.innerHTML = '';

    dados.forEach(linha => {
      const card = document.createElement('div');
      card.className = 'bg-white rounded-xl shadow-md p-4 w-full sm:w-80 border border-gray-200';

      cabecalhos.forEach((cabecalho, i) => {
        if (linha[i]) {
          const item = document.createElement('p');
          item.innerHTML = `<strong>${cabecalho}:</strong> ${linha[i]}`;
          card.appendChild(item);
        }
      });

      container.appendChild(card);
    });
  } catch (erro) {
    console.error('Erro ao carregar os dados:', erro);
  }
}

function atualizarContador() {
  const timer = document.getElementById('timer');
  if (contador > 0) {
    contador--;
    timer.textContent = contador;
  } else {
    contador = tempoAtualizacao;
    carregarDados();
  }
}

// Inicialização
carregarDados();
setInterval(atualizarContador, 1000);
