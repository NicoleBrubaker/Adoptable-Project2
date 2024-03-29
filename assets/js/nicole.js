var breedTypeForm = document.getElementById("breedTypeForm");
var breedInput = document.getElementById("breedInput");
var infoHeader = document.getElementById("infoHeader");
var adoptionSection = document.getElementById("adoptionSection");
var factsBox = document.getElementById("factsBox");
var infoBody = document.getElementById("infoBody");
var adoptionHeader = document.getElementById("adoptionHeader");
var learnMorePTag = document.getElementById("learnMorePTag");

function handleForm(event) {
  event.preventDefault();
  // Inserting the breed input value into section title content
  infoHeader.textContent = `Learn more about ${breedInput.value}'s.`;
  adoptionHeader.textContent = `${breedInput.value}s ready for a home!`;
  // Removing "hidden" class when a breed is entered into the form
  infoHeader.classList.remove("hidden");
  factsBox.classList.remove("hidden");
  infoBody.classList.remove("hidden");
  adoptionHeader.classList.remove("hidden");
  adoptionSection.classList.remove("hidden");
  learnMorePTag.classList.remove("hidden");
}

breedTypeForm.addEventListener("submit", handleForm);

// Favorites modal functionality open & close
document.addEventListener("DOMContentLoaded", (event) => {
  var allFavoritesButton = document.getElementById("allFavorites");
  var favoritesModal = document.getElementById("favoritesModal");
  var closeModal = document.getElementById("closeModal");

  allFavoritesButton.addEventListener("click", function () {
    favoritesModal.classList.remove("hidden");
  });

  closeModal.addEventListener("click", function () {
    favoritesModal.classList.add("hidden");
  });
});

// Saving favorited dogs to local storage
document.querySelectorAll(".saveFavorite").forEach((button, index) => {
  button.addEventListener("click", function () {
    
    var dogId = index + 1; // Calculate dogId based on button's index
    var dogData = {
      name: document.getElementById(`dogName${dogId}`).textContent,
      breed: document.getElementById(`dogBreed${dogId}`).textContent,
      gender: document.getElementById(`dogGender${dogId}`).textContent,
      age: document.getElementById(`dogAge${dogId}`).textContent,
      url: document.getElementById(`dogLink${dogId}`).href,
    };

    // Get existing favorites from local storage
    var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.push(dogData); // Add new favorites
    localStorage.setItem("favorites", JSON.stringify(favorites));
  });
});

// Updating modal data to display saved dogs info
function updateFavoritesModal() {
  var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  var tbody = document.querySelector("#favoritesModal table tbody");
  tbody.innerHTML = "";

  favorites.forEach((favorite, index) => {
    var tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${favorite.name}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${favorite.breed}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 underline"><a href="${favorite.url}" target="_blank">View Profile</a></td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
    <button class="removeFavorite" data-index="${index}" style="background-color: darkred; color: white; border: none; padding: 5px 10px; cursor: pointer;">Remove</button>
  </td>
    `;
    tbody.appendChild(tr);
  });

  // Add remove functionality
  document.querySelectorAll(".removeFavorite").forEach((button) => {
    button.addEventListener("click", function () {
      var index = this.getAttribute("data-index"); // Get index of dog to remove
      favorites.splice(index, 1); // Remove dog from favorites
      localStorage.setItem("favorites", JSON.stringify(favorites)); // Update local storage
      updateFavoritesModal(); // Refresh modal content
    });
  });
}

// Call updateFavoritesModal when the modal is opened
document.getElementById("allFavorites").addEventListener("click", function () {
  updateFavoritesModal(); // Ensures the latest favorites are displayed
  document.getElementById("favoritesModal").classList.remove("hidden");
});
