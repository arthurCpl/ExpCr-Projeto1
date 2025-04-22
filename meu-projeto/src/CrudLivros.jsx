import { useState, useEffect } from 'react'
import './App.css'
import './ListagemLivros.jsx'

function App() {
  const [livros, setLivros] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingLivro, setEditingLivro] = useState(null)
  
  const [novoLivro, setNovoLivro] = useState({
    titulo: '',
    autor: '',
    genero: '',
    ano: ''
  })
  
  

  const fetchLivros = () => {
    fetch('http://localhost:8800/livros')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`)
        }
        return response.json()
      })
      .then(data => {
        setLivros(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Erro:', err)
        setError(err.message)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchLivros()
  }, [])

  const handleEdit = (livro) => {
    setEditingLivro({...livro})
  }

  const handleUpdate = () => {
    console.log("Tentando atualizar:", editingLivro);
  
    fetch(`http://localhost:8800/livros/${editingLivro.idlivro}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        titulo: editingLivro.titulo,
        autor: editingLivro.autor,
        genero: editingLivro.genero,
        ano: editingLivro.ano
      })
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          console.error(`Erro detalhado: ${text}`);
          throw new Error(`Erro ${response.status}: ${text}`);
        });
      }
      return response.json();
    })
    .then(() => {
      fetchLivros();
      setEditingLivro(null);
    })
    .catch(err => {
      console.error('Erro ao atualizar livro:', err);
      alert(`Erro ao atualizar livro: ${err.message}`);
    });
  };
  
  

  const handleDelete = (idlivro) => {
    if (window.confirm('Tem certeza que deseja excluir este livro?')) {
      fetch(`http://localhost:8800/livros/${idlivro}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao excluir livro')
        }
        return response.json()
      })
      .then(() => {
        fetchLivros()
      })
      .catch(err => {
        console.error('Erro:', err)
        alert('Erro ao excluir livro')
      })
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditingLivro(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCreateLivro = (e) => {
    e.preventDefault()

    if (!novoLivro.titulo || !novoLivro.autor || !novoLivro.genero || !novoLivro.ano) {
      alert('Preencha todos os campos')
      return
    }

    fetch('http://localhost:8800/livros', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        titulo: novoLivro.titulo,
        autor: novoLivro.autor,
        genero: novoLivro.genero,
        ano: novoLivro.ano
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao criar livro')
      }
      return response.json()
    })
    .then(() => {
      setNovoLivro({ titulo: '', autor: '', genero: '', ano: '' })
      fetchLivros()
    })
    .catch(err => {
      console.error('Erro:', err)
      alert('Erro ao criar livro')
    })
  }

  const handleNovoLivroChange = (e) => {
    const { name, value } = e.target
    setNovoLivro(prev => ({
      ...prev,
      [name]: value
    }))
  }

  if (loading) return <div>Carregando...</div>
  if (error) return <div>Erro: {error}</div>

  return (
    <div className="container">
      <div className="criar-livro">
        <h2>Criar Novo Livro</h2>
        <form onSubmit={handleCreateLivro}>
          <input 
            type="text" 
            name="titulo"
            placeholder="Título" 
            value={novoLivro.titulo}
            onChange={handleNovoLivroChange}
            required
          />
          <input 
            type="text" 
            name="autor"
            placeholder="Autor" 
            value={novoLivro.autor}
            onChange={handleNovoLivroChange}
            required
          />
          <input 
            type="text" 
            name="genero"
            placeholder="Gênero" 
            value={novoLivro.genero}
            onChange={handleNovoLivroChange}
            required
          />
          <input 
            type="number" 
            name="ano"
            placeholder="Ano" 
            value={novoLivro.ano}
            onChange={handleNovoLivroChange}
            required
          />
          <button type="submit">Adicionar Livro</button>
        </form>
      </div>

      <h2>Feito por: Arthur Capellazzi</h2>
      <h1>Lista de Livros</h1>
      {livros.length === 0 ? (
        <div>Nenhum livro encontrado</div>
      ) : (
        <ul className="livro-lista">
          {livros.map(livro => (
            <li key={livro.idlivro} className="livro-item">
              {editingLivro && editingLivro.idlivro === livro.idlivro ? (
                <div>
                  <input 
                    type="text" 
                    name="titulo" 
                    value={editingLivro.titulo} 
                    onChange={handleInputChange}
                    placeholder="Título"
                  />
                  <input 
                    type="text" 
                    name="autor" 
                    value={editingLivro.autor} 
                    onChange={handleInputChange}
                    placeholder="Autor"
                  />
                  <input 
                    type="text" 
                    name="genero" 
                    value={editingLivro.genero} 
                    onChange={handleInputChange}
                    placeholder="Gênero"
                  />
                  <input 
                    type="number" 
                    name="ano" 
                    value={editingLivro.ano} 
                    onChange={handleInputChange}
                    placeholder="Ano"
                  />
                  <button onClick={handleUpdate}>Salvar</button>
                  <button onClick={() => setEditingLivro(null)}>Cancelar</button>
                </div>
              ) : (
                <div>
                  <strong>ID:</strong> {livro.idlivro} <br />
                  <strong>Título:</strong> {livro.titulo} <br />
                  <strong>Autor:</strong> {livro.autor} <br />
                  <strong>Gênero:</strong> {livro.genero} <br />
                  <strong>Ano:</strong> {livro.ano} <br />
                  <button onClick={() => handleEdit(livro)}>Editar</button>
                  <button onClick={() => handleDelete(livro.idlivro)}>Excluir</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
