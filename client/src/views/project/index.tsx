import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import classes from './index.module.css';

import Header from './components/Header';
import Board from './components/Board';
import useFetch from '../../utils/hooks/useFetch';
import Loader from '../../shared/loader/Loader';
import { IProjectBoards, prepareBoards } from './utils/tasksMapper';
import { IProjectValues } from '../projects/utils/projectMapper';
import CreateTask from './components/CreateTask';
import APIService from '../../utils/services/apiService';

interface IProjectParams {
    projectID: string;
}

type ProjectModal = {
    type: 'none'
} | {
    type: 'create'
} | {
    type: 'edit',
    data: IProjectValues
};

const Project: React.FC = () => {
    const { projectID } = useParams<IProjectParams>();

    // State
    const [modal, setModal] = useState<ProjectModal>({ type: 'none' });
    const [boards, setBoards] = useState<IProjectBoards>({
        done: [],
        in_progress: [],
        to_do: [],
    });

    // Get Project's Tasks
    const { data, loading, refetch } = useFetch<any[]>({
        url: `/projects/${projectID}/tasks`,
        includeToken: true,
    });

    useEffect(() => {
        // TODO:
        // X. Map to State
        // X. Handle Creation
        // X. Handle Moving between categories
        // 4. Handle Moving in the same category
        // 5. Design Update
        // 6. Clean Up
        // 7. Handle Update
        if (data) {
            setBoards(prepareBoards(data));
        }
    }, [data]);

    // Helpers
    const getBoardID = (value: string) => {
        switch (value) {
        case 'IN PROGRESS':
            return 'in_progress';
        case 'DONE':
            return 'done';
        default:
            return 'to_do';
        }
    };

    // Handle D&D
    const apiService = useMemo(() => new APIService({}), []);

    const handleCategoryChange = (taskID: string, newCategory: string) => {
        apiService.put(`/tasks/${taskID}`, JSON.stringify({ category: newCategory }));
    };

    // Handlers
    const handleDragEnd = (result: DropResult) => {
        // Find Item to transfer
        const toTransfer = boards[getBoardID(result.source.droppableId)]
            .find((item) => item.ID === result.draggableId);

        const destinationID = result.destination?.droppableId;

        if (toTransfer === undefined || !destinationID) {
            return;
        }

        const destinationCategory = getBoardID(destinationID);

        // Update DB
        handleCategoryChange(toTransfer.ID, destinationCategory);

        // Update Source List of Tasks
        const source = boards[getBoardID(result.source.droppableId)].filter((item) => {
            if (item.ID === result.draggableId) {
                return false;
            }

            return true;
        });

        // Update Destination List of Tasks
        const destination = boards[destinationCategory];
        destination.push(toTransfer);

        // Update Local State
        setBoards({
            ...boards,
            [getBoardID(result.source.droppableId)]: source,
            [getBoardID(result.destination?.droppableId ?? '')]: destination,
        });
    };

    const handleTaskCreate = () => {
        setModal({
            type: 'create',
        });
    };

    const handleModalClose = () => {
        setModal({
            type: 'none',
        });
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className={classes.container}>

            <Header
                projectID={projectID}
                onProjectCreate={handleTaskCreate}
            />

            <DragDropContext onDragEnd={handleDragEnd}>
                <Board
                    title="TO DO"
                    items={boards.to_do}
                />

                <Board
                    title="IN PROGRESS"
                    items={boards.in_progress}
                />

                <Board
                    title="DONE"
                    items={boards.done}
                />
            </DragDropContext>

            {
                modal.type === 'create' && (
                    <CreateTask
                        projectID={projectID}
                        onModalClose={handleModalClose}
                        onProjectsRefetch={refetch}
                    />
                )
            }

        </div>
    );
};

export default Project;
