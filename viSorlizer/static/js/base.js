AOS.init({
    duration: 1000,
    once: false
});

const getEle = id => {
    return document.getElementById(id);
}

window.onclick = function(event) {
    if (event.target.matches(".open")) {
        if (event.target.matches('.chatbot')) {
            getEle("chat-container").classList.toggle("show-chatbot");
        } else {
            getEle("sidenav").classList.toggle("show");
        }
    } else if (!(event.target.matches(".no-remove"))) {
        getEle("sidenav").classList.remove("show")
    }
}

document.getElementById("send-btn").addEventListener("click", async function() {
    let userInput = document.getElementById("user-input").value;
    let chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<p class="chat-text input">You: ${userInput}</p>`;

    document.getElementById("user-input").value = "";

    try {
        let response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userInput })
        });

        console.log("Response object:", response);

        if (!response.ok) {
            chatBox.innerHTML += `<p class="chat-text response">viBot: Error!!!</p>`;
            return;
        }

        let data = await response.json();
        chatBox.innerHTML += `<p class="chat-text response">viBot: ${data.response}</p>`;
    } catch (error) {
        chatBox.innerHTML += `<p class="chat-text response">viBot: Error!!!</p>`;
    }

    chatBox.scrollTop = chatBox.scrollHeight;
});
