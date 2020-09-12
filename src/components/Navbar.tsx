import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { observer, inject } from "mobx-react";
import { NavbarProps } from "../types/props/index"


@inject("store")
@observer
class NavbarComponent extends React.Component<NavbarProps, {}> {
	private fileInput: React.RefObject<HTMLInputElement>;

	constructor(props: NavbarProps) {
		super(props)
		this.fileInput = React.createRef();
	}

	getFile = (e: any) => {
		e.preventDefault();

		try {
			if (e.target.files[0].type !== "text/plain") {
				this!.fileInput!.current!.value = "";
				return;
				// ERR
			}
		} catch (error) {
			console.log({ error });
		}

		const reader = new FileReader();
		reader.readAsText(e!.target!.files[0]);

		const fullName = e.target.files[0].name;

		reader.onload = (e) => {
			const value =  e!.target!.result as string; 
			const name = fullName.substring(0, fullName.length - 4);
			if(value) {
				this.props.store!.fileStore.createFile(name, value);
			}
		};	
	}	

	render() {
		return (
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
				<Link to="/">
					<Navbar.Brand >Курсова робота</Navbar.Brand>
				</Link>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="mr-auto">
						<Link to="about" className="nav-link" role="button">
							About
						</Link>
						<NavDropdown title="Файл" id="collasible-nav-dropdown">
							<NavDropdown.Item>Новий</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.2">
								<span style={{ marginRight: '10px' }}>Відкрити</span>
								<input 
									accept=".txt"
									type="file"
									id="file"
									ref={this.fileInput}
									onChange={(e) => this.getFile(e)} />
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.3">Зберегти</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					<Nav>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default NavbarComponent;