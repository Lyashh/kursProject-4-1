import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { observer, inject } from "mobx-react";
import { HomeState } from "../types/states";
import { HomeProps } from "../types/props";
import Files from "./tasks/Files";
import Individual from "./tasks/Individual";
import Stack from "./tasks/Stack";
import axios from "axios";

@inject("store")
@observer
class Home extends React.Component<HomeProps, HomeState> {
  private tasks: any;

  constructor(props: HomeProps) {
    super(props);
    this.state = {
      currentTusk: "files",
      stack: true,
    };

    this.tasks = {
      files: <Files />,
      stack: <Stack />,
    };
  }

  async componentDidMount() {
    this.props.store?.fileStore.getServerFiles();
    setTimeout(() => {
      this.props.store?.setGreeting(false);
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
          onClick={() => this.props.store?.setGreeting(false)}
        >
          Закрити
        </Button>
      </Col>
    );

    const task = this.tasks[this.state.currentTusk];

    const content = (
      <Col md={9} className="mx-auto">
        <Row>
          <Col md={6}>
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
          <Col md={6}>
            <a
              href="#"
              onClick={() => this.setState({ currentTusk: "stack" })}
              className={
                (this.state.currentTusk == "stack" ? "activeTask" : "") +
                " task"
              }
            >
              <h4>Stack / Queue</h4>
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
        <Row>{this.props.store?.greeting ? greeting : content}</Row>
      </Container>
    );
  }
}

export default Home;
