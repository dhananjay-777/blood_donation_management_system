let find = document.querySelector(".findDonors");

find.addEventListener("submit", (event) => {
  event.preventDefault();
  localStorage.setItem("bloodGroup", document.querySelector(".findBtn").value);
  //console.log(document.querySelector(".findBtn").value);
  location.href = "../find/index.html";
});
