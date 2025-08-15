let current = 0;
let steps = document.querySelectorAll(".form-page");
let nextBtns = document.querySelectorAll(".next-btn");
const togglePassword = document.getElementById("togglePassword")

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


function toggleIconForPassword(toggleId, inputId){
    const toggle = document.getElementById(toggleId);
    const input = document.getElementById(inputId);

    toggle.addEventListener("click", () => {
        input.type = input.type === "password" ? "text" : "password"
    })
}

toggleIconForPassword("togglePassword", "password");
toggleIconForPassword("togglePassword2", "password2")




// Handles form submission
document.addEventListener("DOMContentLoaded", ()=> {
    const form = document.getElementById("multiform");
    form.addEventListener('submit', async (e) => {
        e.preventDefault();


        const email = e.target.email.value.trim();
        const password = e.target.password.value.trim();
        const password2 = e.target.password2.value.trim();
        const fullName = e.target.fullName.value.trim();

        if(password !== password2){
            alert("password do not match")
            return;
        }


        try {
            const req = await fetch("https://form-handling-4.onrender.com/register", 
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({email, password, fullName})
                }
            )

            const data = await req.json();
            if(data.message === "User registered successfully"){
                window.location.href = "profile.html"
            }else(
                alert(data.message || "Registration failed, please try again later")
            )
        }
        catch (err) {
            console.log( "Response was not a valid JSON", err )
            alert("something went wrong. Please try again")
        }
    })
})
