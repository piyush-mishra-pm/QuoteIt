import React from 'react';

import UserList from '../components/UserList';

// DUMMY User data:
const USERS = [
  {
      id: 'u01',
      name: 'Lorem Ipsum',
      image: 'https://images.pexels.com/photos/236149/pexels-photo-236149.jpeg?auto=compress&cs=tinysrgb&h=130',
      quoteCount: '1',
  },
];

const Users = () => {
  return <UserList items={USERS} />;
};

export default Users;