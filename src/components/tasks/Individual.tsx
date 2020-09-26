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

      rhombus: {
        d1: { value: 5, err: false },
        d2: { value: 6, err: false },
      },

      circle: {
        r: { value: 2, err: false },
      },

      rhombusArea: 15,
      triangleArea: 10.82,
      circleArea: 12.56,

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

  validateInputValue = (value: string) => {
    if (!isNaN(Number(value))) {
      return Number(value) <= 0;
    }
    return isNaN(Number(value)) || value == "";
  };

  handleTriangleSides = (e: any) => {
    let trSides = this.state.triangle;
    let side = e.target.name as "a" | "b" | "c";
    trSides[side].value = e.target.value;

    if (this.validateInputValue(e.target.value)) {
      this.setState({ areaErr: this.state.triangleErrors.side });
      console.log("here");

      trSides[side].err = true;
    } else {
      trSides[side].err = false;
    }
    this.setState({ triangle: trSides }, () => {
      this.getTriangleArea();
    });
  };

  handleRhombusSides = (e: any) => {
    let rbSides = this.state.rhombus;
    let side = e.target.name as "d1" | "d2";
    rbSides[side].value = e.target.value;

    if (this.validateInputValue(e.target.value)) {
      this.setState({ areaErr: this.state.triangleErrors.side });
      rbSides[side].err = true;
    } else {
      rbSides[side].err = false;
    }
    this.setState({ rhombus: rbSides }, () => {
      this.getRhombusArea();
    });
  };

  handleCircleSides = (e: any) => {
    const crSides = this.state.circle;
    let side = e.target.name as "r";
    crSides[side].value = e.target.value;

    if (this.validateInputValue(e.target.value)) {
      this.setState({ areaErr: this.state.triangleErrors.side });
      crSides[side].err = true;
    } else {
      crSides[side].err = false;
    }
    this.setState({ circle: crSides }, () => {
      this.getCircleArea();
    });
  };

  getCircleArea = () => {
    const { circle } = this.state;
    if (this.checkCircle()) {
      const r = Number(circle.r.value);
      const area = Number((Math.PI * (r * r)).toFixed(2));
      this.setState({ circleArea: area });
    } else {
      this.setState({ circleArea: null });
    }
  };

  checkCircle = () => {
    const { circle } = this.state;
    if (!circle.r.err) {
      return true;
    }
    return false;
  };

  getRhombusArea = () => {
    const { rhombus } = this.state;
    if (this.checkRhombus()) {
      const d1 = Number(rhombus.d1.value);
      const d2 = Number(rhombus.d2.value);

      const area = Number(((d1 * d2) / 2).toFixed(2));
      this.setState({ rhombusArea: area });
    } else {
      this.setState({ rhombusArea: null });
    }
  };

  checkRhombus = () => {
    const { rhombus } = this.state;
    if (!rhombus.d1.err && !rhombus.d2.err) {
      return true;
    }
    return false;
  };

  getTriangleArea = () => {
    const { triangle } = this.state;

    if (!this.checkTriangleSides()) {
      this.setState({ triangleArea: null });
      return;
    }

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

  checkTriangleSides = () => {
    const { triangle } = this.state;
    return !triangle.a.err && !triangle.b.err && !triangle.c.err;
  };

  checkValidTriangle = (a: number, b: number, c: number) => {
    const result = a + b > c && a + c > b && b + c > a;

    if (!result) {
      this.setState({ areaErr: this.state.triangleErrors.sumSides });
    }
    return a + b > c && a + c > b && b + c > a;
  };

  render() {
    const { figure, rhombus, triangle, circle } = this.state;

    const triangleArea = this.checkTriangleValidation() ? (
      <span className="orange-text">{this.state.triangleArea}</span>
    ) : (
      <span className="red-text">{this.state.areaErr}</span>
    );

    const rhombusArea = this.checkRhombus() ? (
      <span className="orange-text">{this.state.rhombusArea}</span>
    ) : (
      <span className="red-text">{this.state.areaErr}</span>
    );

    const circleArea = this.checkCircle() ? (
      <span className="orange-text">{this.state.circleArea}</span>
    ) : (
      <span className="red-text">{this.state.areaErr}</span>
    );

    const triangleInputs = (
      <>
        {Object.keys(triangle).map((side, i) => {
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

    const rhombusInputs = (
      <>
        {Object.keys(rhombus).map((side, i) => {
          return (
            <InputGroup className="mb-3 m-t-17" key={side}>
              <Form.Label className="m-r-10">diagonale {side}:</Form.Label>
              <FormControl
                className={this.state.rhombus[side].err ? "is-invalid" : ""}
                name={side}
                placeholder={`Enter diagonale ${side}`}
                aria-label={side}
                type="text"
                value={this.state.rhombus[side].value}
                onChange={(e: any) => this.handleRhombusSides(e)}
              />
            </InputGroup>
          );
        })}
      </>
    );

    const circleInputs = (
      <>
        {Object.keys(circle).map((side, i) => {
          return (
            <InputGroup className="mb-3 m-t-17" key={side}>
              <Form.Label className="m-r-10">radius {side}:</Form.Label>
              <FormControl
                className={this.state.circle[side].err ? "is-invalid" : ""}
                name={side}
                placeholder={`Enter radius ${side}`}
                aria-label={side}
                type="text"
                value={this.state.circle[side].value}
                onChange={(e: any) => this.handleCircleSides(e)}
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

    const figureInput =
      figure == "triangle"
        ? triangleInputs
        : figure == "rhombus"
        ? rhombusInputs
        : circleInputs;

    const figureArea =
      figure == "triangle"
        ? triangleArea
        : figure == "rhombus"
        ? rhombusArea
        : circleArea;

    return (
      <Row className="task-wrap">
        <Col md={4} className="p-r-60">
          <h5>Choose a figure:</h5>
          <Form>{radioInputs}</Form>
        </Col>
        <Col md={4} className="p-r-60">
          {" "}
          <h5>Enter sides sizes:</h5>
          {figureInput}
        </Col>
        <Col md={4} className="p-r-60">
          <h5>
            {figure} area: {figureArea}
          </h5>
        </Col>
      </Row>
    );
  }
}

export default IndividualTask;
