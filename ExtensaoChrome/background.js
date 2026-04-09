// ====================================================
// background.js — Service Worker da extensão
// ====================================================
// Corre em segundo plano. Verifica novas mensagens
// periodicamente e mostra notificações.

// URL do backend
const API_URL = 'http://localhost:3000/api';

// Guardar o ID da última mensagem vista
let ultimoIdVisto = 0;

// Verificar novas mensagens
const verificarNovasMensagens = function () {
  fetch(API_URL + '/mensagens')
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (mensagens) {
      if (mensagens.length > 0) {
        // Verificar se há mensagens novas
        for (let i = 0; i < mensagens.length; i++) {
          const msg = mensagens[i];
          if (msg.id > ultimoIdVisto) {
            // Mostrar notificação do browser
            let titulo = '🟢 Nova Mensagem';
            if (msg.prioridade === 'alta') {
              titulo = '🔴 URGENTE';
            }

            chrome.notifications.create('msg-' + msg.id, {
              type: 'basic',
              iconUrl: 'icons/icon128.png',
              title: titulo,
              message: msg.texto,
              priority: msg.prioridade === 'alta' ? 2 : 0,
              requireInteraction: msg.prioridade === 'alta',
            });
          }
        }

        // Atualizar o último ID visto
        ultimoIdVisto = mensagens[0].id;

        // Guardar mensagens no storage da extensão (máximo 20)
        const mensagensParaGuardar = mensagens.slice(0, 20);
        chrome.storage.local.set({ mensagens: mensagensParaGuardar });
      }
    })
    .catch(function (erro) {
      console.log('Erro ao verificar mensagens:', erro);
    });
};

// Correr quando a extensão é instalada
chrome.runtime.onInstalled.addListener(function () {
  console.log('Extensão de notificações instalada!');
  verificarNovasMensagens();
});

// Criar um alarme para verificar mensagens periodicamente
chrome.alarms.create('verificar-mensagens', {
  periodInMinutes: 0.1,
});

chrome.alarms.onAlarm.addListener(function (alarm) {
  if (alarm.name === 'verificar-mensagens') {
    verificarNovasMensagens();
  }
});
