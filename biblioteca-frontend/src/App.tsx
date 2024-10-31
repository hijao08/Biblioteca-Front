import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Livro {
  id: number;
  titulo: string;
  autor: string;
  disponivel: boolean;
  imagem: string | null;
}

function App() {
  const [livros, setLivros] = useState<Livro[]>([]);

  const fetchLivros = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/livros/');
      setLivros(response.data);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    }
  };

  useEffect(() => {
    fetchLivros();
  }, []);

  return (
    <Container>
      <h1 className="text-center mt-4">Biblioteca Online</h1>
      <h2 className="text-center mb-4">Lista de Livros</h2>

      <Row>
        {livros.length > 0 ? (
          livros.map((livro) => (
            <Col md={2.5} sm={2} xs={12} className="mb-4" key={livro.id}>
              <Card>
                {/* Exibe a imagem do livro */}
                {livro.imagem && (
                  <Card.Img variant="top" width={40} src={livro.imagem} alt={livro.titulo} />
                )}
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
