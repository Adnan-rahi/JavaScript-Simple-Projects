const postContainer = document.getElementById("posts-container");
const loader = document.querySelector(".loader");
const filter = document.getElementById("filter");

let limit = 3;
let page = 1;

async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await res.json();

  return data;
}

async function showPost() {
  const posts = await getPosts();

  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
    <div class='number'>${post.id}</div>
    <div class='post-info'>
        <h2 class='post-title'>${post.title}</h2>
        <p class="post-body">${post.body}</p>
    </div>
    `;

    postContainer.appendChild(postEl);
  });
}

showPost();

function showLoader() {
  loader.classList.add("show");

  setTimeout(() => {
    loader.classList.remove("show");

    setTimeout(() => {
      page++;
      showPost();
    }, 300);
  }, 1000);
}

function filterPost(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");

  posts.forEach(post => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}

window.addEventListener("scroll", () => {
  const { scrollTop, clientHeight, scrollHeight } = document.body;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoader();
  }
});

filter.addEventListener("input", filterPost);
