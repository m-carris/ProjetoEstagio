// servidor.js
// Servidor do Sistema de Notificações do Coordenador
// Este é o "cérebro" do projeto — recebe e envia informação

// ==========================================
// CARREGAR FERRAMENTAS DO NODE.JS
// ==========================================
// require() carrega módulos (ferramentas) que vêm com o Node.js
var http = require('http');   // Para criar o servidor web
var fs = require('fs');       // Para ler e guardar ficheiros
var path = require('path');   // Para trabalhar com caminhos de ficheiros
var url = require('url');     // Para analisar URLs

// ==========================================
// CONFIGURAÇÃO
// ==========================================
var PORTA = 3000;
var CAMINHO_UTILIZADORES = path.join(__dirname, 'dados', 'utilizadores.json');
var CAMINHO_MENSAGENS = path.join(__dirname, 'dados', 'mensagens.json');

// ==========================================
// TEMPLATES DE MENSAGENS RÁPIDAS
// ==========================================
var templates = [
  { id: 1, titulo: 'Acidente', icone: '🚗', texto: 'Atenção: acidente reportado.' },
  { id: 2, titulo: 'Trânsito intenso', icone: '🚦', texto: 'Aviso: trânsito intenso na zona.' },
  { id: 3, titulo: 'Avaria', icone: '🔧', texto: 'Informação: avaria reportada.' },
  { id: 4, titulo: 'Desvio', icone: '↩️', texto: 'Atenção: desvio em vigor.' },
  { id: 5, titulo: 'Informação', icone: 'ℹ️', texto: 'Informação geral para os operadores.' }
];

// ==========================================
// GARANTIR QUE OS FICHEIROS DE DADOS EXISTEM
// ==========================================
// Quando o servidor arranca pela primeira vez, cria os ficheiros se não existirem

if (!fs.existsSync(path.join(__dirname, 'dados'))) {
  fs.mkdirSync(path.join(__dirname, 'dados'));
}

if (!fs.existsSync(CAMINHO_UTILIZADORES)) {
  var utilizadoresPadrao = [
    {
      id: 1,
      nome: 'Coordenador',
      email: 'coord@teste.com',
      password: '123456',
      tipo: 'coordenador',
      token: ''
    }
  ];
  fs.writeFileSync(CAMINHO_UTILIZADORES, JSON.stringify(utilizadoresPadrao, null, 2));
  console.log('Ficheiro de utilizadores criado com conta padrão.');
}

if (!fs.existsSync(CAMINHO_MENSAGENS)) {
  fs.writeFileSync(CAMINHO_MENSAGENS, JSON.stringify([], null, 2));
  console.log('Ficheiro de mensagens criado.');
}

// ==========================================
// FUNÇÕES PARA LER E GUARDAR DADOS
// ==========================================

// Ler dados de um ficheiro JSON
function lerFicheiro(caminho) {
  var conteudo = fs.readFileSync(caminho, 'utf8');
  return JSON.parse(conteudo);
}

// Guardar dados num ficheiro JSON
function guardarFicheiro(caminho, dados) {
  var texto = JSON.stringify(dados, null, 2);
  fs.writeFileSync(caminho, texto);
}

// ==========================================
// FUNÇÕES AUXILIARES
// ==========================================

// Gerar um token aleatório (como uma "password temporária" para identificar o utilizador)
function gerarToken() {
  var letras = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var token = '';
  for (var i = 0; i < 32; i++) {
    var posicao = Math.floor(Math.random() * letras.length);
    token = token + letras[posicao];
  }
  return token;
}

// Gerar um ID único para um novo item numa lista
function gerarId(lista) {
  if (lista.length === 0) {
    return 1;
  }
  var maiorId = 0;
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].id > maiorId) {
      maiorId = lista[i].id;
    }
  }
  return maiorId + 1;
}

// Enviar uma resposta JSON ao browser
function enviarJSON(res, codigo, dados) {
  res.writeHead(codigo, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(dados));
}

// Ler o corpo (body) de um pedido POST
function lerCorpo(req, callback) {
  var corpo = '';
  req.on('data', function(pedaco) {
    corpo = corpo + pedaco;
  });
  req.on('end', function() {
    if (corpo === '') {
      callback(null);
    } else {
      try {
        callback(JSON.parse(corpo));
      } catch (erro) {
        callback(null);
      }
    }
  });
}

