// popup.js
// Mostra as mensagens guardadas quando o utilizador clica na extensão

// Obter as mensagens que estão guardadas no storage da extensão
chrome.storage.local.get('mensagens', function(dados) {
  var mensagens = dados.mensagens || [];
  var container = document.getElementById('lista-mensagens');

  // Se não há mensagens, mostrar aviso
  if (mensagens.length === 0) {
    container.innerHTML = '<p class="vazio">Nenhuma mensagem recebida ainda.</p>';
    return;
  }

  // Construir o HTML das mensagens
  var html = '';

  for (var i = 0; i < mensagens.length; i++) {
    var m = mensagens[i];

    // Definir classe e etiqueta com base na prioridade
    var classe = 'mensagem';
    var etiqueta = '<span class="etiqueta-normal">🟢 Normal</span>';

    if (m.prioridade === 'alta') {
      classe = 'mensagem alta';
      etiqueta = '<span class="etiqueta-alta">🔴 ALTA</span>';
    }

    // Formatar a data
    var data = new Date(m.dataCriacao);
    var dataTexto = data.toLocaleDateString('pt-PT') + ' ' + data.toLocaleTimeString('pt-PT');

    // Construir o cartão da mensagem
    html = html + '<div class="' + classe + '">';
    html = html + '  <div class="mensagem-topo">';
    html = html + '    ' + etiqueta;
    html = html + '    <span class="data">' + dataTexto + '</span>';
    html = html + '  </div>';
    html = html + '  <div class="texto">' + m.texto + '</div>';
    html = html + '</div>';
  }

  container.innerHTML = html;
});
