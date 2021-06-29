import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import classes from './index.module.css';

import Header from './components/Header';
import Board from './components/Board';
import { TaskProps } from './components/Task';

interface IProjectParams {
    projectID: string;
}

const Project: React.FC = () => {
    const { projectID } = useParams<IProjectParams>();

    const [boards, setBoards] = useState<Record<string, TaskProps[]>>({
        toDo: [
            {
                ID: '0',
                title: 'Title X',
                author: 'John Doe',
            },
        ],
        inProgress: [],
        done: [],
    });

    // Helpers
    const getBoardID = (value: string) => {
        switch (value) {
        case 'IN PROGRESS':
            return 'inProgress';
        case 'DONE':
            return 'done';
        default:
            return 'toDo';
        }
    };

    // Handlers
    const handleDragEnd = (result: DropResult, provided: ResponderProvided) => {
        console.log(result);
        console.log(provided);

        // Find Item to transfer
        let toTransfer: TaskProps | null = null;

        const source = boards[getBoardID(result.source.droppableId)].filter((item) => {
            if (item.ID === result.draggableId) {
                toTransfer = item;

                return false;
            }

            return true;
        });

        const destination = boards[getBoardID(result.destination?.droppableId ?? '')];

        if (toTransfer) {
            destination.push(toTransfer);
        }

        setBoards({
            ...boards,
            [getBoardID(result.source.droppableId)]: source,
            [getBoardID(result.destination?.droppableId ?? '')]: destination,
        });
    };

    return (
        <div className={classes.container}>

            <Header projectID={projectID} />

            <DragDropContext onDragEnd={handleDragEnd}>
                <Board
                    title="TO DO"
                    items={boards.toDo}
                />

                <Board
                    title="IN PROGRESS"
                    items={boards.inProgress}
                />

                <Board
                    title="DONE"
                    items={boards.done}
                />
            </DragDropContext>

        </div>
    );
};

export default Project;
