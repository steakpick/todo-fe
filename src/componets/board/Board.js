import './Board.css'
import React from 'react';
import { Col, Row, Container } from "react-bootstrap";
import Task from '../task/Task.js';
import Board from '@asseinfo/react-kanban'
import '@asseinfo/react-kanban/dist/styles.css'

class TodoBoard extends React.Component {
    render() {
        let data = this.getBoardData();
        return (<Board initialBoard={data} />);
        // return (
        //     <div className='board'>
        //         <Container className='border border-dark'>
        //             <Row>
        //                 {statuses.map(function (status, index) {
        //                     return <Col className='border border-dark' key={status}>{status}</Col>;
        //                 })
        //                 }
        //             </Row>

        //             <Row>
        //                 {statuses.map(function (status, index) {
        //                     return <Col className='border border-dark selfAlignCenter dropZone' key={status}>
        //                         {tasks.map(function (task, index) {

        //                             if (task['status'] === status) {
        //                                 return <Task data={task}/>;
        //                             }

        //                         })
        //                         }
        //                     </Col>;
        //                 })
        //                 }
        //             </Row>
        //         </Container>
        //     </div>
        // );
    }

    getBoardData() {
        const statusesResponse = this.getAllStatusesFromBE();
        const tasksResponse = this.getAllTasksFromBE();

        var columns = [];
        var card = new Map();
        var columnIndex = 1;
        for (const status of statusesResponse) {
            var column = new Map();
            column.set('id', columnIndex);
            column.set('title', status);

            var cards = [];
            var cardIndex = 0;
            for (const task of tasksResponse) {
                if (task['status'] != status) {
                    continue;
                }

                card = this.createCard(cardIndex, task);
                cards.push(card);
                cardIndex++;
            }
            if (cards.length < 1) {
                continue;
            }

            column = this.createColumn(status, columnIndex, cards);
            columns.push(column);
            ++columnIndex;
        }

        return this.createBoard(columns);
    }

    createCard(index, task) {
        var card = new Map();
        card.set('id', index + 1);
        if (task['name']) {
            card.set('title', task['name']);
        }
        if (task['description']) {
            card.set('description', task['description']);
        }

        return Object.fromEntries(card);
    }

    createColumn(status, index, cards) {
        var column = new Map();
        column.set('cards', cards);
        column.set('title', status);
        column.set('id', index);

        return Object.fromEntries(column);
    }

    createBoard(columns) {
        var boardData = new Map();
        boardData.set('columns', columns);
        console.debug('Board: ', boardData);

        return Object.fromEntries(boardData);
    }

    getAllStatusesFromBE() {
        // statuses will be taken automatically from BE TODO 
        const statuses = ['Todo', 'Doing', 'Done'];
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
                    "id": 2,
                    "name": "example",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    "status": 'Doing',
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
                    "status": 'Done',
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
                    "status": 'Todo',
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


export default TodoBoard;
