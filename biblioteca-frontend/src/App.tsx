import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Importa o arquivo CSS

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
    <Container className="container-custom">
      <h1 className="title-main">Biblioteca Online</h1>
      <h2 className="title-sub">Lista de Livros</h2>

      <Row>
        {livros.length > 0 ? (
          livros.map((livro) => (
            <Col md={3} sm={6} xs={12} className="mb-4" key={livro.id}>
              <Card className="card-custom">
                {livro.imagem && (
                  <Card.Img variant="top" src={livro.imagem} alt={livro.titulo} className="card-img" />
                )}
                <Card.Body>
                  <Card.Title className="card-title">{livro.titulo}</Card.Title>
                  <Card.Text className="card-text-muted">
                    <strong>Autor:</strong> {livro.autor}
                  </Card.Text>
                  <Badge
                    pill
                    bg={livro.disponivel ? "success" : "danger"}
                    className="badge-availability"
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
