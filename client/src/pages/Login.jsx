import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

import loginImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";

import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from "./../utils/config";
import axios from 'axios';

const Login = () => {

    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })

    const handleChange = (event) => {
        setCredentials(prev => ({ ...prev, [event.target.id]: event.target.value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        dispatch({ type: "LOGIN_START" })

        try {
            const res = await axios.post(`${BASE_URL}/auth/login`, credentials)
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
            navigate("/")
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.message })
        }
    }

    return (
        <section>
            <Container>
                <Row>
                    <Col lg="8" className='m-auto'>
                        <div className="login_container d-flex justify-content-between">
                            <div className="login_img">
                                <img src={loginImg} alt="" />
                            </div>

                            <div className="login_form">
                                <div className="user">
                                    <img src={userIcon} alt="" />
                                </div>
                                <h2>Login</h2>

                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <input onChange={handleChange} type="email" placeholder='Email' id='email' required />
                                    </FormGroup>

                                    <FormGroup>
                                        <input onChange={handleChange} type="password" placeholder='Password' id='password' required />
                                    </FormGroup>

                                    <Button type="submit" className='auth_btn btn secondary_btn'>Login</Button>
                                </Form>

                                <p>Don't have an account? <Link to="/register">Create</Link></p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Login