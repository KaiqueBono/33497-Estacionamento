const API = 'http://cnms-parking-api.net.uztec.com.br/api/v1';

// Funções Utilitárias

async function fetchData(url, options = {}) {
  const res = await fetch(url, options);
  return res.json();
}

function updateOutput(id, data) {
  document.getElementById(id).textContent = JSON.stringify(data, null, 2);
}

function getInputValue(id) {
  return document.getElementById(id).value.trim();
}

// Visualização de Dados

async function verSlots() {
  const data = await fetchData(`${API}/slots`);
  updateOutput('slots', data);
}

async function listarAtivos() {
  const data = await fetchData(`${API}/active`);
  updateOutput('ativos', data);
}

async function verTempo() {
  const plate = getInputValue('tempoPlaca');
  const data = await fetchData(`${API}/time/${plate}`);
  updateOutput('tempo', data);
}

async function gerarRelatorio() {
  const data = await fetchData(`${API}/report`);
  updateOutput('relatorio', data);
}

// Entrada de Veículos

async function registrarEntrada() {
  const plate = getInputValue('entradaPlaca');
  const model = getInputValue('entradaModelo');

  if (!plate) {
    alert('Por favor, digite ao menos um caractere na placa.');
    document.getElementById('entradaPlaca').focus();
    return;
  }

  if (!model) {
    alert('Por favor, digite o modelo do carro.');
    document.getElementById('entradaModelo').focus();
    return;
  }

  const data = await fetchData(`${API}/entry`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ plate, model })
  });

  updateOutput('entrada', data);
}

// Verificação e Atualização

async function checkVeiculo() {
  const plate = getInputValue('checkPlaca');
  const data = await fetchData(`${API}/check/${plate}`);
  updateOutput('check', data);
}

async function atualizarVeiculo() {
  const oldPlate = getInputValue('updatePlaca');
  const newPlate = getInputValue('novaPlaca');

  const data = await fetchData(`${API}/update/${oldPlate}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ plate: newPlate })
  });

  updateOutput('update', data);
}

// Saída e Cancelamento

async function registrarSaida() {
  const plate = getInputValue('saidaPlaca');
  const data = await fetchData(`${API}/exit/${plate}`, { method: 'PATCH' });
  updateOutput('saida', data);
}

async function cancelarRegistro() {
  const plate = getInputValue('cancelarPlaca');
  const data = await fetchData(`${API}/cancel/${plate}`, { method: 'DELETE' });
  updateOutput('cancelar', data);
}