// Verificar se o pedido tem um token válido
function verificarToken(req) {
  var cabecalho = req.headers['authorization'];
  if (!cabecalho) {
    return null;
  }
  // O token vem no formato: "Bearer abc123..."
  var partes = cabecalho.split(' ');
  if (partes.length !== 2) {
    return null;
  }
  if (partes[0] !== 'Bearer') {
    return null;
  }
  var token = partes[1];
  var utilizadores = lerFicheiro(CAMINHO_UTILIZADORES);
  for (var i = 0; i < utilizadores.length; i++) {
    if (utilizadores[i].token === token && token !== '') {
      return utilizadores[i];
    }
  }
  return null;
}

// Servir um ficheiro estático (HTML, CSS, JS, imagens)
function servirFicheiro(caminhoFicheiro, res) {
  var extensao = path.extname(caminhoFicheiro);
  var tipos = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.json': 'application/json; charset=utf-8',
    '.ico': 'image/x-icon'
  };
  var tipo = tipos[extensao];
  if (!tipo) {
    tipo = 'text/plain; charset=utf-8';
  }

  try {
    var conteudo = fs.readFileSync(caminhoFicheiro);
    res.writeHead(200, { 'Content-Type': tipo });
    res.end(conteudo);
  } catch (erro) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Ficheiro não encontrado');
  }
}

// ==========================================
// CRIAR O SERVIDOR HTTP
// ==========================================

