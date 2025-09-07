// Simple form validation
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault(); // prevent real submission
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const status = document.getElementById("formStatus");

  if (name && email && message) {
    status.style.color = "green";
    status.textContent = "Message sent successfully! (Not really, demo only)";
    this.reset();
  } else {
    status.style.color = "red";
    status.textContent = "Please fill all fields correctly.";
  }
});
