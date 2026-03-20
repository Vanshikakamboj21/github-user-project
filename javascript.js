async function github(){
  const response = await fetch("https://api.github.com/users");
  const data = await response.json();

  const parent = document.getElementById("first");

  for(let user of data){

    const element = document.createElement("div");
    element.classList.add("user");

    const image = document.createElement("img");
    image.src = user.avatar_url;

    const username = document.createElement("h2");
    username.textContent = user.login;

    const anchor = document.createElement("a");
    anchor.href = user.html_url;
    anchor.textContent = "Visit Profile";

    element.append(image, username, anchor);
    parent.append(element);

    // ✅ FIX: inside loop
    element.addEventListener("click", async () => {

      const res = await fetch(user.url);
      const details = await res.json();

      const modal = document.getElementById("modal");
      modal.style.display = "flex";

      document.getElementById("modal-img").src = details.avatar_url;
      document.getElementById("modal-name").textContent =
        details.name || "No Name";

      document.getElementById("username").textContent =
        "Username: " + details.login;

      document.getElementById("bio").textContent =
        "Bio: " + (details.bio || "No Bio");

      document.getElementById("followers").textContent =
        "Followers: " + details.followers;

      document.getElementById("following").textContent =
        "Following: " + details.following;

      document.getElementById("location").textContent =
        "Location: " + (details.location || "N/A");

      document.getElementById("company").textContent =
        "Company: " + (details.company || "N/A");

      document.getElementById("modal-link").href = details.html_url;

    });
  }
}

github();
const closeBtn = document.getElementById("close");
closeBtn.classList="exit";

closeBtn.addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});