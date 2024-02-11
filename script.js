// script.js

document
  .getElementById("assessmentForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Get description
    const description = document.getElementById("description").value;

    try {
      // Submit form data to backend server
      const response = await fetch("/analyze-house", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description }),
      });

      // Handle response from the backend
      if (!response.ok) {
        throw new Error("Failed to analyze house");
      }

      // Parse JSON response
      const assessmentData = await response.json();

      // Display assessment results
      displayAssessmentResults(
        assessmentData.immediateConcerns,
        assessmentData.recommendations
      );
    } catch (error) {
      // Handle errors
      console.error("Error analyzing house:", error);
      alert("Failed to analyze house. Please try again later.");
    }
  });

function displayAssessmentResults(immediateConcerns, recommendations) {
  const immediateConcernsElement = document.getElementById("immediateConcerns");
  const recommendationsElement = document.getElementById("recommendations");

  // Clear previous results
  immediateConcernsElement.innerHTML = "";
  recommendationsElement.innerHTML = "";

  // Display immediate concerns
  immediateConcernsElement.innerHTML = "<h3>Immediate Concerns:</h3>";
  if (immediateConcerns.length > 0) {
    const ul = document.createElement("ul");
    immediateConcerns.forEach(function (concern) {
      const li = document.createElement("li");
      li.textContent = concern;
      ul.appendChild(li);
    });
    immediateConcernsElement.appendChild(ul);
  } else {
    immediateConcernsElement.innerHTML += "<p>No immediate concerns found.</p>";
  }

  // Display recommendations
  recommendationsElement.innerHTML = "<h3>Recommendations:</h3>";
  if (recommendations.length > 0) {
    const ul = document.createElement("ul");
    recommendations.forEach(function (recommendation) {
      const li = document.createElement("li");
      li.textContent = recommendation;
      ul.appendChild(li);
    });
    recommendationsElement.appendChild(ul);
  } else {
    recommendationsElement.innerHTML += "<p>No recommendations available.</p>";
  }

  // Show assessment results section
  document.getElementById("assessmentResults").classList.remove("hidden");
}
