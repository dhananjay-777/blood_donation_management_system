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
    const campId = document.querySelector(".campId").value;
    const address = document.querySelector(".address").value;
    const doctorName = document.querySelector(".doctorName").value;
    const date = document.querySelector(".date").value;

    fetch(`${apiUrl}/add_check/add_camp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({
        campId,
        address,
        doctorName,
        date,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Success");
        location.href = "../dashboard/bootstrap.html";
      })
      .catch((err) => {
        // console.log(err);
        alert("error");
      });
  });
}
