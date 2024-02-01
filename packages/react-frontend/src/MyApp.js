import React, {useState, useEffect} from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
	// --- HTTP requests --- //
	function getUsers() {
		const promise = fetch("http://localhost:8000/users");
		return promise;
	}

	function deleteUser(person) {
		const promise = fetch(`http://localhost:8000/users/${person._id}`, {
			method: "DELETE"
		})

		return promise;
	}

	function postUser(person) {
		const promise = fetch("http://localhost:8000/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(person),
		})

		return promise
	}

	// --- Hooks --- //
	const [characters, setCharacters] = useState([]);

	function removeOneCharacter(index) {
		deleteUser(characters[index])
			.then((res) => {
				if (res.status === 204) {
					setCharacters(characters.filter((character, i) => {
						return i !== index;
					}))
				}
			})
			.catch((error) => { console.log(error) })
	}

	function updateList(person) {
		// only adds the person locally if the POST resolves
		postUser(person)
			.then((res) => res.status === 201 ? res : undefined)
			.then((res) => res.json())
			.then((json) => setCharacters([...characters, json.user]))
			.catch((error) => { console.log(error) })
	}

	// populate users list
	useEffect(() => {
		getUsers()
			.then((res) => res.json())
			.then((json) => setCharacters(json["users_list"]))
			.catch((error) => { console.log(error); })
	}, [])

	return (
		<div className="container">
			<Table 
				characterData={characters} 
				removeCharacter={removeOneCharacter}
			/>
			<Form handleSubmit={updateList}/>
		</div>
	);
}

export default MyApp;
