import React from 'react';
import {Button, Card, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import TasksService from "../../../service/TasksService";


function Todo({ todo, index, markTodo, removeTodo }) {
    return (
        <div className="todo">
            <span style={{ textDecoration: todo.isDone ? "line-through" : "", display: "flex" }}>{todo.description}</span>
            <div className="my-2">
                <Button variant="outline-success" onClick={() => markTodo(index)}>✓</Button>{' '}
                <Button style={{float: 'right'}} variant="outline-danger" onClick={() => removeTodo(index)}><FaTrash/></Button>
            </div>
        </div>
    );
}

function FormTodo({ addTodo }) {
    const [value, setValue] = React.useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        addTodo(value);
        setValue("");
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label><b>Add Todo</b></Form.Label>
                <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new todo" />
            </Form.Group>
            <Button variant="primary mb-3" type="submit" className="my-2">
                Submit
            </Button>
        </Form>
    );
}

class Tasks extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            todos: []
        }
        this.addTodo = this.addTodo.bind(this);
        this.markTodo = this.markTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
    }

    setTodos(todos){
        this.setState({todos: todos})
    }

    addTodo(text){
        const newTodos = [...this.state.todos, { text }];
        this.setTodos(newTodos);
    };

    markTodo(index){
        const newTodos = [...this.state.todos];
        newTodos[index].isDone = true;
        this.setTodos(newTodos);
    };

    removeTodo(index){
        const newTodos = [...this.state.todos];
        newTodos.splice(index, 1);
        this.setTodos(newTodos);
    };

    componentDidMount() {
        TasksService.getTasks("2012-04-23T18:25:43Z", "datetime").then((response) => {
            this.setState({todos: response.data.tasks});
        });

        console.log()
    }

    render(){
        return (
            <div className="app">
                <div className="container">
                    <h1 className="text-center mb-4">Todo List</h1>
                    <FormTodo addTodo={this.addTodo} />
                    <div>
                        {this.state.todos.map((todo, index) => (
                            <Card className="my-2">
                                <Card.Body>
                                    <Todo
                                        key={index}
                                        index={index}
                                        todo={todo}
                                        markTodo={this.markTodo}
                                        removeTodo={this.removeTodo}
                                    />
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Tasks;