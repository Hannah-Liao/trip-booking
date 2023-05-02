import React from 'react'
import { Container, Row, Col } from "reactstrap";

import "./common-section.css"

const commonSection = ({ title }) => {
    return (
        <section className="common_section">
            <Container>
                <Row>
                    <Col la="12">
                        <h1>{title}</h1>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default commonSection;