import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { HomeState } from "../types/states";
import Files from "./tasks/Files";
import Individual from "./tasks/Individual";
import Stack from "./tasks/Stack";

class Home extends React.Component<{}, HomeState> {
  private tasks: any;

  constructor(props: {}) {
    super(props);
    this.state = {
      greeting: true,
      currentTusk: "files",
      stack: true,
    };

    this.tasks = {
      files: <Files />,
      individual: <Individual />,
      stack: <Stack />,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ greeting: false });
    }, 10000);
  }

  render() {
    const greeting = (
      <Col md={6} className="mx-auto">
        <h2>Курсовий проект:</h2>
        <h4>Розробив студент групи КІТ-617б:</h4>
        <p>Ляш Олександр</p>
        <h4>Завдання:</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
          alias blanditiis soluta, deleniti quod quibusdam doloribus et
          asperiores, error excepturi aliquam? Rem modi repudiandae corporis.
          Sint, tempora dolorum! Ea, eos.
        </p>
        <Button
          variant="primary"
          onClick={() => this.setState({ greeting: false })}
        >
          Закрити
        </Button>
      </Col>
    );

    const task = this.tasks[this.state.currentTusk];

    const content = (
      <Col md={9} className="mx-auto">
        <Row>
          <Col md={4}>
            <a
              href="#"
              onClick={() => this.setState({ currentTusk: "files" })}
              className={
                (this.state.currentTusk == "files" ? "activeTask" : "") +
                " task"
              }
            >
              <h4>In/Out of data</h4>
            </a>
          </Col>
          <Col md={4}>
            <a
              href="#"
              onClick={() => this.setState({ currentTusk: "stack" })}
              className={
                (this.state.currentTusk == "stack" ? "activeTask" : "") +
                " task"
              }
            >
              <h4>Стек/черга</h4>
            </a>
          </Col>
          <Col
            md={4}
            onClick={() => this.setState({ currentTusk: "individual" })}
          >
            <a
              href="#"
              className={
                (this.state.currentTusk == "individual" ? "activeTask" : "") +
                " task"
              }
            >
              <h4>Individual Task</h4>
            </a>
          </Col>
          <Col md={12} className="work-wrap">
            {task}
          </Col>
        </Row>
      </Col>
    );
    return (
      <Container fluid={true} id="home-wrap">
        <Row>{this.state.greeting ? greeting : content}</Row>
      </Container>
    );
  }
}

export default Home;
