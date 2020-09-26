import React from "react";
import {
  Row,
  Col,
  Button,
  ButtonGroup,
  InputGroup,
  Form,
  FormControl,
} from "react-bootstrap";
import { StackQueueState } from "../../types/states/index";
import Modal from "react-modal";
import { modalStyle } from "../../css/style";

class StackTask extends React.Component<{}, StackQueueState> {
  constructor(props: any) {
    super(props);
    this.state = {
      stack: ["3", "2", "1"],
      queue: ["1", "2", "3"],
      stackItem: "",
      queueItem: "",
      modalText: "",
      modalShow: false,
    };
  }

  handleInput = (e: any) => {
    if (e.target.name == "stack") {
      this.setState({ stackItem: e.target.value });
    }
    if (e.target.name == "queue") {
      this.setState({ queueItem: e.target.value });
    }
  };

  pushStack = () => {
    if (this.state.stackItem) {
      this.setState({
        stack: [this.state.stackItem, ...this.state.stack],
        stackItem: "",
      });
    }
  };

  popStack = () => {
    let { stack } = this.state;
    if (stack.length > 0) {
      const shifted = stack.shift();
      this.setState({ stack, modalText: `Pop '${shifted}'`, modalShow: true });
      return;
    }
    this.setState({ modalText: `Cant pop: Stack is empty`, modalShow: true });
  };

  peekStack = () => {
    let { stack } = this.state;
    if (stack.length > 0) {
      this.setState({ modalText: `Peek '${stack[0]}'`, modalShow: true });
      return;
    }
    this.setState({ modalText: `Cant peek: Stack is empty`, modalShow: true });
  };

  pushQueue = () => {
    if (this.state.queueItem) {
      this.setState({
        queue: [...this.state.queue, this.state.queueItem],
        queueItem: "",
      });
    }
  };

  popQueue = () => {
    let { queue } = this.state;
    if (queue.length > 0) {
      const shifted = queue.shift();
      this.setState({ queue, modalText: `Pop '${shifted}'`, modalShow: true });
      return;
    }
    this.setState({ modalText: `Cant pop: Queue is empty`, modalShow: true });
  };

  peekQueue = () => {
    let { queue } = this.state;
    if (queue.length > 0) {
      this.setState({ modalText: `Peek '${queue[0]}'`, modalShow: true });
      return;
    }
    this.setState({ modalText: `Cant peek: Stack is empty`, modalShow: true });
  };

  render() {
    const { stack, queue } = this.state;

    const stackView =
      stack.length > 0 ? (
        <div className="stack-container">
          {stack.map((el, i) => {
            return (
              <div className="stack-item" key={el + i}>
                <p>{el}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <h5 className="m-t-17">Empty Stack</h5>
      );
    const queueView =
      queue.length > 0 ? (
        <div className="stack-container">
          {queue.map((el, i) => {
            return (
              <div className="queue-item" key={el + i}>
                {el}
              </div>
            );
          })}
        </div>
      ) : (
        <h5 className="m-t-17">Empty Queue</h5>
      );

    return (
      <Row className="task-wrap stack-wrap">
        <Modal isOpen={this.state.modalShow} style={modalStyle}>
          <h5>{this.state.modalText}</h5>
          <Button
            variant="danger"
            onClick={() => this.setState({ modalShow: false })}
          >
            Close
          </Button>
        </Modal>

        <Col md={4}>
          <h4>Stack</h4>
          <InputGroup className="mb-3 m-t-17 al-c">
            <Form.Label className="m-r-10 m-t-7">New stack item:</Form.Label>
            <FormControl
              name="stack"
              placeholder="Enter stack data"
              type="text"
              value={this.state.stackItem}
              onChange={(e: any) => this.handleInput(e)}
            />
          </InputGroup>

          <ButtonGroup aria-label="Basic example">
            <Button variant="success" onClick={() => this.pushStack()}>
              Push
            </Button>
            <Button variant="info" onClick={() => this.peekStack()}>
              Peek
            </Button>
            <Button variant="danger" onClick={() => this.popStack()}>
              Pop
            </Button>
          </ButtonGroup>
          {stackView}
        </Col>
        <Col md={8} className="center-block">
          <h4 className="orange-text">Queue</h4>
          <div>
            <InputGroup className="mb-3 m-t-17">
              <Form.Label className="m-r-10 m-t-7">New queue item:</Form.Label>
              <FormControl
                name="queue"
                placeholder="Enter queue data"
                type="text"
                value={this.state.queueItem}
                onChange={(e: any) => this.handleInput(e)}
              />
            </InputGroup>
          </div>

          <ButtonGroup aria-label="Basic example">
            <Button variant="success" onClick={() => this.pushQueue()}>
              Push
            </Button>
            <Button variant="info" onClick={() => this.peekQueue()}>
              Peek
            </Button>
            <Button variant="danger" onClick={() => this.popQueue()}>
              Pop
            </Button>
          </ButtonGroup>
          {queueView}
        </Col>
      </Row>
    );
  }
}

export default StackTask;
