// "use strict";

// Wait for the button to be pressed to generate random character
document.getElementById("button").addEventListener("click", displayData);

function displayData() {
	// Create a random number ftom 1 to 83.

	const num = Math.ceil(Math.random() * 83);

	//creat a title for the random character
	document.getElementById(
		"title"
	).innerHTML = `Randomizer has picked character No${num}. Here is some info about this character.`;

	// Get data for the random Character and show the "name", "gender", "planet" and films it appeared.
	fetch(`https://swapi.dev/api/people/${num}/`, {})
		.then((response) => response.json())
		.then((data) => {
			// console.dir(data);
			document.getElementById("name").innerHTML = `<b>Character name:</b> ${data.name}`;
			document.getElementById("gender").innerHTML = `<b>Gender:</b> ${data.gender}`;

			fetch(data.homeworld, {})
				.then((response) => response.json())
				.then((planet) => {
					// console.dir(planet);
					document.getElementById("planet").innerHTML = `<b>Planet:</b> ${planet.name}`;
				});

			let filmNum = data.films;
			// console.dir(filmNum);
			document.getElementById("films").innerHTML = ``;
			filmNum.forEach((element) => {
				// console.log(element);

				fetch(element, {})
					.then((response) => response.json())
					.then((film) => {
						// console.dir(film.title);
						let filmTitles = document.getElementById("films").innerHTML;
						document.getElementById("films").innerHTML = `${filmTitles} <li>${film.title}</li>`;
					});
			});
		})

		.catch((error) => {
			console.error("Error:", error);
		});
}
