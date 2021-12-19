// import React, { useState } from "react";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import { v4 as uuid } from 'uuid';

// const itemsFromBackend = [
//     { id: uuid(), content: "First task" },
//     { id: uuid(), content: "Second task" },
//     { id: uuid(), content: "Third task" },
//     { id: uuid(), content: "Fourth task" },
//     { id: uuid(), content: "Fifth task" }
// ];

// const columnsFromBackend = {
//     [uuid()]: {
//         name: "Requested",
//         items: itemsFromBackend
//     },
//     [uuid()]: {
//         name: "To do",
//         items: []
//     },
//     [uuid()]: {
//         name: "In Progress",
//         items: []
//     },
//     [uuid()]: {
//         name: "Done",
//         items: []
//     }
// };

// const onDragEnd = (result, columns, setColumns) => {
//     if (!result.destination) return;
//     const { source, destination } = result;

//     if (source.droppableId !== destination.droppableId) {
//         const sourceColumn = columns[source.droppableId];
//         const destColumn = columns[destination.droppableId];
//         const sourceItems = [...sourceColumn.items];
//         const destItems = [...destColumn.items];
//         const [removed] = sourceItems.splice(source.index, 1);
//         destItems.splice(destination.index, 0, removed);
//         setColumns({
//             ...columns,
//             [source.droppableId]: {
//                 ...sourceColumn,
//                 items: sourceItems
//             },
//             [destination.droppableId]: {
//                 ...destColumn,
//                 items: destItems
//             }
//         });
//     } else {
//         const column = columns[source.droppableId];
//         const copiedItems = [...column.items];
//         const [removed] = copiedItems.splice(source.index, 1);
//         copiedItems.splice(destination.index, 0, removed);
//         setColumns({
//             ...columns,
//             [source.droppableId]: {
//                 ...column,
//                 items: copiedItems
//             }
//         });
//     }
// };

// function Board() {
//     const [columns, setColumns] = useState(columnsFromBackend);
//     return (
//         <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
//             <DragDropContext
//                 onDragEnd={result => onDragEnd(result, columns, setColumns)}
//             >
//                 {Object.entries(columns).map(([columnId, column], index) => {
//                     return (
//                         <div
//                             style={{
//                                 display: "flex",
//                                 flexDirection: "column",
//                                 alignItems: "center"
//                             }}
//                             key={columnId}
//                         >
//                             <h2>{column.name}</h2>
//                             <div style={{ margin: 8 }}>
//                                 <Droppable droppableId={columnId} key={columnId}>
//                                     {(provided, snapshot) => {
//                                         return (
//                                             <div
//                                                 {...provided.droppableProps}
//                                                 ref={provided.innerRef}
//                                                 style={{
//                                                     background: snapshot.isDraggingOver
//                                                         ? "lightblue"
//                                                         : "lightgrey",
//                                                     padding: 4,
//                                                     width: 250,
//                                                     minHeight: 500
//                                                 }}
//                                             >
//                                                 {column.items.map((item, index) => {
//                                                     return (
//                                                         <Draggable
//                                                             key={item.id}
//                                                             draggableId={item.id}
//                                                             index={index}
//                                                         >
//                                                             {(provided, snapshot) => {
//                                                                 return (
//                                                                     <div
//                                                                         ref={provided.innerRef}
//                                                                         {...provided.draggableProps}
//                                                                         {...provided.dragHandleProps}
//                                                                         style={{
//                                                                             userSelect: "none",
//                                                                             padding: 16,
//                                                                             margin: "0 0 8px 0",
//                                                                             minHeight: "50px",
//                                                                             backgroundColor: snapshot.isDragging
//                                                                                 ? "#263B4A"
//                                                                                 : "#456C86",
//                                                                             color: "white",
//                                                                             ...provided.draggableProps.style
//                                                                         }}
//                                                                     >
//                                                                         {item.content}
//                                                                     </div>
//                                                                 );
//                                                             }}
//                                                         </Draggable>
//                                                     );
//                                                 })}
//                                                 {provided.placeholder}
//                                             </div>
//                                         );
//                                     }}
//                                 </Droppable>
//                             </div>
//                         </div>
//                     );
//                 })}
//             </DragDropContext>
//         </div>
//     );
// }

import './Board.css'
import React from 'react';
import { Col, Row, Container } from "react-bootstrap";
import Task from '../task/Task.js';

function Board() {
    const statuses = getAllStatusesFromBE();
    const tasks = getAllTasksFromBE();
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

function setErrorDueGetTasks(errorMsg) {
    return;
}

export default Board;
