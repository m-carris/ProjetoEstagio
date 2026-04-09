// background.js
// Serviço que corre em segundo plano e verifica se há mensagens novas
// Quando há uma mensagem nova, mostra uma notificação no browser

// URL do servidor
var URL_API = 'http://localhost:3000/api/mensagens';

// ==========================================
// QUANDO A EXTENSÃO É INSTALADA
// ==========================================
chrome.runtime.onInstalled.addListener(function() {
  console.log('Extensão de Notificações instalada!');

  // Criar um alarme que dispara a cada 30 segundos
  // (0.5 minutos é o mínimo permitido pelo Chrome)
  chrome.alarms.create('verificar-mensagens', {
    periodInMinutes: 0.5
  });

  // Verificar mensagens imediatamente
  verificarNovasMensagens();
});

// ==========================================
// QUANDO O ALARME DISPARA
// ==========================================
chrome.alarms.onAlarm.addListener(function(alarme) {
  if (alarme.name === 'verificar-mensagens') {
    verificarNovasMensagens();
  }
});

// ==========================================
// VERIFICAR SE HÁ MENSAGENS NOVAS
// ==========================================
// fetch() faz um pedido ao servidor
// .then() significa "quando o pedido terminar, faz isto"
// É como uma callback mas com sintaxe diferente
function verificarNovasMensagens() {
  fetch(URL_API)
    .then(function(resposta) {
      return resposta.json();
    })
    .then(function(mensagens) {
      if (mensagens.length === 0) {
        return;
      }

      // Ver qual foi o último ID que já vimos
      chrome.storage.local.get('ultimoId', function(dados) {
        var ultimoId = dados.ultimoId || 0;

        // Encontrar mensagens novas (que têm ID maior que o último que vimos)
        var novas = [];
        for (var i = 0; i < mensagens.length; i++) {
          if (mensagens[i].id > ultimoId) {
            novas.push(mensagens[i]);
          }
        }

        // Mostrar notificação para cada mensagem nova
        for (var j = 0; j < novas.length; j++) {
          mostrarNotificacao(novas[j]);
        }

        // Guardar o ID mais recente
        if (mensagens.length > 0 && mensagens[0].id > ultimoId) {
          chrome.storage.local.set({ ultimoId: mensagens[0].id });
        }

        // Guardar as últimas 20 mensagens para mostrar no popup
        var ultimas = [];
        var limite = 20;
        if (mensagens.length < limite) {
          limite = mensagens.length;
        }
        for (var k = 0; k < limite; k++) {
          ultimas.push(mensagens[k]);
        }
        chrome.storage.local.set({ mensagens: ultimas });
      });
    })
    .catch(function(erro) {
      console.log('Erro ao verificar mensagens: ' + erro);
    });
}

// ==========================================
// MOSTRAR NOTIFICAÇÃO NO BROWSER
// ==========================================
function mostrarNotificacao(mensagem) {
  var titulo = '📩 Nova Mensagem';
  var urgente = false;

  if (mensagem.prioridade === 'alta') {
    titulo = '🔴 URGENTE';
    urgente = true;
  }

  chrome.notifications.create('msg-' + mensagem.id, {
    type: 'basic',
    iconUrl: 'icons/icon128.png',
    title: titulo,
    message: mensagem.texto,
    priority: urgente ? 2 : 0,
    requireInteraction: urgente
  });
}
