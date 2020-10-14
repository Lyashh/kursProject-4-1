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
      search: "",
      searchIndex: 0,
      searchHide: true,
      searchResults: [],
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

    if (
      e.target.files[0].type !== "text/plain" &&
      e.target.files[0].type !== "application/vnd.ms-excel"
    ) {
      this!.fileInput!.current!.value = "";
      this.setState({
        modalWrongFormat: true,
        fileValue: null,
        fileName: null,
      });
      return;
    }
    const type = e.target.files[0].type;

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
        if (!fileExist && type) {
          // Creating new file
          this.props.store!.fileStore.createFile(
            this.state!.fileName!,
            this.state!.fileValue!,
            type
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

  getDataFromServer = async (name: string) => {
    name = name.replaceAll(".txt", "");
    await this.props.store!.fileStore.getDataFromServerFile(name);
  };

  handleSearch = (e: any) => {
    this.setState(
      {
        search: e.target.value,
        searchIndex: this.state.searchIndex + 1,
        searchHide: false,
      },
      () => {
        this.startTimerOnModal();
      }
    );
  };

  startTimerOnModal = () => {
    const timerId = this.state.searchIndex;
    setTimeout(() => {
      if (!this.state.searchHide && timerId === this.state.searchIndex) {
        this.setState({ searchHide: true });
      }
    }, 7000);
  };

  render() {
    const file = this.props.store!.fileStore.file;
    const currenFile = file ? file.name + ".txt" : "No file";

    const searchResults = file
      ? this.props.store?.fileStore.getSeachData(this.state.search)
      : null;

    const searchForm = file ? (
      <Form inline className="seach-input">
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          onChange={(e) => this.handleSearch(e)}
          value={this.state.search}
        />
        {this.state.searchHide ? null : (
          <div className="seach-wrap">
            {searchResults!.length > 0 ? (
              searchResults!.map((el, i) => {
                return (
                  <div key={el + i}>
                    <p>
                      {++i}) ID: {el.id}. Result: {el.value}
                    </p>
                    <p>source: {el.source}</p>
                  </div>
                );
              })
            ) : (
              <div>
                <p>No Results</p>
              </div>
            )}
          </div>
        )}
      </Form>
    ) : null;

    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Modal isOpen={this.state.modalWrongFormat} style={modalStyle}>
          <h5>Wrong file format</h5>
          <Button
            variant="danger"
            onClick={() => this.setState({ modalWrongFormat: false })}
          >
            Close
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
            <NavDropdown title="File" id="collasible-nav-dropdown">
              <NavDropdown.Item>New file</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.2">
                <span style={{ marginRight: "10px" }}>Open</span>
                <input
                  accept=".txt,.csv"
                  type="file"
                  id="file"
                  ref={this.fileInput}
                  onChange={(e) => this.createFile(e)}
                />
              </NavDropdown.Item>
              <NavDropdown.Divider />
              {this.props.store!.fileStore!.file ? (
                <>
                  <a
                    target="_blank"
                    type="application/octet-stream"
                    className="dropdown-item"
                    href={`http://localhost:8080/download/${
                      this.props.store!.fileStore!.file.name
                    }`}
                    download="FileName"
                  >
                    Save as .txt
                  </a>

                  <a
                    target="_blank"
                    type="application/octet-stream"
                    className="dropdown-item"
                    href={`http://localhost:8080/download-csv/${
                      this.props.store!.fileStore!.file.name
                    }`}
                    download="FileName"
                  >
                    Save as .cvc
                  </a>
                </>
              ) : null}
            </NavDropdown>
            {this.props.store!.fileStore!.serverFiles!.length > 0 ? (
              <NavDropdown
                title="Recent Files"
                id="collasible-nav-dropdown"
                className="m-l-30"
              >
                {this.props.store!.fileStore!.serverFiles.map((el, i) => {
                  return (
                    <NavDropdown.Item
                      key={el + i}
                      onClick={() => this.getDataFromServer(el)}
                    >
                      {el}
                    </NavDropdown.Item>
                  );
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
