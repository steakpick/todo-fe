import './Board.css'
import React from 'react';
import { Col, Row, Container } from "react-bootstrap";
import Task from '../task/Task.js';

class Board extends React.Component {
    render() {
        const statuses = this.getAllStatusesFromBE();
        const tasks = this.getAllTasksFromBE();
        return (
            <div className='board'>
                <Container className='border border-dark'>
                    <Row>
                        {statuses.map(function (status, index) {
                            return <Col className='border border-dark' key={status}>{status}</Col>;
                        })
                        }
                    </Row>
                    
                    <Row>
                        {statuses.map(function (status, index) {
                            return <Col className='border border-dark selfAlignCenter dropZone' key={status}>
                                {tasks.map(function (task, index) {
                                    
                                    if (task['status'] === status) {
                                        return <Task data={task}/>;
                                    }
                                    
                                })
                                }
                            </Col>;
                        })
                        }
                    </Row>
                </Container>
            </div>
        );
    }

    getAllStatusesFromBE() {
        // statuses will be taken automatically from BE TODO 
        const statuses = ['Todo','Doing', 'Done'];
        return statuses;
    }

    getAllTasksFromBE() {
        const response = this.MockGetFromBE();
        const state = response['status'];
    
        var tasks = [];
        if (state !== "OK") {
            this.setErrorDueGetTasks(response['message']);
            return tasks;
        }
    
        tasks = response['taskList'];
        console.log('tasks: ', tasks);
    
        return tasks;
    }

    MockGetFromBE() {
        return {
            "message": "the request was successful",
            "status": "OK",
            "taskList": [
                {
                    "id": 1,
                    "name": "test",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    "status": 'Backlog',
                    "importance": null,
                    "urgency": null,
                    "complexity": null,
                    "priority": null,
                    "creationDate": "2012-04-23T18:25:43",
                    "startDate": null,
                    "endDate": null,
                    "dueDate": null
                },
                {
                    "id": 2,
                    "name": "example",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    "status": 'Todo',
                    "importance": null,
                    "urgency": null,
                    "complexity": null,
                    "priority": null,
                    "creationDate": "2012-04-23T18:25:43",
                    "startDate": null,
                    "endDate": null,
                    "dueDate": null
                },
                {
                    "id": 3,
                    "name": "sanea",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    "status": 'In progress',
                    "importance": null,
                    "urgency": null,
                    "complexity": null,
                    "priority": null,
                    "creationDate": "2012-04-23T18:25:43",
                    "startDate": null,
                    "endDate": null,
                    "dueDate": null
                },
                {
                    "id": 4,
                    "name": "dima",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    "status": 'Blocked',
                    "importance": null,
                    "urgency": null,
                    "complexity": null,
                    "priority": null,
                    "creationDate": "2012-04-23T18:25:43",
                    "startDate": null,
                    "endDate": null,
                    "dueDate": null
                }
            ]
        };
    }

    setErrorDueGetTasks(errorMsg) {
        return;
    }
}


export default Board;
