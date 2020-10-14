import React from "react";
import {
  Row,
  Col,
  Button,
  Table,
  InputGroup,
  Form,
  FormControl,
} from "react-bootstrap";
import Individual from "../tasks/Individual";
import { FilesTaskProps } from "../../types/props";
import { FileTaskState } from "../../types/states";

import { observer, inject } from "mobx-react";
import Modal from "react-modal";
import { modalStyle } from "../../css/style";

Modal.setAppElement("#root");

@inject("store")
@observer
class FilesTask extends React.Component<FilesTaskProps, FileTaskState> {
  child: any;
  constructor(props: FilesTaskProps) {
    super(props);
    this.state = {
      value: null,
      result: "",
      on: true,
      timerId: 0,
      modalOpen: false,
    };
    this.child = React.createRef();
  }

  handleInput = (e: any) => {
    this.setState({ value: e.target.value }, () => {
      this.updateTimer();
    });
  };

  updateTimer = () => {
    this.setState({ timerId: this.state.timerId + 1 }, () => {
      this.startTimerOnModal();
    });
  };

  handleMode = () => {
    const mode = this.state.on;
    const figure = this.state.value;

    // On
    if (mode) {
      this.setState({ value: null, result: "" });
      this.startTimerOnModal();
      this.child.current.clearAllFields();
      // Off
    } else {
      this.setState({ timerId: this.state.timerId + 1 });
      if (figure) {
        this.props.store?.fileStore.addToLocalData(
          figure.type,
          figure.side_a,
          figure.side_b,
          figure.side_c,
          figure.value
        );
      }
    }
    this.setState({ on: !mode });
  };

  startTimerOnModal = () => {
    const timerId = this.state.timerId;
    setTimeout(() => {
      if (!this.state.on && timerId === this.state.timerId) {
        this.setState({ modalOpen: true });
      }
    }, 5000);
  };

  closeModal = () => {
    this.setState({ modalOpen: false }, () => {
      this.startTimerOnModal();
    });
  };

  sendResult = async (
    type: string,
    side_a: number,
    side_b: number,
    side_c: number,
    value: number
  ) => {
    await this.setState({
      value: {
        type,
        side_a,
        side_b,
        side_c,
        value,
      },
    });
  };

  getTable = (data: any) => {
    console.log(data);

    return (
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>id</th>
            <th>type</th>
            <th>side_a</th>
            <th>side_b</th>
            <th>side_c</th>
            <th>result</th>
          </tr>
        </thead>
        <tbody>
          {data.map((el: any, i: number) => {
            return (
              <tr key={el + i}>
                <td>{el.id}</td>
                <td>{el.type}</td>
                <td>{el.side_a}</td>
                <td>{el.type == "circle" ? "-" : el.side_b}</td>
                <td>
                  {el.type == "rhombus" || el.type == "circle"
                    ? "-"
                    : el.side_c}
                </td>
                <td>{el.value}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };

  render() {
    const file = this.props.store?.fileStore.file;
    const { on, result } = this.state;

    const saveButton =
      file && this.props.store!.fileStore.tempData.length > 0 ? (
        <Button
          className="m-l-30"
          onClick={() => this.props.store?.fileStore.saveLocalData()}
        >
          Save Local Data
        </Button>
      ) : null;

    const table = file ? (
      <>
        {file!.formatText!.length > 0 && file ? (
          this.getTable(file!.formatText)
        ) : (
          <p>File is empty</p>
        )}
      </>
    ) : (
      <p>File not uploaded</p>
    );

    const tempDateTable =
      this.props.store!.fileStore.tempData.length > 0 ? (
        this.getTable(this.props.store?.fileStore.tempData)
      ) : (
        <p>No local data</p>
      );

    const content = (
      <Row>
        <Modal isOpen={this.state.modalOpen} style={modalStyle}>
          <h5>Warning: user not active</h5>
          <Button variant="danger" onClick={() => this.closeModal()}>
            Close
          </Button>
        </Modal>

        <Col md={4}>
          <div className="m-b-40">
            <Button
              variant={on ? "success" : "danger"}
              onClick={() => this.handleMode()}
            >
              {on ? "Start" : "Stop"}
            </Button>

            {saveButton}
          </div>
          <div></div>
          <h5>File data:</h5>
          {table}

          <h5>Not saved local data:</h5>
          {tempDateTable}
        </Col>

        <Col md={8}>
          <Individual
            active={on}
            ref={this.child}
            updateTimer={this.updateTimer}
            sendResult={this.sendResult}
          />
        </Col>
      </Row>
    );
    return (
      <Row>
        <Col md={12} className="file-task-wrap">
          {content}
        </Col>
      </Row>
    );
  }
}

export default FilesTask;
