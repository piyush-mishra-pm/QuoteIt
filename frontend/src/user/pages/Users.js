import React, {useEffect, useState} from 'react';

import UserList from '../components/UserList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/ErrorModal';

const Users = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [fetchedUsers, setFetchedUsers] = useState();

  useEffect(() =>{
    // IIFE
    (async ()=> {
      try{
        setIsLoading(true);

        const response = await fetch('http://localhost:4000/api/v1/users');
        const data = await response.json();

        if(!response.ok){
          throw new Error(data.message);
        }

        setFetchedUsers(data.users);

      }catch(err){
        setError(err.message);
      }

      setIsLoading(false);
    })();

  },[]);

  const clearErrorHandler = () => {
    setError(null);
  }

  return (
      <React.Fragment>
          <ErrorModal error={error} onClear={clearErrorHandler} />
          {isLoading && <LoadingSpinner/>}
          {/* Render the user list when loading finihsed and some users are fetched. */}
          {!isLoading && fetchedUsers && <UserList items={fetchedUsers} />}
      </React.Fragment>
  );
};

export default Users;