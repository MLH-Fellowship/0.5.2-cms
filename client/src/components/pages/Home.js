import React, { Component } from 'react';
import { 
    Button,
    Form,
    Segment,
} from 'semantic-ui-react';
import '../../styles/home.css';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: '',
        }
    }   
    render() {
        return (
            <Segment className='login-form'>
                <Form widths='equal'>
                    <Form.Input
                        label='Username'
                        placeholder='Username'
                    />
                    <Form.Input
                        label='Password'
                        placeholder='Password'                    
                    />
                </Form>
                <div className='login__btns'>
                    <Button onClick={this.props.goBack}>Go Back</Button>
                    <Button>Login</Button>
                </div>
            </Segment>
        )
    }
}

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            first_name: '',
            last_name: '',
            password: '',
            error: '',
        }
    }

    render() {
        return (
            <Segment className='register-form'>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input label='First Name' placeholder='First name'/>
                        <Form.Input label='Last Name' placeholder='First name'/>
                    </Form.Group>
                    <Form.Input
                        label='Username'
                        placeholder='Username'
                    />
                    <Form.Input
                        label='Password'
                        placeholder='Password'
                    />
                </Form>
                <div className='register__btns'>
                    <Button onClick={this.props.goBack} floated='left' > Go back </Button>
                    <Button floated='right'> Register </Button>
                </div>
            </Segment>
        )
    }
}

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registering: false,
            logging_in: false,
        };
    }
    
    render() {
        let view; 
        if (this.state.registering) {
            view = <RegisterForm goBack={() => this.setState({ registering: false })}/>;
        } else if (this.state.logging_in) {
            view = <LoginForm goBack={() => this.setState({ logging_in: false })}/>
        } else {
            view = <div className='home__btns'>
                <Button
                    onClick={() => this.setState({ logging_in: true })}
                >
                    Login
                </Button>
                <Button
                    onClick={() => this.setState({ registering: true })}
                >
                    Register
                </Button>
            </div>
        }
        return(
            <div className='home'>
                <main className='home__container'>
                    <h1 className='home__title'>
                        Connections
                    </h1>
                    <p className='home__tagline'>
                        Your one-stop shop to keep track of the people you meet!
                    </p>
                    {view}
                </main>
            </div>
        )
    }
}