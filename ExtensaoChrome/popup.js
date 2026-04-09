// ====================================================
// popup.js — Lógica do popup da extensão
// ====================================================
// Mostra as mensagens mais recentes guardadas no storage.

// Quando o popup abre, carregar as mensagens guardadas
document.addEventListener('DOMContentLoaded', function () {
  var divMensagens = document.getElementById('mensagens');

  // Buscar mensagens do storage da extensão
  chrome.storage.local.get(['mensagens'], function (result) {
    var mensagens = result.mensagens;

    if (!mensagens || mensagens.length === 0) {
      divMensagens.innerHTML = '<div class="vazio">Nenhuma mensagem recebida ainda.</div>';
      return;
    }

    // Gerar o HTML das mensagens
    var html = '';
    for (var i = 0; i < mensagens.length; i++) {
      var msg = mensagens[i];
      var isAlta = msg.prioridade === 'alta';
      var data = new Date(msg.dataCriacao).toLocaleString('pt-PT');

      var classeMsg = 'mensagem';
      if (isAlta) {
        classeMsg = classeMsg + ' alta';
      }

      var classeBadge = 'badge';
      if (isAlta) {
        classeBadge = classeBadge + ' alta';
      } else {
        classeBadge = classeBadge + ' normal';
      }

      var textoBadge = '🟢 Normal';
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
