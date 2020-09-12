import React from 'react';
import { Container, Row, Col, Button  } from 'react-bootstrap';
import { HomeState } from '../types/states';

class Home extends React.Component<{}, HomeState> {
	constructor(props: {}) {
    super(props);
    this.state = {
      greeting: true,
    };
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({greeting: false})
		}, 10000)
	}
	
	render() {
		const greeting = (
			<Col md={6} className="mx-auto">
				<h2>Курсовий проект:</h2>
				<h4>Розробив студент групи КІТ-617б:</h4>
				<p>Ляш Олександр</p>
				<h4>Завдання:</h4>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
					Obcaecati alias blanditiis soluta, deleniti quod quibusdam doloribus et asperiores, error excepturi aliquam? 
					Rem modi repudiandae corporis. Sint, tempora dolorum! Ea, eos.</p>
				<Button variant="primary" onClick={() => this.setState({greeting: false})}>Закрити</Button>
			</Col>
		)

		const content = (
			<Col md={12}>
				<h1>Home Page</h1>
			</Col>
		)
		return (
			<Container fluid={true} id="home-wrap">	
				<Row>
					{ this.state.greeting ? greeting : content}
				</Row>
			</Container>
		);
	}
}

export default Home;