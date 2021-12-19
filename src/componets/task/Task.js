import { Card, Button } from "react-bootstrap";
import './Task.css';

function Task(props) {
    const task = props.data;
    console.log('task in Task: ', task);
    return (
    <div className="task ticket">
        <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title className="customTitle">
                <Button variant="primary">{ task['name'] }</Button>
            </Card.Title>
            <Card.Text className="cardBody">
                { task['description'] }
            </Card.Text>
            
        </Card.Body>
    </Card>
    </div>) 
}

export default Task;