import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Modal, Form, FloatingLabel, Row, Col} from "react-bootstrap";
import {useState} from "react";

function TaskCreation() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="TaskCreation">
            <Button variant="outline-dark" onClick={handleShow} style={{marginRight: "10px"}}>Create task</Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create task</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <div className="d-grid gap-2">
                            <Form.Floating className="mb-3">
                                <Form.Control
                                    id="fieldTaskName"
                                    type="text"
                                    placeholder="It's so important task"
                                />
                                <label htmlFor="floatingInputCustom">Task name</label>
                            </Form.Floating>

                            <FloatingLabel className="mb-3" controlId="floatingTextareaDescription" label="Description">
                                <Form.Control
                                    as="textarea"
                                    placeholder="Leave a description here"
                                    style={{ height: '60px', maxHeight: '100px', minHeight: '60px' }}
                                />
                            </FloatingLabel>
                        </div>

                        <Row className="g-2">
                            <Col md>
                                <FloatingLabel className="mb-3" controlId="floatingSelectStatus" label="Status">
                                    <Form.Select aria-label="Floating label select Status">
                                        <option value="null"> </option>
                                        <option value="Backlog">Backlog</option>
                                        <option value="Todo">To Do</option>
                                        <option value="Progress">In progress</option>
                                        <option value="ReadyQA">Ready for QA</option>
                                        <option value="Blocked">Blocked</option>
                                        <option value="Done">Done</option>
                                        <option value="DeployedProd">Deployed to Prod</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel className="mb-3" controlId="floatingSelectImportance" label="Importance">
                                    <Form.Select aria-label="Floating label select Importance">
                                        <option value="null"> </option>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                        <option value="Epic">Epic</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                        </Row>

                        <Row className="g-2">
                            <Col md>
                                <FloatingLabel className="mb-3" controlId="floatingSelectUrgency" label="Urgency">
                                    <Form.Select aria-label="Floating label select Urgency">
                                        <option value="null"> </option>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                        <option value="Epic">Epic</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel className="mb-3" controlId="floatingSelectComplexity" label="Complexity">
                                    <Form.Select aria-label="Floating label select Complexity">
                                        <option value="null"> </option>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                        <option value="Epic">Epic</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                        </Row>

                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit" size="lg">
                                Submit
                            </Button>
                        </div>
                    </Form>

                </Modal.Body>
            </Modal>
        </div>
    );
}

export default TaskCreation;
