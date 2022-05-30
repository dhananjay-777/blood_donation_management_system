let find = document.querySelector(".findDonors");

const body = document.querySelector("body");
const token = localStorage.getItem("jwt");

if (!token) {
  alert("Unauthorized access denied ");
  location.href = "../../../index.html";
} else {
  window.addEventListener("load", () => {
    body.classList.add("visible");
  });

  const logout = document.querySelector(".logout");

  logout.addEventListener("click", () => {
    localStorage.setItem("jwt", "");
    location.href = "../../../index.html";
  });

  find.addEventListener("submit", (event) => {
    event.preventDefault();
    //localStorage.setItem("bloodGroup", document.querySelector(".findBtn").value);
    //console.log(document.querySelector(".findBtn").value);
    const bG = document.querySelector(".findBtn").value;
    let bloodGroup = bG.replace("+", "%2B");
    console.log(bloodGroup);
    location.href = `../find/index.html?bloodGroup=${bloodGroup}`;
  });
}
