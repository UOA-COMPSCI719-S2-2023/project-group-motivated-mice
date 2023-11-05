//to check if the given username is taken, if taken show "Username is already taken",
//if not show "Username is available" 
async function checkUsername() {
    const usernameInput = document.querySelector("#username");
    const username = usernameInput.value;
    const messageElement = document.getElementById('username-message');

    try {
        const response = await fetch(`/check-username/${username}`);
        const userData = await response.json();

        if (userData.exists) {
            messageElement.textContent = 'Username is already taken.';
            messageElement.style.color = 'red';
        } else {
            messageElement.textContent = 'Username is available.';
            messageElement.style.color = 'green';
        }
    } catch (error) {
        console.error('An error occurred while checking the username:', error);
        messageElement.textContent = 'An error occurred. Please try again later.';
        messageElement.style.color = 'red';
    }

}

// to check if two passwords are match
function validatePasswords() {
    const password = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirmPassword").value;
    const passwordMessage = document.querySelector("#password-message");

    if (password != confirmPassword) {
        passwordMessage.textContent = "Passwords do not match!";
        passwordMessage.style.color = "red";
        return false; //prevent form submission
    }

    return true; //Allow form submission
}

// Assume avatars is an array of avatar objects fetched from the server
async function loadAvatars() {
    const response = await fetch('/get-avatars');
    const avatars = await response.json();


    const avatarSelect = document.querySelector('#avatar');
    avatars.forEach(avatar => {
        const option = document.createElement('option');
        option.value = avatar.AvatarID;
        option.textContent = avatar.AvatarID; // show the avatar Id info
        avatarSelect.appendChild(option);
    });
}



window.addEventListener("load", loadAvatars);



