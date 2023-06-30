const template = (formAction, inputs, buttonValue, link) => `
  <form method="POST" action="${formAction}" style="display: flex; flex-direction: column;">
    ${inputs
      .map(
        ({ id, label }) => `
      <label for="${id}" style="margin: 10px 0;">${label}:</label>
      <input type="${
        id === "password" ? "password" : "text"
      }" id="${id}" name="${id}" style="margin-bottom: 10px;">
    `
      )
      .join("")}
    <input type="submit" value="${buttonValue}" style="width: 100px; margin-top: 10px;">
  </form>
  <div style="margin-top: 20px;">
    <a href="${link.href}">${link.text}</a>
  </div>
`;

const login = template(
  "/login",
  [
    { id: "email", label: "Email" },
    { id: "password", label: "Password" },
  ],
  "Submit",
  { href: "/register", text: "Register" }
);

const register = template(
  "/register",
  [
    { id: "lastname", label: "Last Name" },
    { id: "firstname", label: "First Name" },
    { id: "email", label: "Email" },
    { id: "password", label: "Password" },
  ],
  "Submit",
  { href: "/login", text: "Login" }
);

const loggedIn = `
  <h1>Welcome!</h1>
  <p>You are now logged in.</p>
  <a href="/logout">Logout</a>
`;

const home = `
  <h1>Home</h1>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <a href="/login" style="margin-bottom: 10px;">Login</a>
    <a href="/register">Register</a>
  </div>
`;

module.exports = {
  login,
  loggedIn,
  register,
  home,
};
