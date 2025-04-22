import { useState } from 'react'

function DetalhesLivro() {
  const [id, setId] = useState('')
  const [livro, setLivro] = useState(null)

  const buscarDetalhes = () => {
    fetch(`http://localhost:8800/livros/${id}`)
      .then(res => res.json())
      .then(data => setLivro(data))
  }

  return (
    <div>
      <h2>Detalhes do Livro</h2>
      <input 
        type="number" 
        placeholder="ID do livro" 
        value={id} 
        onChange={e => setId(e.target.value)} 
      />
      <button onClick={buscarDetalhes}>Buscar</button>
      {livro && (
        <div>
          <p><strong>ID:</strong> {livro.idlivro}</p>
          <p><strong>Título:</strong> {livro.titulo}</p>
          <p><strong>Autor:</strong> {livro.autor}</p>
          <p><strong>Gênero:</strong> {livro.genero}</p>
          <p><strong>Ano:</strong> {livro.ano}</p>
        </div>
      )}
    </div>
  )
}

export default DetalhesLivro
