<!-- ====================================================
     LoginView.vue — Página de Login
     ==================================================== -->
<template>
  <div class="login-container">
    <div class="login-card">
      <h1>🔔 Sistema de Notificações</h1>
      <h2>Login do Coordenador</h2>

      <form @submit.prevent="fazerLogin">
        <div class="campo">
          <label for="email">Email:</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="exemplo@carris.pt"
            required
          />
        </div>

        <div class="campo">
          <label for="password">Password:</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="A tua password"
            required
          />
        </div>

        <p v-if="erro" class="erro">{{ erro }}</p>

        <button type="submit" :disabled="aCarregar">
          {{ aCarregar ? 'A entrar...' : 'Entrar' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const email = ref('');
const password = ref('');
const erro = ref('');
const aCarregar = ref(false);

const router = useRouter();

const fazerLogin = async function () {
  erro.value = '';
  aCarregar.value = true;

  try {
    const resposta = await api.post('/auth/login', {
      email: email.value,
      password: password.value,
    });

    localStorage.setItem('token', resposta.data.access_token);
    router.push('/painel');
  } catch (e: unknown) {
    const err = e as { response?: { data?: { message?: string } } };
    if (err.response && err.response.data && err.response.data.message) {
      erro.value = err.response.data.message;
    } else {
      erro.value = 'Erro ao fazer login. Verifica a ligação ao servidor.';
    }
  } finally {
    aCarregar.value = false;
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
}

.login-card {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h1 {
  margin-bottom: 8px;
  color: #2c3e50;
}

h2 {
  margin-bottom: 24px;
  color: #7f8c8d;
  font-weight: normal;
  font-size: 16px;
}

.campo {
  margin-bottom: 16px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
  color: #555;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
}

input:focus {
  border-color: #3498db;
  outline: none;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 8px;
}

button:hover {
  background-color: #2980b9;
}

button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.erro {
  color: #e74c3c;
  margin-top: 8px;
}
</style>
