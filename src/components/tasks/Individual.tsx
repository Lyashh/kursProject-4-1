import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { IndividualState } from "../../types/states/index";

class IndividualTask extends React.Component<{}, IndividualState> {
  constructor(props: any) {
    super(props);
    this.state = {
      figures: ["triangle", "rhombus", "circle"],
      figure: "triangle",
      triangle: {
        a: { value: 5, err: false },
        b: { value: 5, err: false },
        c: { value: 5, err: false },
      },
      triangleArea: 10.82,
      triangleErrors: {
        side: "please enter a valid values of sides",
        sumSides: "triangle does not exist",
      },
      areaErr: "",
    };
  }

  handleFigure = (e: any) => {
    this.setState({ figure: e.target.value });
  };

  handleTriangleSides = (e: any) => {
    let trSides = this.state.triangle;
    let side = e.target.name as "a" | "b" | "c";
    trSides[side].value = e.target.value;

    if (isNaN(Number(e.target.value)) || e.target.value == "") {
      this.setState({ areaErr: this.state.triangleErrors.side });
      trSides[side].err = true;
    } else {
      trSides[side].err = false;
    }
    this.setState({ triangle: trSides }, () => {
      this.getTriangleArea();
    });
  };

  getTriangleArea = () => {
    const { triangle } = this.state;
    const a = Number(triangle.a.value);
    const b = Number(triangle.b.value);
    const c = Number(triangle.c.value);
    if (this.checkValidTriangle(a, b, c)) {
      const p = (a + b + c) / 2;
      const area = Number(
        Math.sqrt(p * (p - a) * (p - b) * (p - c)).toFixed(2)
      );
      this.setState({ triangleArea: area });
    } else {
      this.setState({ triangleArea: null });
    }
  };

  checkTriangleValidation = () => {
    const { triangle, triangleArea } = this.state;
    return (
      !triangle.a.err && !triangle.b.err && !triangle.c.err && triangleArea
    );
  };

  checkValidTriangle = (a: number, b: number, c: number) => {
    const result = a + b > c && a + c > b && b + c > a;
    console.log({ result });

    if (!result) {
      this.setState({ areaErr: this.state.triangleErrors.sumSides });
    }
    return a + b > c && a + c > b && b + c > a;
  };

  render() {
    const triangleArea = this.checkTriangleValidation() ? (
      <span className="orange-text">{this.state.triangleArea}</span>
    ) : (
      <span className="red-text">{this.state.areaErr}</span>
    );
    const triangle = (
      <>
        {Object.keys(this.state.triangle).map((side, i) => {
          return (
            <InputGroup className="mb-3 m-t-17" key={i}>
              <Form.Label className="m-r-10">Side {side}:</Form.Label>
              <FormControl
                className={this.state.triangle[side].err ? "is-invalid" : ""}
                key={i}
                name={side}
                placeholder={`Enter side ${side}`}
                aria-label={side}
                type="text"
                value={this.state.triangle[side].value}
                onChange={(e: any) => this.handleTriangleSides(e)}
              />
            </InputGroup>
          );
        })}
      </>
    );
    const radioInputs = this.state.figures.map((f, i) => {
      return (
        <Form.Check
          className="m-t-17"
          key={i}
          type="radio"
          checked={f === this.state.figure}
          onChange={(e: any) => this.handleFigure(e)}
          value={f}
          label={f}
        />
      );
    });

    return (
      <Row className="figure-wrap">
        <Col md={4} className="p-r-60">
          <h5>Choose a figure:</h5>
          <Form>{radioInputs}</Form>
        </Col>
        <Col md={4} className="p-r-60">
          {" "}
          <h5>Enter sides sizes:</h5>
          {triangle}
        </Col>
        <Col md={4} className="p-r-60">
          <h5>Triangle Area: {triangleArea}</h5>
        </Col>
      </Row>
    );
  }
}

export default IndividualTask;
