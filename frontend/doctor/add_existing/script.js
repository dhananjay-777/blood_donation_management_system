const apiUrl = "http://localhost:3000";
const add = document.querySelector(".add-detail");

add.addEventListener("submit", (event) => {
  event.preventDefault();

  const donorId = document.querySelector(".donorId").value;
  const bloodGroup = document.querySelector(".bloodGroup").value;
  const bloodQuantity = document.querySelector(".bloodQuantity").value;

  fetch(`${apiUrl}/add_check/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ donorId, bloodGroup, bloodQuantity }),
  })
    .then((res) => res.json())
    .then((data) => {
      const { key } = data;

      if (key) {
        alert("success");
        //  location.href = "../dashboard/index.html";
      } else {
        alert("Error");
      }
    })
    .catch((err) => {
      // console.log(err);
      alert(err);
    });
});
