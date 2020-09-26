import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { NavbarProps } from "../types/props/index";
import { NavbarState } from "../types/states/index";
import { modalStyle } from "../css/style";
import Modal from "react-modal";

Modal.setAppElement("#root");

@inject("store")
@observer
class NavbarComponent extends React.Component<NavbarProps, NavbarState> {
  private fileInput: React.RefObject<HTMLInputElement>;

  constructor(props: NavbarProps) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      modalWarningOpen: false,
      modalWrongFormat: false,
      fileName: null,
      fileValue: null,
    };
  }

  continueNew = () => {
    this.setState({ modalWarningOpen: false, fileValue: null, fileName: null });
    this!.fileInput!.current!.value = "";
  };

  continueOld = () => {
    this.setState({ modalWarningOpen: false, fileValue: null, fileName: null });
    this!.fileInput!.current!.value = "";
  };

  createFile = (e: any) => {
    e.preventDefault();

    // Check file on txt format
    if (e.target.files[0].type !== "text/plain") {
      this!.fileInput!.current!.value = "";
      this.setState({
        modalWrongFormat: true,
        fileValue: null,
        fileName: null,
      });
      return;
    }

    // Read file
    const reader = new FileReader();
    reader.readAsText(e!.target!.files[0]);
    const fullName = e.target.files[0].name;
    reader.onload = (e) => {
      const value = e!.target!.result as string;
      const name = fullName.substring(0, fullName.length - 4);

      // Save file name and body to state
      this.setState({ fileName: name, fileValue: value }, () => {
        // Find file with same name

        //ADD

        const fileExist = false;
        if (!fileExist) {
          // Creating new file
          this.props.store!.fileStore.createFile(
            this.state!.fileName!,
            this.state!.fileValue!
          );
          return;
        }

        // Open dialog window
        this.setState({ modalWarningOpen: true });
      });
    };
  };

  getModalStyle = () => {
    return {
      content: {
        width: "700px",
        height: "300px",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        padding: "60px",
      },
    };
  };

  render() {
    const file = this.props.store!.fileStore.file;
    const currenFile = file ? file.name + ".txt" : "No file";
    const searchForm = file ? (
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      </Form>
    ) : null;

    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Modal isOpen={this.state.modalWarningOpen} style={modalStyle}>
          <h5>
            Файл з таким ім'ям вже збережено в програмі. Ви можете перезаписати
            файл чи скористатися існуючим
          </h5>
          <Button onClick={() => this.continueNew()}>
            Замінити та продовжити
          </Button>
          <Button onClick={() => this.continueOld()}>
            Продовжити роботу з існуючим
          </Button>
        </Modal>

        <Modal isOpen={this.state.modalWrongFormat} style={modalStyle}>
          <h5>Невірний формат файлу</h5>
          <Button
            variant="danger"
            onClick={() => this.setState({ modalWrongFormat: false })}
          >
            Закрити
          </Button>
        </Modal>

        <Link to="/">
          <Navbar.Brand>Курсова робота</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link to="about" className="nav-link" role="button">
              About
            </Link>
            <NavDropdown title="Робота за файлом" id="collasible-nav-dropdown">
              <NavDropdown.Item>Новий</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.2">
                <span style={{ marginRight: "10px" }}>Відкрити</span>
                <input
                  accept=".txt"
                  type="file"
                  id="file"
                  ref={this.fileInput}
                  onChange={(e) => this.createFile(e)}
                />
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action">
                Зберегти як .txt
              </NavDropdown.Item>
              <NavDropdown.Item href="#action">
                Зберегти як .cvc
              </NavDropdown.Item>
            </NavDropdown>
            {this.props.store!.fileStore!.serverFiles!.length > 0 ? (
              <NavDropdown
                title="Recent Files"
                id="collasible-nav-dropdown"
                className="m-l-30"
              >
                {this.props.store!.fileStore!.serverFiles.map((el, i) => {
                  return <NavDropdown.Item key={el + i}>{el}</NavDropdown.Item>;
                })}
              </NavDropdown>
            ) : (
              <Navbar.Text className="fileTitle">No recent files</Navbar.Text>
            )}
          </Nav>
          <Nav>
            <Navbar.Text className="fileTitle">
              Current File: {currenFile}
            </Navbar.Text>
            {searchForm}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavbarComponent;
