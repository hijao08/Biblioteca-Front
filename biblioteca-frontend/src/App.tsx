import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Badge, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Interface para tipagem dos dados do livro
interface Livro {
  id: number;
  titulo: string;
  autor: string;
  disponivel: boolean;
}

function App() {
  const [livros, setLivros] = useState<Livro[]>([]);

  // Função para buscar os livros da API
  const fetchLivros = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/livros/');
      setLivros(response.data);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    }
  };

  useEffect(() => {
    fetchLivros(); // Chama a função ao montar o componente
  }, []);

  return (
    <Container>
      <h1 className="text-center mt-4">Biblioteca Online</h1>
      <h2 className="text-center mb-4">Lista de Livros</h2>
      
      {/* Botão para atualizar os livros */}
      <div className="text-center mb-4">
        <Button variant="primary" onClick={fetchLivros}>
          Atualizar Livros
        </Button>
      </div>

      <Row>
        {livros.length > 0 ? (
          livros.map((livro) => (
            <Col md={4} sm={6} xs={12} className="mb-4" key={livro.id}>
              <Card>
                <Card.Body>
                  <Card.Title>{livro.titulo}</Card.Title>
                  <Card.Text>
                    <strong>Autor:</strong> {livro.autor}
                  </Card.Text>
                  <Badge
                    pill
                    bg={livro.disponivel ? "success" : "danger"}
                    className="mt-2"
                  >
                    {livro.disponivel ? "Disponível" : "Indisponível"}
                  </Badge>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">Nenhum livro encontrado.</p>
        )}
      </Row>
    </Container>
  );
}

export default App;
