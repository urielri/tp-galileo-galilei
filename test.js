async function t() {
  const response = await fetch("http://127.0.0.1:8000/api");
  console.log(response);
}
window.addEventListener("load", () => {
  t();
});
