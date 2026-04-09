// ====================================================
// popup.js — Lógica do popup da extensão
// ====================================================
// Mostra as mensagens mais recentes guardadas no storage.

// Quando o popup abre, carregar as mensagens guardadas
document.addEventListener('DOMContentLoaded', function () {
  const divMensagens = document.getElementById('mensagens');

  // Buscar mensagens do storage da extensão
  chrome.storage.local.get(['mensagens'], function (result) {
    const mensagens = result.mensagens;

    if (!mensagens || mensagens.length === 0) {
      divMensagens.innerHTML = '<div class="vazio">Nenhuma mensagem recebida ainda.</div>';
      return;
    }

    // Gerar o HTML das mensagens
    let html = '';
    for (let i = 0; i < mensagens.length; i++) {
      const msg = mensagens[i];
      const isAlta = msg.prioridade === 'alta';
      const data = new Date(msg.dataCriacao).toLocaleString('pt-PT');

      let classeMsg = 'mensagem';
      if (isAlta) {
        classeMsg = classeMsg + ' alta';
      }

      let classeBadge = 'badge';
      if (isAlta) {
        classeBadge = classeBadge + ' alta';
      } else {
        classeBadge = classeBadge + ' normal';
      }

      let textoBadge = '🟢 Normal';
      if (isAlta) {
        textoBadge = '🔴 ALTA';
      }

      html = html + '<div class="' + classeMsg + '">';
      html = html + '  <div class="mensagem-header">';
      html = html + '    <span class="' + classeBadge + '">' + textoBadge + '</span>';
      html = html + '    <span class="data">' + data + '</span>';
      html = html + '  </div>';
      html = html + '  <p class="texto">' + msg.texto + '</p>';
      html = html + '</div>';
    }

    divMensagens.innerHTML = html;
  });
});
