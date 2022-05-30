const apiUrl = "https://blood-donation-mngment-system.herokuapp.com";
const add = document.querySelector(".add-detail");
const token = localStorage.getItem("jwt");
const body = document.querySelector("body");

window.addEventListener("load", () => {
  body.classList.add("visible");
});

if (!token) {
  alert("Unauthorized access denied ");
  location.href = "../../../index.html";
} else {
  add.addEventListener("submit", (event) => {
    event.preventDefault();

    const donorId = document.querySelector(".donorId").value;
    const bloodGroup = document.querySelector(".bloodGroup").value;
    const bloodQuantity = document.querySelector(".bloodQuantity").value;

    fetch(`${apiUrl}/add_check/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({ donorId, bloodGroup, bloodQuantity }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("success");
        location.href = "../dashboard/bootstrap.html";
      })
      .catch((err) => {
        // console.log(err);
        alert(err);
      });
  });
}