var servidor = http.createServer(function(req, res) {
  var partes = url.parse(req.url, true);
  var caminho = partes.pathname;
  var metodo = req.method;

  // Adicionar cabeçalhos CORS
  // (permite que o browser e a extensão Chrome comuniquem com o servidor)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Responder a pedidos OPTIONS (necessário para CORS)
  if (metodo === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Ignorar pedidos de favicon
  if (caminho === '/favicon.ico') {
    res.writeHead(204);
    res.end();
    return;
  }

  // ==========================================
  // ROTAS DA API
  // ==========================================

  // --- REGISTAR NOVO UTILIZADOR ---
  if (caminho === '/api/registar' && metodo === 'POST') {
    lerCorpo(req, function(dados) {
      // Verificar se todos os campos foram enviados
      if (!dados || !dados.nome || !dados.email || !dados.password) {
        enviarJSON(res, 400, { erro: 'Faltam dados. Envia: nome, email, password' });
        return;
      }

      // Verificar tamanho da password
      if (dados.password.length < 6) {
        enviarJSON(res, 400, { erro: 'A password tem de ter pelo menos 6 caracteres' });
        return;
      }

      var utilizadores = lerFicheiro(CAMINHO_UTILIZADORES);

      // Verificar se o email já existe
      for (var i = 0; i < utilizadores.length; i++) {
        if (utilizadores[i].email === dados.email) {
          enviarJSON(res, 400, { erro: 'Este email já está registado' });
          return;
        }
      }

      // Criar novo utilizador
      var novo = {
        id: gerarId(utilizadores),
        nome: dados.nome,
        email: dados.email,
        password: dados.password,
        tipo: dados.tipo || 'operador',
        token: ''
      };

      utilizadores.push(novo);
      guardarFicheiro(CAMINHO_UTILIZADORES, utilizadores);

      console.log('Novo utilizador registado: ' + novo.nome + ' (' + novo.email + ')');
      enviarJSON(res, 201, { mensagem: 'Utilizador registado com sucesso', id: novo.id });
    });
    return;
  }

  // --- LOGIN ---
  if (caminho === '/api/login' && metodo === 'POST') {
    lerCorpo(req, function(dados) {
      // Verificar se os campos foram enviados
      if (!dados || !dados.email || !dados.password) {
        enviarJSON(res, 400, { erro: 'Faltam dados. Envia: email, password' });
        return;
      }

      var utilizadores = lerFicheiro(CAMINHO_UTILIZADORES);
      var encontrado = null;

      // Procurar o utilizador pelo email e password
      for (var i = 0; i < utilizadores.length; i++) {
        if (utilizadores[i].email === dados.email && utilizadores[i].password === dados.password) {
          encontrado = utilizadores[i];
          break;
        }
      }

      if (!encontrado) {
        enviarJSON(res, 401, { erro: 'Email ou password incorretos' });
        return;
      }

      // Gerar novo token e guardar
      var token = gerarToken();
      encontrado.token = token;
      guardarFicheiro(CAMINHO_UTILIZADORES, utilizadores);

      console.log('Login feito: ' + encontrado.nome);
      enviarJSON(res, 200, {
        mensagem: 'Login feito com sucesso',
        token: token,
        nome: encontrado.nome,
        tipo: encontrado.tipo
      });
    });
    return;
  }

  // --- OBTER TEMPLATES DE MENSAGENS RÁPIDAS ---
  if (caminho === '/api/templates' && metodo === 'GET') {
    enviarJSON(res, 200, templates);
    return;
  }

  // --- PESQUISAR MENSAGENS ---
  if (caminho === '/api/mensagens/pesquisa' && metodo === 'GET') {
    var parametros = partes.query;
    var textoPesquisa = parametros.texto || '';
    var prioridadePesquisa = parametros.prioridade || '';

    var todasMensagens = lerFicheiro(CAMINHO_MENSAGENS);
    var resultados = [];

    for (var i = 0; i < todasMensagens.length; i++) {
      var msg = todasMensagens[i];
      var textoOk = true;
      var prioridadeOk = true;

      if (textoPesquisa !== '') {
        textoOk = msg.texto.toLowerCase().indexOf(textoPesquisa.toLowerCase()) !== -1;
      }
      if (prioridadePesquisa !== '') {
        prioridadeOk = msg.prioridade === prioridadePesquisa;
      }

      if (textoOk && prioridadeOk) {
        resultados.push(msg);
      }
    }

    enviarJSON(res, 200, resultados);
    return;
  }

  // --- OBTER TODAS AS MENSAGENS ---
  if (caminho === '/api/mensagens' && metodo === 'GET') {
    var mensagens = lerFicheiro(CAMINHO_MENSAGENS);
    enviarJSON(res, 200, mensagens);
    return;
  }

  // --- CRIAR NOVA MENSAGEM ---
  if (caminho === '/api/mensagens' && metodo === 'POST') {
    // Verificar se o utilizador está autenticado
    var utilizador = verificarToken(req);
    if (!utilizador) {
      enviarJSON(res, 401, { erro: 'Tens de fazer login primeiro' });
      return;
    }

    lerCorpo(req, function(dados) {
      if (!dados || !dados.texto) {
        enviarJSON(res, 400, { erro: 'Falta o texto da mensagem' });
        return;
      }

      var mensagens = lerFicheiro(CAMINHO_MENSAGENS);

      // Criar a nova mensagem
      var nova = {
        id: gerarId(mensagens),
        texto: dados.texto,
        prioridade: dados.prioridade || 'normal',
        autor: utilizador.nome,
        dataCriacao: new Date().toISOString()
      };

      // Adicionar no início da lista (mais recentes primeiro)
      var novaLista = [nova];
      for (var i = 0; i < mensagens.length; i++) {
        novaLista.push(mensagens[i]);
      }

      guardarFicheiro(CAMINHO_MENSAGENS, novaLista);

      console.log('Nova mensagem: ' + nova.texto + ' (prioridade: ' + nova.prioridade + ')');
      enviarJSON(res, 201, nova);
    });
    return;
  }

  // ==========================================
  // SERVIR FICHEIROS DO PORTAL (HTML, CSS, JS)
  // ==========================================

  // Se não é uma rota da API, tentar servir um ficheiro da pasta "portal"
  var ficheiro = caminho;
  if (ficheiro === '/') {
    ficheiro = '/index.html';
  }

  // Proteção: garantir que o caminho não sai da pasta "portal"
  // (evita ataques de path traversal como "../../etc/passwd")
  var pastaPortal = path.join(__dirname, 'portal');
  var caminhoFicheiro = path.normalize(path.join(pastaPortal, ficheiro));
  if (caminhoFicheiro.indexOf(pastaPortal) !== 0) {
    res.writeHead(403);
    res.end('Acesso negado');
    return;
  }

  servirFicheiro(caminhoFicheiro, res);
});

// ==========================================
// INICIAR O SERVIDOR
// ==========================================

servidor.listen(PORTA, function() {
  console.log('=========================================');
  console.log(' Servidor a funcionar!');
  console.log(' Abre o browser em: http://localhost:' + PORTA);
  console.log('=========================================');
  console.log('');
  console.log(' Conta padrão:');
  console.log('   Email: coord@teste.com');
  console.log('   Password: 123456');
  console.log('');
});
