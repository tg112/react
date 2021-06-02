import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAsyncGet, selectUsers } from './fetchSlice';

const Fetch = () => {
    const dispatch = useDispatch()
    const users = useSelector(selectUsers);
    console.log(users)

    useEffect(() => {
      dispatch(fetchAsyncGet());
    }, [dispatch])
    return (
        <div>
          {users.map(user => (
            <div key={user.id}>{user.name}</div>
          ))}
        </div>
    )
}

export default Fetch
