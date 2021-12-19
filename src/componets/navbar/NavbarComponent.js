import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Offcanvas, Navbar, Container, Nav, Form} from "react-bootstrap";
import {FaUserCircle} from "react-icons/fa";
import './NavbarComponent.css';
import {useState} from "react";
import TaskCreation from "../TaskCreation/TaskCreation";
import {NavbarData, SidebarData} from "./NavbarData";

function NavbarComponent() {
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date().toISOString().substring(0, new Date().toISOString().indexOf("T")));
    //console.log("DATE", date);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="NavbarComponent">
            <Offcanvas show={show} onHide={handleClose} placement={"end"}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Profile</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    
                </Offcanvas.Body>
            </Offcanvas>

            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">TODO</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {NavbarData.map((item, index) => {
                                return (
                                    <Nav.Link href={item.path}>{item.title}</Nav.Link>
                                );
                            })}
                        </Nav>
                        <Form.Group controlId="cursDate" style={{marginRight: "10px"}}>
                            <Form.Control
                                type="date"
                                name="cursDate"
                                placeholder="Curs Date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}/>
                        </Form.Group>
                        <TaskCreation/>
                        <Button variant="outline-dark" onClick={handleShow}>
                            <FaUserCircle/>
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavbarComponent;
