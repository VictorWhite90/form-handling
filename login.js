document.getElementById('form').addEventListener("submit", async function (e) {
    e.preventDefault()

    const email = document.getElementById('email');
    const password = document.getElementById("password");

    try{
        const req = await fetch("http://localhost:3000/login",
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            }
        )
        const data = await req.text()
        document.getElementById("message").innerText = data

        if( data.includes("successful")){
            window.location.href= "dashboard.html"
        }
    }
    catch (err){
        console.error("user not found, check email and password", err)
    }
})