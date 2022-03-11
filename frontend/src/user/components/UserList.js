import React from 'react';

import UserItem from './UserItem';
import Card from '../../shared/components/UIElements/Card';

import './UserList.css';

function UserList(props) {
    // If there are no users:
    if (props.items.length === 0) {
        return (
            <div className="center">
                <Card>No User found</Card>
            </div>
        );
    }

    // If there are users, then return list:
    return (
        <ul className="user-list">{
            props.items.map(user => (
                <UserItem
                    key={user.id}
                    id={user.id}
                    image={user.image}
                    name={user.name}
                    quoteCount={user.quotes.length}
                />
            ))
        }</ul>
    );
}

export default UserList;
