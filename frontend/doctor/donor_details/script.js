const apiUrl = "http://localhost:3000";

const add = document.querySelector(".add-detail");

add.addEventListener("submit", () => {
  const donorId = document.querySelector(".donorId").value;
  const bloodGroup = document.querySelector(".bloodGroup").value;
  const bloodQuantity = document.querySelector(".bloodQuantity").value;
  const donorName = document.querySelector(".donorName").value;
  const age = document.querySelector(".age").value;

  fetch(`${apiUrl}/add_check/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      donorId,
      bloodGroup,
      bloodQuantity,
      donorName,
      age,
    }),
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
