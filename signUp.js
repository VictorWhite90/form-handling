let current = 0;
let steps = document.querySelectorAll('.form-page');
let nextBtns = document.querySelectorAll('.next-btn');

nextBtns.forEach(btn => {
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
        currentStep.classList.remove('active');
        current++;
        steps[current].classList.add('active');
    }
}


function backStep() {
    if (current > 0){
        steps[current].classList.remove('active')
        current--
        steps[current].classList.add('active')
    }
}





// Handles form submission
document.addEventListener("DOMContentLoaded", ()=>{

    const form = document.getElementById("multiform");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const email = document.getElementById("email").value.trim();
        const fullName = document.getElementById("fullName").value.trim();
        const password = document.getElementById("password").value.trim();


        try{
            const req = await fetch ("https://form-handling-5.onrender.com/register", 
                {
                    method: 'POST',
                    headers:{
                        "content-type": "application/json"
                    },
                    body:JSON.stringify({email, password, fullName})
                }
            )

            const data = await req.text()
            if(data.includes("Registration successful")){
                window.location.href = "profile.html"
            };
        }
         
        catch (err){
            console.log("Error logging in", err)
        }

    })


})