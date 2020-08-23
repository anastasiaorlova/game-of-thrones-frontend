//Dom elements
const quoteContainer = document.querySelector(".quote");
const quoteForm = document.querySelector("#add-quote");

//Event listeners
quoteContainer.addEventListener("click", event => {
    if(event.target.matches(".like-button")) {
        const quoteCard = event.target.closest(".quote-card");
        const quoteId = quoteCard.dataset.id;
        const likesSpan = quoteCard.querySelector(".likes")
        const newLikes = parseInt(likesSpan.textContent) + 1;
        likesSpan.textContent = `${newLikes} 🖤`

        fetch(`http://localhost:3000/quotes/${quoteId}/like`, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        },
        body: JSON.stringify({
            like: newLikes
        })
    })
    }

    if (event.target.matches(".delete-button")) {
        const quoteCard = event.target.closest(".quote-card");
        const quoteId = quoteCard.dataset.id;

        fetch(`http://localhost:3000/quotes/${quoteId}`, {
        method: "DELETE",
    })
    .then(r => r.json())
    .then(() => {
        quoteCard.remove()
    })
    }
    });

quoteForm.addEventListener("submit", event => {
    event.preventDefault()
    const newQuote = {
        character: event.target.character.value,
        quote: event.target.quote.value,
        like: 0
}
    fetch(`http://localhost:3000/quotes`, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    },
    body: JSON.stringify(newQuote)
    })
    .then(r => r.json())
    .then(actualNewQuote => {
    renderRandomQuote(actualNewQuote)
    })
});
//Render helpers
function renderRandomQuote(quoteObj) {
    const quoteDiv = document.createElement("div");
    quoteDiv.className = "quote-card";
    quoteDiv.dataset.id = quoteObj.id;
    quoteDiv.innerHTML = `<p>${quoteObj.quote}</p>
    <h4>${quoteObj.character}</h4>
    <div class="likes-section">
    <span class="likes">${quoteObj.like}</span>
    <button class="like-button">🖤</button>
    <button class="delete-button">💀</button>
    </div>`
    quoteContainer.append(quoteDiv)
};
//Initial render 
fetch(`http://localhost:3000/quotes`)
.then(r => r.json())
.then(renderRandomQuote)
