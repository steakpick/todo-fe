import React from 'react';
import {Button, Card, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import {FaPlusCircle, FaTrash} from "react-icons/all";

function Tasks() {
    return (
        <div className='tasks'>
            <Row xs={1} md={2} className="g-0 d-flex justify-content-center">
                <Col>
                    <Card style={{margin: "20px 0"}}>
                        <Card.Body>
                            <Row xs={1} md={3} className="g-0 d-flex justify-content-between">
                                <Col style={{width: "auto"}}>
                                    <Form.Check style={{marginTop: "5px"}} inline type="checkbox" aria-label="radio 1"/>
                                </Col>
                                <Col>
                                    <div style={{marginTop: "5px"}}>
                                        Just text
                                    </div>
                                </Col>
                                <Col style={{width: "auto"}}>
                                    <Button variant="outline-danger">
                                        <FaTrash/>
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Tasks;