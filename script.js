const button = document.getElementById("readMoreBtn");
const text = document.getElementById("moreText");

button.addEventListener("click", function () {
    if (text.style.display === "none") {
        text.style.display = "block";
        button.textContent = "Read Less";
    } else {
        text.style.display = "none";
        button.textContent = "Read More";
    }
});
const addPostBtn = document.getElementById("addPostBtn");

addPostBtn.addEventListener("click", function () {
    const title = document.getElementById("postTitle").value;
    const author = document.getElementById("postAuthor").value;
    const content = document.getElementById("postContent").value;

    if (title === "" || author === "" || content === "") {
        alert("Please fill all the fields.");
        return;
    }

    savePost(title, author, content);

    const image = document.getElementById("postImage").files[0];
    const reader = new FileReader();

    reader.onload = function () {
        const newPost = document.createElement("div");
        newPost.className = "post";

        const imageHtml = image ? `<img src="${reader.result}" alt="Blog Image">` : "";

        newPost.innerHTML = `
            ${imageHtml}
            <h2>${title}</h2>
            <p>By ${author}</p>
            <p>${content}</p>
            <button>Read More</button>
        `;

        document.querySelector("main").appendChild(newPost);

        document.getElementById("postTitle").value = "";
        document.getElementById("postAuthor").value = "";
        document.getElementById("postContent").value = "";
        document.getElementById("postImage").value = "";
    };

    if (image) {
        reader.readAsDataURL(image);
    } else {
        reader.onload();
    }
});

// Save a blog post in localStorage
function savePost(title, author, content) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    posts.push({
        title: title,
        author: author,
        content: content
    });

    localStorage.setItem("posts", JSON.stringify(posts));
}
// Load saved posts when the page opens
window.addEventListener("load", function () {

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    posts.forEach(function (post) {

        const newPost = document.createElement("div");

        newPost.className = "post";

        newPost.innerHTML = `
            <h2>${post.title}</h2>
            <p>By ${post.author}</p>
            <p>${post.content}</p>
        `;

        document.querySelector("main").appendChild(newPost);
    });

});