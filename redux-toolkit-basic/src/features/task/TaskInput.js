import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import { newTask } from './TaskSlice';

const TaskInput = () => {
    const dispatch = useDispatch();
    const [editTitle, setEditTitle] = useState("");
    const handleTitleChange = (e) => {
        setEditTitle(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(newTask(editTitle));
        setEditTitle("");
    }
    return (
        <form onSubmit={handleSubmit}>
            <input value={editTitle} type="text" onChange={handleTitleChange} placeholder="please type in" />
            <button>New</button>
        </form>
    )
}

export default TaskInput
