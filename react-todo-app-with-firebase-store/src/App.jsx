import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Todos from "./components/Todos";

import { db } from "./firebase";
import {
	query,
	collection,
	onSnapshot,
	updateDoc,
	doc,
	addDoc,
  deleteDoc
} from "firebase/firestore";

function App() {
	const [todos, setTodos] = useState(["Learn React", "Learn JavaScript"]);
	const [input, setInput] = useState("");

	// create todos
	const createTodo = async (e) => {
		e.preventDefault();
		if (input === "") {
			alert("Please enter a valid input");
		}
		await addDoc(collection(db, "todos"), {
			text: input,
			completed: false,
		});
		setInput("");
	};

	// read todo
	useEffect(() => {
		const q = query(collection(db, "todos"));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			let todosArray = [];
			querySnapshot.forEach((doc) => {
				todosArray.push({ ...doc.data(), id: doc.id });
			});
			setTodos(todosArray);
		});
		return () => unsubscribe();
	}, []);

	// toggle complete checkbox - update todo
	const toggleComplete = async (todo) => {
		await updateDoc(doc(db, "todos", todo.id), {
			completed: !todo.completed,
		});
	};

  // delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id))
  };

	const styles = {
		bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
		container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
		heading: `text-3xl font-bold text-center text-gray-800 p-2`,
		form: `flex justify-between`,
		input: `border p-2 w-full text-xl`,
		button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
		count: `text-center p-2`,
	};

	return (
		<div className={styles.bg}>
			<div className={styles.container}>
				{/* Form */}
				<h3 className={styles.heading}>Todo App</h3>
				<form onSubmit={createTodo} className={styles.form}>
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className={styles.input}
						placeholder="Add Todo.."
						type="text"
					/>
					<button className={styles.button}>
						<AiOutlinePlus size={30} />
					</button>
				</form>

				{/* Todos */}
				<ul>
					{todos.map((todo, index) => (
						<Todos
							key={index}
							todo={todo}
							toggleComplete={toggleComplete}
							deleteTodo={deleteTodo}
						/>
					))}
				</ul>

				{/* Counter */}
				{todos.length === 0 ? (
					<p className={styles.count}>{`You have ${todos.length} Todos`}</p>
				) : (
					<p className={styles.count}>{`You have ${todos.length} Todos`}</p>
				)}
			</div>
		</div>
	);
}

export default App;
