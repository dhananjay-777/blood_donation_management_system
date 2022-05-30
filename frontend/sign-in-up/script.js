const apiUrl = "https://blood-donation-mngment-system.herokuapp.com";

const signInForm = document.querySelector(".sign-in-form");

const body = document.querySelector("body");

window.addEventListener("load", () => {
  body.classList.add("visible");
});

signInForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // console.log("heylo");

  const signInUserName = document.querySelector(".signin-license_no");
  const signInPassword = document.querySelector(".signin-password");

  const license_no = signInUserName.value;
  const doc_password = signInPassword.value;

  fetch(`${apiUrl}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ license_no, doc_password }),
  })
    .then((res) => res.json())
    .then((data) => {
      const { token } = data;

      if (token) {
        localStorage.setItem("jwt", token);
        // alert("success");
        location.href = "../doctor/dashboard/bootstrap.html";
      } else {
        alert("SignIn Again");
      }
    })
    .catch((err) => {
      alert("Error Signing In!!! Re-trry....");
      console.log(err);
    });
});

const signUpForm = document.querySelector(".sign-up-form");

signUpForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const license_no = document.querySelector(".signup-license_no").value;
  const doctor_name = document.querySelector(".signup-name").value;
  const doc_password = document.querySelector(".signup-password").value;
  const hospital = document.querySelector(".signup-hospitalname").value;

  fetch(`${apiUrl}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      doctor_name,
      doc_password,
      license_no,
      hospital,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const { token } = data;

      if (token) {
        localStorage.setItem("jwt", token);
        location.href = "../doctor/dashboard/bootstrap.html";
      } else {
        alert("SignIn Again");
      }
    })
    .catch((err) => {
      alert("Error Signing Up!!! Re-try....");
      console.log(err);
    });
});

// location.href = "../dashboard/index.html";
