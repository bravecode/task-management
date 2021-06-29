import React from 'react';
import { Text } from '@fluentui/react';
import { Draggable } from 'react-beautiful-dnd';
import classNames from 'classnames';
import classes from './Task.module.css';

export interface TaskProps {
    ID: string;
    title: string;
    author: string;
    active?: boolean;
}

const Task: React.FC<TaskProps> = ({
    ID,
    title,
    author,
    active,
}) => {
    const containerStyles = classNames({
        [classes.task]: true,
        [classes.active]: active,
    });

    return (
        <Draggable draggableId={ID} index={0}>
            {(provided) => (
                <div
                    className={containerStyles}
                    ref={provided.innerRef}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...provided.draggableProps}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...provided.dragHandleProps}
                >
                    <Text variant="medium" as="h3" className={classes.task__title}>
                        { title }
                    </Text>
                    <Text variant="small" as="h4" className={classes.task__author}>
                        { author }
                    </Text>
                </div>
            )}
        </Draggable>
    );
};

export default Task;
