import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import DeleteIcon from '@material-ui/icons/Delete';

export function ItemsTable({ items = [], className }: ItemsTableProps): JSX.Element | null {
    return items.length > 0 ? (
        <div className={className}>
            <ListGroup>
                {items.map((item, index) => {
                    return (
                        <ListGroup.Item key={`option-${index}`} className={'flex items-center justify-between'}>
                            {item.text}
                            <Button id={`${index}`} variant="warning" onClick={item.onClick}>
                                <DeleteIcon />
                            </Button>
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
        </div>
    ) : null;
}

export interface ItemsTableProps {
    items?: {
        text: string;
        onClick?: any;
    }[];
    className?: string;
}

export default ItemsTable;
