const apiUrl = "https://blood-donation-mngment-system.herokuapp.com";
const token = localStorage.getItem("jwt");

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
//console.log(params);
const bloodGroup = params.bloodGroup;
//console.log(bloodGroup);

if (!token) {
  alert("Unauthorized access denied ");
  location.href = "../../../index.html";
} else {
  let cardContainer = document.querySelector(".card-container");
  let fillDetails = (array) => {
    cardContainer.innerHTML = "";
    array.forEach((element) => {
      let { donorname, bloodgroup, bloodquantity } = element;
      let card = document.createElement("div");
      card.classList.add("card");
      let insideHtml = ` <div class="card-header">
          <div class="card-heading">Blood Donor</div>
        </div>
        <div class="card-content">
          <div class="name cont">${donorname}</div>
          <div class="bloodGroup cont">${bloodgroup}</div>
          <div class="bloodQuantity cont">${bloodquantity} Unit</div>
        </div>`;
      card.innerHTML = insideHtml;
      // console.log(card);
      cardContainer.appendChild(card);
    });
  };

  const body = document.querySelector("body");

  window.addEventListener("load", () => {
    body.classList.add("visible");
  });
  //fillDetails(cardData);

  fetch(`${apiUrl}/add_check/check/${bloodGroup}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      let details = data.data;
      fillDetails(details);
    })
    .catch((err) => {
      alert("Error while fetching details of donors");
      console.log(err);
    });
}
