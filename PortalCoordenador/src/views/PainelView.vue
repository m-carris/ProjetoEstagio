<!-- ====================================================
     PainelView.vue — Painel principal do coordenador
     ==================================================== -->
<template>
  <div class="painel">
    <!-- Cabeçalho -->
    <header class="cabecalho">
      <h1>📢 Painel do Coordenador</h1>
      <button class="btn-sair" @click="sair">Sair</button>
    </header>

    <!-- Formulário de envio de mensagem -->
    <section class="secao-envio">
      <h2>Enviar Nova Mensagem</h2>

      <!-- Templates rápidos -->
      <div class="templates">
        <button class="btn-template" @click="usarTemplate('Acidente')">
          🚗 Acidente
        </button>
        <button class="btn-template" @click="usarTemplate('Trânsito intenso')">
          🚦 Trânsito intenso
        </button>
        <button class="btn-template" @click="usarTemplate('Avaria')">
          🔧 Avaria
        </button>
        <button class="btn-template" @click="usarTemplate('Desvio')">
          ↩️ Desvio
        </button>
      </div>

      <textarea
        v-model="textoMensagem"
        placeholder="Escreve a mensagem para os operadores..."
        rows="3"
      ></textarea>

      <div class="acoes-envio">
        <select v-model="prioridade">
          <option value="normal">🟢 Normal</option>
          <option value="alta">🔴 Alta Prioridade</option>
        </select>
        <button class="btn-enviar" @click="enviarMensagem" :disabled="!textoMensagem.trim()">
          📤 Enviar Mensagem
        </button>
      </div>
    </section>

    <!-- Histórico de mensagens -->
    <section class="secao-historico">
      <h2>📜 Histórico de Mensagens</h2>

      <!-- Pesquisa -->
      <input
        v-model="termoPesquisa"
        type="text"
        placeholder="🔍 Pesquisar mensagens..."
        class="input-pesquisa"
      />

      <!-- Lista de mensagens -->
      <div v-if="mensagensFiltradas.length === 0" class="sem-mensagens">
        Nenhuma mensagem encontrada.
      </div>

      <div
        v-for="msg in mensagensFiltradas"
        :key="msg.id"
        class="card-mensagem"
        :class="{ 'prioridade-alta': msg.prioridade === 'alta' }"
      >
        <div class="card-cabecalho">
          <span class="badge" :class="msg.prioridade === 'alta' ? 'badge-alta' : 'badge-normal'">
            {{ msg.prioridade === 'alta' ? '🔴 ALTA' : '🟢 Normal' }}
          </span>
          <span class="data">
            {{ new Date(msg.dataCriacao).toLocaleString('pt-PT') }}
          </span>
        </div>
        <p class="texto-mensagem">{{ msg.texto }}</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { io } from 'socket.io-client';
import api from '../services/api';

// ==========================================
// TIPOS
// ==========================================
interface Mensagem {
  id: number;
  texto: string;
  prioridade: 'normal' | 'alta';
  dataCriacao: string;
}

// ==========================================
// VARIÁVEIS REATIVAS
// ==========================================
const textoMensagem = ref('');
const prioridade = ref<'normal' | 'alta'>('normal');
const mensagens = ref<Mensagem[]>([]);
const termoPesquisa = ref('');
const router = useRouter();

// ==========================================
// COMPUTED — valores calculados automaticamente
// ==========================================
const mensagensFiltradas = computed(function () {
  if (!termoPesquisa.value.trim()) {
    return mensagens.value;
  }
  const termo = termoPesquisa.value.toLowerCase();
  return mensagens.value.filter(function (m) {
    return m.texto.toLowerCase().includes(termo);
  });
});

// ==========================================
// FUNÇÕES
// ==========================================

// Buscar todas as mensagens ao carregar a página
const carregarMensagens = async function () {
  try {
    const resposta = await api.get('/mensagens');
    mensagens.value = resposta.data;
  } catch (e) {
    console.error('Erro ao carregar mensagens:', e);
  }
};

// Fazer logout
const sair = function () {
  localStorage.removeItem('token');
  router.push('/');
};

// Enviar uma nova mensagem
const enviarMensagem = async function () {
  if (!textoMensagem.value.trim()) return;

  try {
    const resposta = await api.post('/mensagens', {
      texto: textoMensagem.value,
      prioridade: prioridade.value,
    });

    // Adicionar a nova mensagem ao início da lista
    mensagens.value.unshift(resposta.data);

    // Limpar o formulário
    textoMensagem.value = '';
    prioridade.value = 'normal';
  } catch (e: unknown) {
    const err = e as { response?: { status?: number } };
    if (err.response && err.response.status === 401) {
      alert('Sessão expirada. Faz login novamente.');
      sair();
    } else {
      alert('Erro ao enviar mensagem');
    }
  }
};

// Usar um template rápido
const usarTemplate = function (texto: string) {
  textoMensagem.value = texto + ': ';
};

// Carregar mensagens quando o componente é montado
onMounted(function () {
  if (!localStorage.getItem('token')) {
    router.push('/');
    return;
  }
  carregarMensagens();

  // Ligar ao WebSocket para receber mensagens em tempo real
  const socket = io('http://localhost:3000');

  socket.on('nova-mensagem', function (mensagem: Mensagem) {
    const existe = mensagens.value.some(function (m) {
      return m.id === mensagem.id;
    });
    if (!existe) {
      mensagens.value.unshift(mensagem);
    }
  });
});
</script>

<style scoped>
.painel {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.cabecalho {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #eee;
}

.btn-sair {
  padding: 8px 16px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.secao-envio,
.secao-historico {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
}

.templates {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.btn-template {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: #f8f9fa;
  cursor: pointer;
  font-size: 13px;
}

.btn-template:hover {
  background: #e9ecef;
}

textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  box-sizing: border-box;
  font-family: inherit;
}

.acoes-envio {
  display: flex;
  gap: 12px;
  margin-top: 12px;
}

select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.btn-enviar {
  flex: 1;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

.btn-enviar:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.input-pesquisa {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 16px;
  box-sizing: border-box;
}

.card-mensagem {
  background: #f8f9fa;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 8px;
  border-left: 4px solid #2ecc71;
}

.card-mensagem.prioridade-alta {
  border-left-color: #e74c3c;
  background: #fdf2f2;
}

.card-cabecalho {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.badge {
  font-size: 12px;
  font-weight: bold;
}

.badge-alta { color: #e74c3c; }
.badge-normal { color: #2ecc71; }

.data {
  font-size: 12px;
  color: #999;
}

.texto-mensagem {
  margin: 0;
  font-size: 14px;
}

.sem-mensagens {
  text-align: center;
  color: #999;
  padding: 20px;
}
</style>
