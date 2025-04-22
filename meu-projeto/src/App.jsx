// src/App.jsx
import React, { useState } from 'react'
import ListagemLivros from './ListagemLivros'
import CrudLivros from './CrudLivros'
import DetalhesLivro from './DetalhesLivro'
import './App.css'

function App() {
  const [tela, setTela] = useState('home')

  return (
    <div className="App container">
      {tela === 'home' && (
        <div className="home">
          <h2>Feito por: Arthur Capellazzi</h2>
          <h1>Bem-vindo ao Sistema de Livros</h1>
          <button onClick={() => setTela('listagem')}>📚 Listar Livros</button>
          <button onClick={() => setTela('crud')}>✏️ Cadastrar / Editar / Excluir</button>
          <button onClick={() => setTela('detalhes')}>🔍 Visão Detalhada</button>
        </div>
      )}

      {tela === 'listagem' && (
        <div>
          <button onClick={() => setTela('home')}>← Voltar</button>
          <ListagemLivros />
        </div>
      )}

      {tela === 'crud' && (
        <div>
          <button onClick={() => setTela('home')}>← Voltar</button>
          <CrudLivros />
        </div>
      )}

      {tela === 'detalhes' && (
        <div>
          <button onClick={() => setTela('home')}>← Voltar</button>
          <DetalhesLivro />
        </div>
      )}
    </div>
  )
}

export default App
