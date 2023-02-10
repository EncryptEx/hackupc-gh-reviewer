function getToken() {
	return chrome.storage.sync.get("token");
}
function saveToken(token) { }

document.addEventListener(
	"DOMContentLoaded",
	function () {
		var saveButton = document.getElementById("saveToken");
		var getButton = document.getElementById("showToken");

		getButton.addEventListener("click", function (tab) {
			getToken().then(function (values) {
				token = values['token'];
				if (values['token'] == undefined || values['token'] == "") {
					document.getElementById("savedToken").value = "No token found";
				} else {
					document.getElementById("savedToken").value = values['token'];
				}
			});
		});
		saveButton.addEventListener("click", function (tab) {
			var token = document.getElementById("token").value;

			chrome.storage.sync.set({ token: token }, function () {
				alert("saved");
			});
		});
	},
	false
);
