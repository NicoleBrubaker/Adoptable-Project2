const apiKeytoken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJDMThhZlhBQk5kUmlaenZnZXNGQUVYRHJQUUs3TjRnV2lrQ3dDYVpCYnRmSjRsUkFhSSIsImp0aSI6ImM1YTg3ODYxZWEwYzIwNWNhNDQyZjhhOTcwYzU0ZTc0OWY1YWM3MGM0NGNmMzRjMjRlOTMzOTQ2NDEzN2Q1MDM4NDBmOTU5MjAwYzhjOTk1IiwiaWF0IjoxNzA4MDIxODU1LCJuYmYiOjE3MDgwMjE4NTUsImV4cCI6MTcwODAyNTQ1NSwic3ViIjoiIiwic2NvcGVzIjpbXX0.uJvBKUV4eWxxDMeQDfCPHr78ck6buSiYAbEtKw1APvO-Oh6CCb67bT9zdwI9JCfaU8zguKN3Z_Esgdz2Mz6jLTe0tWf5A_I-UUkL_gPm11u2xr3T7LmOrO8HSoTMjaqxk8p5ti_t0qSwY7qsRC_0fIWDZb4BMxoOqw0FpA4x8KwyNAI1SZAXVPqDrc54ACWAaqA-wHrVtSAJ-E6gygQax7Kp6wo2fR7aywhntqfESrQKv4sIQ3-1eXbSdoXs7HWtu2j896SDKqfnQd6hPuh6CUruDAPjmT_HY1El7_o5f9TjhbWD-rQeq5fL12X3GKthOD0hqpw99nXyebgW1dZBgg";
const breedsapiUrl = "https://api.petfinder.com/v2/types/dog/breed";
const searchBtn = document.getElementById("searchpets");
const breedInputEl = document.getElementById("breedInput");
const dogLink = document.getElementById("dogLink1");

// Function to open Petfinder URL for a specific breed
function openPetfinderUrl(breedName) {
  const petfinderUrl = `https://www.petfinder.com/dog-breed/${breedName}`;
  // console.log('Opening Petfinder URL:', petfinderUrl);
  // window.open(petfinderUrl, '_blank');

  fetch(
    `https://api.petfinder.com/v2/animals?type=dog&breed=` + breedInputEl.value,
    {
      headers: {
        Authorization: "Bearer " + apiKeytoken,
      },
    }
  )
    .then((response) => {
      if (response.status === 401) {
        fetchaccesstoken();
      }
      return response.json();
    })

    .then((data) => {
      // Filters out to only grab dogs with photos
      const animalsWithPhotos = data.animals.filter(
        (animal) => animal.photos && animal.photos.length > 0
      );
      dogCard1(animalsWithPhotos[0]);
      dogCard2(animalsWithPhotos[1]);
      dogCard3(animalsWithPhotos[2]);
    });
}

// Displaying info for first dog card
function dogCard1(data) {
  document.getElementById("dogPhoto1").src = data.photos[0].large;
  document.getElementById("dogName1").textContent = `${data.name}`;
  document.getElementById(
    "dogBreed1"
  ).textContent = `Breed: ${data.breeds.primary}`;
  document.getElementById("dogGender1").textContent = `Gender: ${data.gender}`;
  document.getElementById("dogAge1").textContent = `Age: ${data.age}`;
  document.getElementById("dogLink1").href = data.url;
}

// Displaying info for second dog card
function dogCard2(data) {
  document.getElementById("dogPhoto2").src = data.photos[0].large;
  document.getElementById("dogName2").textContent = `${data.name}`;
  document.getElementById(
    "dogBreed2"
  ).textContent = `Breed: ${data.breeds.primary}`;
  document.getElementById("dogGender2").textContent = `Gender: ${data.gender}`;
  document.getElementById("dogAge2").textContent = `Age: ${data.age}`;
  document.getElementById("dogLink2").href = data.url;
}

// Displaying info for third dog card
function dogCard3(data) {
  document.getElementById("dogPhoto3").src = data.photos[0].large;
  document.getElementById("dogName3").textContent = `${data.name}`;
  document.getElementById(
    "dogBreed3"
  ).textContent = `Breed: ${data.breeds.primary}`;
  document.getElementById("dogGender3").textContent = `Gender: ${data.gender}`;
  document.getElementById("dogAge3").textContent = `Age: ${data.age}`;
  document.getElementById("dogLink3").href = data.url;
}

// Event listener for clicks on dog photos
function handleSearch(event) {
  // event.preventDefault()
  //  if (event.target.classList.contains('dog-photo')) {
  event.preventDefault(); // Prevent the default behavior of the anchor tag
  const breedName = breedInputEl.value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
  openPetfinderUrl(breedName);
  //  }
}

breedTypeForm.addEventListener("submit", handleSearch);

//  fetch access token in console

//   function fetchaccesstoken(){
//     fetch('https://api.petfinder.com/v2/oauth2/token', {
//   method: 'POST',
//   body: new URLSearchParams({
//     'grant_type': 'client_credentials',
//     'client_id': 'C18afXABNdRiZzvgesFAEXDrPQK7N4gWikCwCaZBbtfJ4lRAaI',
//     'client_secret': 'F9fMYv1CtxFmx7foLXmkuubzVTF6u11fOgSeQq6i'
//   })
// }).then(res=> res.json())
// .then(data => {console.log(data)
// apiKeytoken = data.access_token})

//   }

//   fetchaccesstoken()
