let input = "";
const correctPassword = "200611";

function press(num) {
    if (input.length < 6) {
        input += num;
        document.getElementById("password-display").value = input;
    }
}

function clearDisplay() {
    input = "";
    document.getElementById("password-display").value = "";
    document.getElementById("message").innerText = "";
}

function checkPassword() {
    if (input === correctPassword) {
        // Redirect to the 2nd page
        window.location.href = "2nd.html"; 
    } else {
        document.getElementById("message").innerText = "Wrong Code! Try again.";
        clearDisplay();
    }
}