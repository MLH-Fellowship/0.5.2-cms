import React, { Component } from 'react';
import { 
    Button,
    Form,
    Segment,
} from 'semantic-ui-react';
import '../../styles/home.css';
import { post } from '../../utilities';
import { Redirect } from 'react-router';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: '',
        }
    }   

    login = async () => {
        const body = {
            username: this.state.username,
            password: this.state.password,
        }

        console.log(body);
        const res = await post('/api/auth/login', body);
        console.log(res);
        if (!res.error) {
            this.setState({ redirect: true });
        } else {
            this.setState({ error: res.error });
        }
    }

    render() {
        return (
            <Segment className='login-form'>
                <Form widths='equal'>
                    <Form.Input
                        required
                        label='Username'
                        placeholder='Username'
                        onChange={(e, data) => this.setState({ username: e.target.value })}
                        />
                    <Form.Input
                        required
                        type='password'
                        label='Password'
                        placeholder='Password'                    
                        onChange={(e, data) => this.setState({ password: e.target.value })}
                    />
                    <div className='login__btns'>
                        <Form.Button 
                            onClick={this.props.goBack}
                        >
                            Go Back
                        </Form.Button>
                        <Form.Button
                            onClick={this.login}
                        >
                            Login
                        </Form.Button>
                    </div>
                </Form>
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
            redirect: false,
        }
    }

    register = async () => {
        if (this.state.password.length < 6) {
            this.setState({ error: 'Password must be at least 6 charadcters long'});
            return;
        }
        const body = {
            username: this.state.username,
            fullname: this.state.first_name + ' ' + this.state.last_name,
            password: this.state.password,
        }   
        console.log(body);
        const res = await post('/api/auth/register', body);
        console.log(res);
        if (!res.error) {
            console.log(res);
            this.setState({ redirect: true });
        } else {
            this.setState({ error: res.error });
        }

    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/all'/>
        }

        return (
            <Segment className='register-form'>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input 
                            required
                            label='First Name' 
                            placeholder='First name'
                            onChange={(e, data) => this.setState({ first_name: e.target.value })}
                            />
                        <Form.Input 
                            required
                            label='Last Name' 
                            placeholder='First name'
                            onChange={(e, data) => this.setState({ last_name: e.target.value })}
                            />
                    </Form.Group>
                    <Form.Input
                        required
                        label='Username'
                        placeholder='Username'
                        onChange={(e, data) => this.setState({ username: e.target.value })}
                        />
                    <Form.Input
                        required
                        type='password'
                        label='Password'
                        placeholder='Password'
                        onChange={(e, data) => this.setState({ password: e.target.value })}
                    />
                </Form>
                { this.state.error !== ''
                        && <p className='error'>{this.state.error}</p>}
                <div className='register__btns'>
                    <Form.Button onClick={this.props.goBack} floated='left' > Go back </Form.Button>
                    <Form.Button 
                        floated='right'
                        onClick={this.register}
                    > 
                        Register 
                    </Form.Button>
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