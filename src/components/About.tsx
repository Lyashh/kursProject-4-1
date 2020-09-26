import React from "react";
import { Col, Row, Container } from "react-bootstrap";

class About extends React.Component {
  render() {
    return (
      <Container fluid={true} id="home-wrap">
        <Row>
          <Col md={6} className="mx-auto">
            <h2>Курсовий проект:</h2>
            <h4>Розробив студент групи КІТ-617б:</h4>
            <p>Ляш Олександр</p>
            <h4>Завдання:</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
              alias blanditiis soluta, deleniti quod quibusdam doloribus et
              asperiores, error excepturi aliquam? Rem modi repudiandae
              corporis. Sint, tempora dolorum! Ea, eos.
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default About;
