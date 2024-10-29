import React from 'react';

interface LivroProps {
  id: React.Key;
  titulo: string;
  autor: string;
}

interface LivroListProps {
  livros: LivroProps[];
}

const LivroList: React.FC<LivroListProps> = ({ livros }) => (
  <div>
     {livros.map((livro) => (
      <div key={livro.id} className="card">
        <h5>{livro.titulo}</h5>
        <p>{livro.autor}</p>
      </div>
    ))}
  </div>
);

export default LivroList;
