const apiUrl = "https://blood-donation-mngment-system.herokuapp.com";

const add = document.querySelector(".add-detail");
const body = document.querySelector("body");
const token = localStorage.getItem("jwt");

if (!token) {
  alert("Unauthorized access denied ");
  location.href = "../../../index.html";
} else {
  window.addEventListener("load", () => {
    body.classList.add("visible");
  });
  add.addEventListener("submit", (event) => {
    event.preventDefault();
    const donorId = document.querySelector(".donorId").value;
    const bloodGroup = document.querySelector(".bloodGroup").value;
    const bloodQuantity = document.querySelector(".bloodQuantity").value;
    const donorName = document.querySelector(".donorName").value;
    const age = document.querySelector(".age").value;

    fetch(`${apiUrl}/add_check/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({
        donorId,
        bloodGroup,
        bloodQuantity,
        donorName,
        age,
      }),
    })
      .then(() => {
        alert("Success");
        location.href = "../dashboard/bootstrap.html";
      })
      .catch((err) => {
        // console.log(err);
        alert(err);
      });
  });
}
