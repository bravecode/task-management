import React from 'react';
import { Text } from '@fluentui/react';
import { Droppable } from 'react-beautiful-dnd';
import classes from './Board.module.css';

import Task, { TaskProps } from './Task';

export interface BoardProps {
    title: string;
    items: TaskProps[];
}

const Board: React.FC<BoardProps> = ({
    title,
    items,
}) => (
    <div className={classes.board}>
        <Text variant="mediumPlus" as="h2" className={classes.board__title}>
            { title }
        </Text>

        <Droppable droppableId={title}>
            {(provided, snapshot) => (
                <div
                    className={classes.board__list}
                    ref={provided.innerRef}
                    style={{ backgroundColor: snapshot.isDraggingOver ? 'rgb(255, 235, 230)' : 'rgb(235, 236, 240)' }}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...provided.droppableProps}
                >
                    {
                        items.map((item) => (
                            <Task
                                key={item.ID}
                                ID={item.ID}
                                title={item.title}
                                author={item.author}
                            />
                        ))
                    }
                </div>
            )}
        </Droppable>
    </div>
);

export default Board;
