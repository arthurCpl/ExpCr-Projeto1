import React, { useEffect, useState } from 'react';
import './App.css'

function ListagemLivros() {
  const [livros, setLivros] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8800/livros')
      .then(res => res.json())
      .then(data => setLivros(data))
      .catch(err => {
        console.error(err);
        setErro('Erro ao buscar livros');
      });
  }, []);

  return (
    <div>
      <h1>Lista de Livros</h1>

      {erro && <p>{erro}</p>}

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Gênero</th>
            <th>Ano</th>
          </tr>
        </thead>
        <tbody>
          {livros.map(livro => (
            <tr key={livro.idlivro}>
              <td>{livro.idlivro}</td>
              <td>{livro.titulo}</td>
              <td>{livro.autor}</td>
              <td>{livro.genero}</td>
              <td>{livro.ano || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListagemLivros;
