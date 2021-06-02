import React from 'react'
import { useDispatch} from "react-redux";
import {completeTask, deleteTask} from "./TaskSlice";

const TaskItem = ({task}) => {
    const dispatch = useDispatch();
    return (
        <div>
            <input 
              type="checkbox" 
              onClick={() => dispatch(completeTask(task))} 
              defaultChecked={task.completed} 
            />
            <button onClick={() => dispatch(deleteTask(task))}>DELETE</button>
            <span>{task.title}</span>
        </div>
    )
}

export default TaskItem
