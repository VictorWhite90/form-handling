




let current = 0
let steps = document.querySelectorAll('.form-page')

let form = document.querySelector(".multi-form")
let backArrow = document.getElementById("backArrow")

function nextStep() {
    if(
        current < steps.length -1
    ){
        steps[current].classList.remove('active')
        current++
        steps[current].classList.add("active")
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
        e.preventDefault()

        const email = document.getElementById('email').value.trim()
        const password = document.getElementById("password").value.trim()
        const fullName = document.getElementById("fullName").value.trim()

        if(!email || !password || !fullName){
            alert("incomplete credentials")
            return;
        }

        try{
            const req = await fetch("http://localhost:3000/register", 

                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({email, password, fullName})
                }
            );
           
            const data = await req.text()
            if(data.includes("Registration successful")){
                
                window.location.href = "profile.html"
            }
        }
        catch (err){
            alert ("something wrong happened" + err)
        }
    })
})