const password = document.getElementById("password");
const length = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");
const copyBtn = document.getElementById("copyBtn");

length.addEventListener("input", () => {
    lengthValue.textContent = length.value;
    generatePassword();
});

window.onload = generatePassword;

function generatePassword() {

    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const number = "0123456789";
    const symbol = "!@#$%^&*()_+-=[]{}<>?";

    let chars = "";

    if (document.getElementById("uppercase").checked) chars += upper;
    if (document.getElementById("lowercase").checked) chars += lower;
    if (document.getElementById("numbers").checked) chars += number;
    if (document.getElementById("symbols").checked) chars += symbol;

    if (chars.length === 0) {
        password.value = "";
        strengthText.innerHTML = "⚠️ Select at least one option";
        strengthBar.style.width = "0%";
        return;
    }

    let pass = "";

    // Guarantee one character from each selected type
    if (document.getElementById("uppercase").checked)
        pass += upper[Math.floor(Math.random() * upper.length)];

    if (document.getElementById("lowercase").checked)
        pass += lower[Math.floor(Math.random() * lower.length)];

    if (document.getElementById("numbers").checked)
        pass += number[Math.floor(Math.random() * number.length)];

    if (document.getElementById("symbols").checked)
        pass += symbol[Math.floor(Math.random() * symbol.length)];

    while (pass.length < Number(length.value)) {
        pass += chars[Math.floor(Math.random() * chars.length)];
    }

    // Shuffle password
    pass = pass.split("").sort(() => Math.random() - 0.5).join("");

    password.value = pass;

    checkStrength(pass);
}

function checkStrength(pass) {

    let score = 0;

    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 2) {
        strengthBar.style.width = "30%";
        strengthBar.style.background = "#ff3b30";
        strengthText.innerHTML = "🔴 Weak";
    } else if (score === 3) {
        strengthBar.style.width = "55%";
        strengthBar.style.background = "#ff9500";
        strengthText.innerHTML = "🟠 Fair";
    } else if (score === 4) {
        strengthBar.style.width = "80%";
        strengthBar.style.background = "#ffd60a";
        strengthText.innerHTML = "🟡 Strong";
    } else {
        strengthBar.style.width = "100%";
        strengthBar.style.background = "#34c759";
        strengthText.innerHTML = "🟢 Very Strong";
    }
}

function copyPassword() {

    if (password.value === "") return;

    navigator.clipboard.writeText(password.value);

    copyBtn.innerHTML = "✅ Copied!";

    setTimeout(() => {
        copyBtn.innerHTML = "📋 Copy Password";
    }, 2000);
}

function togglePassword() {

    if (password.type === "password") {
        password.type = "text";
        document.getElementById("showBtn").innerHTML = "🙈";
    } else {
        password.type = "password";
        document.getElementById("showBtn").innerHTML = "👁️";
    }
}