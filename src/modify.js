function getToken() {
	return chrome.storage.sync.get("token");
}


function getGithubData(username) {
	// Make a request to the GitHub API to get the user's contributions
	const headers = {
		Authorization: `bearer ${token}`,
	};
	const body = {
		query: `query {
						user(login: "${username}") {
							name
							contributionsCollection {
								contributionCalendar {
									colors
									totalContributions
									weeks {
										contributionDays {
											color
											contributionCount
											date
											weekday
										}
										firstDay
									}
								}
							}
						}
					}`,
	};
	const response = fetch("https://api.github.com/graphql", {
		method: "POST",
		body: JSON.stringify(body),
		headers: headers,
	})
		.then((response) => response.json())
		.then((data) => {
			// Check if is found
			try {
				contribs =
					data.data.user.contributionsCollection.contributionCalendar
						.totalContributions;
			} catch (error) {
				return;
			}

			// Create required HTML elements
			console.log(data);
			var principal = document.getElementsByClassName("dl-horizontal")[0];
			var parent = document.createElement("div");
			var child1 = document.createElement("dt");
			var child2 = document.createElement("dd");
			principal.appendChild(parent);
			var p2text = parent.appendChild(child1);
			var p3text = parent.appendChild(child2);

			p2text.innerHTML = `GitHub Contributions: `;

			marker = "";

			// Icon to make quickier to understand.
			if (contribs < 100) {
				marker = "🔴";
			} else if (contribs > 100 && contribs < 200) {
				marker = "🟠";
			} else if (contribs > 300 && contribs < 400) {
				marker = "🟢";
			} else if (contribs > 100 && contribs < 600) {
				marker = "🟢";
			} else if (contribs > 600 && contribs < 1000) {
				marker = "⭐";
			} else if (contribs > 600 && contribs < 1000) {
				marker = "🌟";
			}
			p3text.innerHTML = `${marker} ${contribs}`;
		});
}

var ghElement = document.querySelector(
	'a[title="GitHub Link"][target="_blank"]'
);
if (ghElement) {
	var link = ghElement.getAttribute("href");
	var username = link.trimEnd("/").split("/");
	if(username[username.length -1] == ""){ username.splice(username.length-1,1)}
	username = username[username.length - 1];
	getToken().then(function (values) {
		token = values['token'];
		getGithubData(username);
	});
}