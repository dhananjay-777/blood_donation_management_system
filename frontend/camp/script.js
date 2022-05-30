const apiUrl = "https://blood-donation-mngment-system.herokuapp.com";
const token = localStorage.getItem("jwt");

let cardContainer = document.querySelector(".card-container");
let fillDetails = (array) => {
  cardContainer.innerHTML = "";
  array.forEach((element) => {
    let { campid, address, doctorname, date } = element;
    let card = document.createElement("div");
    card.classList.add("card");
    let insideHtml = ` <div class="card-header">
          <div class="card-heading">Camp Details</div>
        </div>
        <div class="card-content">
          <div class="campId cont">CampID- ${campid}</div>
          <div class="address cont">Address- ${address}</div>
          <div class="doctorName cont">Doctor Name- ${doctorname}</div>
          <div class="date cont">Date- ${date}</div>
        </div>`;
    card.innerHTML = insideHtml;
    // console.log(card);
    cardContainer.appendChild(card);
  });
};

if (!token) {
  alert("Unauthorized access denied ");
  location.href = "../../../index.html";
} else {
  const body = document.querySelector("body");

  window.addEventListener("load", () => {
    body.classList.add("visible");
  });

  fetch(`${apiUrl}/add_check/find_camps`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      let details = data.data;
      fillDetails(details);
    })
    .catch((err) => {
      alert("Error while finding details of camps");
      console.log(err);
    });
}
