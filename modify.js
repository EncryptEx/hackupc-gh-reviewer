function getGithubData(username) {
    // Make a request to the GitHub API to get the user's contributions
    fetch(`https://api.github.com/users/${username}/events/public`)
        .then(response => response.json())
        .then(data => {
            let contributions = 0;
            // Iterate over the events and count the contributions
            data.forEach(event => {
                if (event.type === "PushEvent") {
                    contributions += event.payload.commits.length;
                }
            });
            // Print the contributions to the element with id "example"
            document.getElementById("example").innerHTML = `${username} has ${contributions} contributions`;
        })
        .catch(error => {
            console.log(error);
        });
}

getGithubData("username");