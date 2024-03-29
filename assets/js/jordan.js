var formEl = document.querySelector("#breedTypeForm");
var inputEl = document.getElementById("breedInput");
var infoTextArea = document.getElementById("infoBody");

// API information
var accesskey = "8KUYju2fMKa07wcc0bQTxubvo7B7yPKgcK8Aa4zD";
var apiUrl = "https://api.api-ninjas.com/v1/dogs?";

// Adding event listener to wait for form input before fetching API data
formEl.addEventListener("submit", function () {
  var breedName = inputEl.value;
  searchImages(breedName);
});
// API fetch
async function searchImages(breedName) {
  const response = await fetch(apiUrl + "name=" + breedName, {
    method: "GET",
    headers: {
      "X-Api-Key": accesskey,
    },
  });
  var data = await response.json();
  const element = data[0];

  // Clear previous results
  infoTextArea.innerHTML = "";

  // Create a ul to hold the bullet point facts
  var ulElement = document.createElement("ul");

  // Good with children
  var liElementGoodWithChildren = document.createElement("li");
  liElementGoodWithChildren.textContent = `Good with children: ${element.good_with_children}`;
  ulElement.appendChild(liElementGoodWithChildren);

  // Energy level
  var liElementEnergy = document.createElement("li");
  liElementEnergy.textContent = `Energy level: ${element.energy}`;
  ulElement.appendChild(liElementEnergy);

  // Barking level
  var liElementBarking = document.createElement("li");
  liElementBarking.textContent = `Barking level: ${element.barking}`;
  ulElement.appendChild(liElementBarking);

  // Protectiveness
  var liElementProtectiveness = document.createElement("li");
  liElementProtectiveness.textContent = `Protectiveness: ${element.protectiveness}`;
  ulElement.appendChild(liElementProtectiveness);

  // Append the list to the info display area
  infoTextArea.appendChild(ulElement);
}
