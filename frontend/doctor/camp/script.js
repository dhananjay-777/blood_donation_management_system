const apiUrl = "http://localhost:3000";

const add = document.querySelector(".add-detail");

add.addEventListener("submit", () => {
  const campId = document.querySelector(".campId").value;
  const address = document.querySelector(".address").value;
  const doctorName = document.querySelector(".doctorName").value;
  const date = document.querySelector(".date").value;

  fetch(`${apiUrl}/add_check/add_camp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
