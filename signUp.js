let current = 0;
let steps = document.querySelectorAll(".form-page");
let nextBtns = document.querySelectorAll(".next-btn");
const togglePassword = document.getElementById("togglePassword");

nextBtns.forEach((btn) => {
  btn.addEventListener("click", nextStep);
});

function nextStep() {
  let currentStep = steps[current];
  let inputs = currentStep.querySelectorAll("input, select, textarea");

  for (let input of inputs) {
    if (!input.checkValidity()) {
      input.reportValidity();
      return;
    }
  }

  if (current < steps.length - 1) {
    currentStep.classList.remove("active");
    current++;
    steps[current].classList.add("active");
  }
}

function backStep() {
  if (current > 0) {
    steps[current].classList.remove("active");
    current--;
    steps[current].classList.add("active");
  }
}

function toggleIconForPassword(toggleId, inputId) {
  const toggle = document.getElementById(toggleId);
  const input = document.getElementById(inputId);

  toggle.addEventListener("click", () => {
    input.type = input.type === "password" ? "text" : "password";
  });
}

toggleIconForPassword("togglePassword", "password");
toggleIconForPassword("togglePassword2", "password2");

// Handles form submission
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("multiform");
  const loader = document.getElementById("loader");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const fullName = e.target.fullName.value.trim();
    const password = e.target.password.value.trim();
    const password2 = e.target.password2.value.trim();

    if (password !== password2) {
      alert("password do not match");
      return;
    }

    try {
      loader.style.display = "flex";

      const req = await fetch("https://form-handling-4.onrender.com/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password, fullName }),
      });
      const data = await req.json();
      if (data.message === "User registered successfully") {
        alert("Registration Successful");
        window.location.href = "profile.html";
      } else {
        alert(data.message || "Registration Failed, please try again later");
      }
    } catch (err) {
      console.log(err.message);
      alert("something went wrong. Please try again");
    } finally {
      // Hide loader
      loader.style.display = "none";
    }
  });
});
