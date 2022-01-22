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
                    "name": "Walk with a dog",
                    "description": "Go to the central park.",
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
                    "name": "A ride to the countryside.",
                    "description": "Grandmother and grandfather are needed in help.",
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
                    "name": "Meet with friend on Friday night.",
                    "description": "Meet with Dmitrii Zalucean and Alexandr Serjant at the bar.",
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
                    "id": 4,
                    "name": "Complete APA project.",
                    "description": "Create a TODO app with the board.",
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
                    "id": 5,
                    "name": "Read a book about ReactJS.",
                    "description": "Investigate and learn React for APA project.",
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
                    "id": 6,
                    "name": "Investigate cross-origin issue.",
                    "description": "Investigate why can't my project be run from Google Chrome. Hint: Java issue.",
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
                    "id": 7,
                    "name": "Go to the GYM.",
                    "description": "I've been home working for a long time...",
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
                    "id": 8,
                    "name": "Complete all exams at University.",
                    "description": "Prepare and pass all exams succcessfully.",
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
                    "id": 9,
                    "name": "Prepare for German language exam.",
                    "description": "Repeat grammar, new lexic, prepare for the oral test.",
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
            ]
        };
    }

    setErrorDueGetTasks(errorMsg) {
        return;
    }
}


export default TodoBoard;
