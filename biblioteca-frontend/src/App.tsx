import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

interface Livro {
  id: number;
  titulo: string;
  autor: string;
}

function App() {
  const [livros, setLivros] = useState<Livro[]>([]); // Estado para armazenar os dados dos livros

  useEffect(() => {
    // Função para buscar os livros da API
    const fetchLivros = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8001/api/livros/'); // Certifique-se de usar a URL correta do backend
        setLivros(response.data); // Define o estado com os dados retornados
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      }
    };

    fetchLivros();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Biblioteca Online</h1>
        <h2>Lista de Livros</h2>
        <ul>
          {livros.length > 0 ? (
            livros.map((livro) => (
              <li key={livro.id}>
                <strong>{livro.titulo}</strong> - {livro.autor}
              </li>
            ))
          ) : (
            <p>Nenhum livro encontrado.</p>
          )}
        </ul>
      </header>
    </div>
  );
}

export default App;
