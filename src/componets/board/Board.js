import './Board.css'
import React from 'react';
import {Button, Card, Col, Row, Container} from "react-bootstrap";
import Task from '../task/Task';

function Board() {
    const statuses = getAllStatusesFromBE();
    const tasks = getAllTasksFromBE();
    return (
        <div className='board'>
            <Container className='border border-dark'>
                <Row>
                {statuses.map(function(status, index) {
                    return <Col className='border border-dark' key={ status }> { status } </Col>;
                    })
                }
                </Row>
                
                <Row>
                {statuses.map(function(status, index) {
                     return <Col className='border border-dark selfAlignCenter dropZone' key={ status }>  
                        {tasks.map(function(task, index) {
                            if (task.status === status) {
                                // return Task();
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

function getAllStatusesFromBE() {
    // statuses will be taken automatically from BE TODO 
    const statuses = ['Backlog', 'Todo', 'In progress', 'Ready for QA/Prod', 'Blocked', 'Done', 'Deployed to Prod'];
    return statuses;
}

function getAllTasksFromBE() {
    const response = MockGetFromBE();
    const state = response['status'];

    var tasks = [];
    if (state !== "OK") {
        setErrorDueGetTasks(response['message']);
        return tasks;
    }

    tasks = response['taskList'];
    console.log('tasks: ', tasks);

    return tasks;
}

function MockGetFromBE() {
    return {
        "message": "the request was successful",
        "status": "OK",
        "taskList": [
            {
                "id": 1,
                "name": "test",
                "description": null,
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
                "description": null,
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
                "id": 3,
                "name": "sanea",
                "description": null,
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
                "id": 4,
                "name": "dima",
                "description": null,
                "status": 'Backlog',
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

function setErrorDueGetTasks(errorMsg) {
    return;
}

export default Board;