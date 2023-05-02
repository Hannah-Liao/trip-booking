import React from 'react';
import "./newsletter.css";

import { Container, Row, Col } from "reactstrap";
import tourist from "../assets/images/person.jpg";

const Newsletter = () => {
    return (
        <section className='newsletter'>
            <Container>
                <Row>
                    <Col lg="6">
                        <div className="newsletter_content">
                            <h2>Subscribe now to get useful traveling information.</h2>

                            <div className="newsletter_input">
                                <input type="email" placeholder='Enter your email' />
                                <button className="btn newsletter_btn">Subscribe</button>
                            </div>

                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                    </Col>

                    {/* <Col lg="6">
                        <div className="newsletter">
                           <p>Trip</p>
                        </div>
                    </Col> */}
                </Row>
            </Container>
        </section>
    )
}

export default Newsletter