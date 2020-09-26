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
import { FilesTaskProps } from "../../types/props";
import { FileTaskState } from "../../types/states";

import { observer, inject } from "mobx-react";
import Modal from "react-modal";
import { modalStyle } from "../../css/style";

Modal.setAppElement("#root");

@inject("store")
@observer
class FilesTask extends React.Component<FilesTaskProps, FileTaskState> {
  constructor(props: FilesTaskProps) {
    super(props);
    this.state = {
      value: "",
      result: "",
      on: true,
      timerId: 0,
      modalOpen: false,
    };
  }

  handleInput = (e: any) => {
    this.setState(
      { value: e.target.value, timerId: this.state.timerId + 1 },
      () => {
        this.startTimerOnModal();
      }
    );
  };

  handleMode = () => {
    const mode = this.state.on;

    // On
    if (mode) {
      this.setState({ value: "", result: "" });
      this.startTimerOnModal();

      // Off
    } else {
      const result = this.state.value.length > 5 ? "true" : "false";
      this.setState({ result, timerId: this.state.timerId + 1 });
      if (this.state.value) {
        this.props.store?.fileStore.addToLocalData(this.state.value);
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

  getTable = (data: any) => {
    console.log(data);

    return (
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>id</th>
            <th>value</th>
            <th>result</th>
          </tr>
        </thead>
        <tbody>
          {data.map((el: any) => {
            return (
              <tr>
                <td>{el.id}</td>
                <td>{el.value}</td>
                <td>{el.check.toString()}</td>
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

        <Col md={12}>
          <h5>Inter the number:</h5>
          <InputGroup className="mb-3 m-t-17">
            <FormControl
              name="number-input"
              placeholder={
                on ? "You cant enter text in stop mode" : "Enter integer number"
              }
              type="text"
              value={this.state.value}
              onChange={(e: any) => this.handleInput(e)}
              disabled={on}
            />
          </InputGroup>

          <p>Result: {on && result ? result : null}</p>

          <Button
            variant={on ? "success" : "danger"}
            onClick={() => this.handleMode()}
          >
            {on ? "Start" : "Stop"}
          </Button>
        </Col>
      </Row>
    );
    return (
      <Row>
        <Col md={12} className="file-task-wrap">
          {content}
        </Col>
        <Col md={6}>
          <h5>File data:</h5>
          {table}
        </Col>
        <Col md={6}>
          <h5>Local data:</h5>
          {tempDateTable}
        </Col>
      </Row>
    );
  }
}

export default FilesTask;
