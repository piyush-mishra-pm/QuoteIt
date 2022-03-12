import React, {useEffect, useState} from 'react';

import UserList from '../components/UserList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/ErrorModal';
import useHttpClient from '../../shared/hooks/http-hook';

const Users = () => {
  const {isLoading, sendRequest, error, clearErrorHandler} = useHttpClient();
  const [fetchedUsers, setFetchedUsers] = useState();

  useEffect(() =>{
    // IIFE
    (async ()=> {
      try{
        const data = await sendRequest('http://localhost:4000/api/v1/users');
        setFetchedUsers(data.users);
      }catch(err){}
    })();

  },[sendRequest]); // sendRequest uses a useCallback, so will not lead to inifinite loop here.

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