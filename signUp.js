let current = 0;
let steps = document.querySelectorAll(".form-page");
let nextBtns = document.querySelectorAll(".next-btn");

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

// Handles form submission
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("multiform");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const fullName = e.target.fullName.value.trim();
    const password = e.target.password.value.trim();

  try {
  const req = await fetch("https://form-handling-5.onrender.com/register", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password, fullName }),
  });

  const text = await req.text();
  console.log("Raw response from Render:", text);

  // Try parsing only if it's valid JSON
  try {
    const data = JSON.parse(text);
    if (data.message === "successful") {
      window.location.href = "profile.html";
    }
  } catch (err) {
    console.error("Not JSON, probably HTML:", err);
  }
} catch (err) {
  console.error("Error logging in", err);
}

  });
});
