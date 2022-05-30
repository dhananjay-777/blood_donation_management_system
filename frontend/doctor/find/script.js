// logout.addEventListener("click", () => {
//   localStorage.removeItem("jwt");
//   location.href = "../index.html";
// });

// let cardData = [
//   { name: "heading2", bloodGroup: "dhananjay", bloodQuantity: 2 },
//   { name: "heading3", bloodGroup: "dhananjay", bloodQuantity: 3 },
//   { name: "heading4", bloodGroup: "dhananjay", bloodQuantity: 4 },
//   { name: "heading5", bloodGroup: "dhananjay", bloodQuantity: 5 },
//   { name: "heading6", bloodGroup: "dhananjay", bloodQuantity: 6 },
//   { name: "heading2", bloodGroup: "dhananjay", bloodQuantity: 2 },
//   { name: "heading3", bloodGroup: "dhananjay", bloodQuantity: 3 },
//   { name: "heading4", bloodGroup: "dhananjay", bloodQuantity: 4 },
//   { name: "heading5", bloodGroup: "dhananjay", bloodQuantity: 5 },
// ];

const apiUrl = "http://localhost:3000";
let cardContainer = document.querySelector(".card-container");
let fillDetails = (array) => {
  cardContainer.innerHTML = "";
  array.forEach((element) => {
    let { donorName, bloodGroup, bloodQuantity } = element;
    let card = document.createElement("div");
    card.classList.add("card");
    let insideHtml = ` <div class="card-header">
          <div class="card-heading">Blood Donor</div>
        </div>
        <div class="card-content">
          <div class="name cont">${donorName}</div>
          <div class="bloodGroup cont">${bloodGroup}</div>
          <div class="bloodQuantity cont">${bloodQuantity} Unit</div>
        </div>`;
    card.innerHTML = insideHtml;
    // console.log(card);
    cardContainer.appendChild(card);
  });
};

// fillDetails(cardData);
let bloodGroup = localStorage.getItem("bloodGroup");
fetch(`${apiUrl}/add_check/check`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ bloodGroup }),
})
  .then((res) => res.json())
  .then((data) => {
    let details = data.data;
    fillDetails(details);
    localStorage.clear();
  })
  .catch((err) => {
    alert("Error while fetching details of donors");
    console.log(err);
  });
