// Decide to show new user main page or standard main page

let cookie = document.cookie;

if(cookie)
{
	_getUserData();
}
else
{
  import("./elements/wanderer-app-new-user.js");
}

async function _getUserData() {
	try {
		const userResponse = await fetch(serverAddress + '/users/find/' + cookie.split("=")[1]);
		currentUser = await userResponse.json();
		if(currentUser.email != cookie.split("=")[1])
		{
			document.cookie = "WandererAppCookie= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
		}
	  import("./elements/wanderer-app.js");
	}
	catch (err) {
		console.log('User fetch failed', err);
		document.cookie = "WandererAppCookie= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
		location.reload();
	}
}
