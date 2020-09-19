import React from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { FilesTaskProps } from "../../types/props";
import { observer, inject } from "mobx-react";

@inject("store")
@observer
class FilesTask extends React.Component<FilesTaskProps, {}> {
  constructor(props: FilesTaskProps) {
    super(props);
  }

  getTable = (data: any) => {
    console.log({data});
    
    //const tds = data.map()
    return (
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Ключ</th>
            <th>Данні</th>
            <th>Результат</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    );
  };

  render() {
    const file = this.props.store?.fileStore.file;
    console.log(this.props.store?.fileStore.getFormatedData());

    const table = <p>table</p>;

    const content = file ? (
      <Row>
        <Col md={4}>Введіть число:</Col>
        <Col md={8}>
          {file!.formatText!.length > 0 ? this.getTable(this.props.store?.fileStore.getFormatedData()) : <p>no data in file</p>}
        </Col>
      </Row>
    ) : (
      <h3>no file</h3>
    );
    return <Col md={12}>{content}</Col>;
  }
}

export default FilesTask;
