import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/login.css";

import registerImg from "../assets/images/register.png";
import userIcon from "../assets/images/user.png";

import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from "./../utils/config";

const Register = () => {

    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        userName: undefined,
        email: undefined,
        password: undefined,
    });

    const handleChange = (event) => {
        setCredentials(prev => ({ ...prev, [event.target.id]: event.target.value }))
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await axios.post(`${BASE_URL}/auth/register`, credentials)

            dispatch({ type: "REGISTER_SUCCESS" })
            navigate("/login")
        } catch (err) {
            alert(err.message)
        }

    }

    return (
        <section>
            <Container>
                <Row>
                    <Col lg="8" className='m-auto'>
                        <div className="login_container d-flex justify-content-between">
                            <div className="login_img">
                                <img src={registerImg} alt="" />
                            </div>

                            <div className="login_form">
                                <div className="user">
                                    <img src={userIcon} alt="" />
                                </div>
                                <h2>Register</h2>

                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <input onChange={handleChange} type="text" placeholder='Username' id='userName' required />
                                    </FormGroup>

                                    <FormGroup>
                                        <input onChange={handleChange} type="email" placeholder='Email' id='email' required />
                                    </FormGroup>

                                    <FormGroup>
                                        <input onChange={handleChange} type="password" placeholder='Password' id='password' required />
                                    </FormGroup>

                                    <Button type="submit" className='auth_btn btn secondary_btn'>Create Account</Button>
                                </Form>

                                <p>Already have an account? <Link to="/login">Login</Link></p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Register