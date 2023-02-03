import React from 'react'
import {FaRegTrashAlt} from 'react-icons/fa';

function Todos({ todo, toggleComplete, deleteTodo }) {

    const styles = {
        li: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
        liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
        row: `flex`,
        text: `ml-2 cursor-pointer`,
        textComplete: `ml-2 cursor-pointer line-through`,
        button: `cursor-pointer flex align-center`
    }

    return (
        <>
            <li className={todo.completed ? styles.liComplete : styles.li}>
                <div className={styles.row}>
                    <input onChange={() => toggleComplete(todo)} type="checkbox" checked={todo.completed ? 'checked' : ''} />
                    <p onClick={() => toggleComplete(todo)}className={todo.completed ? styles.textComplete : styles.text}>{todo.text}</p>
                </div>
                <button onClick={() => deleteTodo(todo.id)} >{<FaRegTrashAlt/>}</button>
            </li>
        </>
    );
};

export default Todos;
