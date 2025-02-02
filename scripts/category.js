const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("btn-info");
    btn.classList.remove("bg-[#FFCCAD]")
  }
};

const loadPetCategories = (category) => {
  const sortButton = document.querySelector(".sort-pets");
        sortButton.removeAttribute("id");
        sortButton.setAttribute("id",category)
        
        sortButton.removeEventListener("click", sortPets);
        document
          .getElementById(`${category}`)
          .addEventListener("click", () => sortPetsByCategory(category));



  const spinner = document.getElementById("loading-spinner");
  const petSection = document.getElementById("petsPro");

  //initial id change

  // Show the spinner and hide the pet section
  spinner.classList.remove("hidden");
  petSection.classList.add("hidden");

  // Delaying the fetch call by 2 seconds
  setTimeout(() => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        removeActiveClass();
        const activeBtn = document.getElementById(`btn-${category}`);
        activeBtn.classList.add("btn-info");
        activeBtn.classList.add("bg-[#FFCCAD]")

        // Hide the spinner and show the pet section after data is fetched
        spinner.classList.add("hidden");
        petSection.classList.remove("hidden");

        

        displayPets(data.data);
      })
      .catch((error) => {
        console.log(error);
        // Hide the spinner on error
        spinner.classList.add("hidden");
        // Show the section even on error
        petSection.classList.remove("hidden");
      });
  }, 2000); // 2 second delay
  //sort by category
};

const displayCategories = (data) => {
  const categoryContainer = document.getElementById("pet-categories");

  data.forEach((item) => {
    const buttonContainer = document.createElement("div");

    buttonContainer.classList = "";
    buttonContainer.innerHTML = `
    <button id="btn-${item.category}" onclick="loadPetCategories('${item.category}')" class="btn category-btn w-40 lg:w-60 h-30  bg-white">
    <img class="object-cover h-4/5" src="${item.category_icon}" alt="${item.category}"  />
   ${item.category}
    </button>

    `;
    categoryContainer.append(buttonContainer);
  });
};
const loadLikeDetails = async (petId) => {
  const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayLikePet(data.petData);
};
const displayLikePet = (petData) => {
  const petLiked = document.getElementById("likePet");
  const newLiked = document.createElement("div");
  newLiked.classList = "border rounded-xl shadow-lg";
  newLiked.innerHTML = `
    <img
    class="lg:w-20 lg:h-20 object-cover w-30 rounded-xl"
      src=${petData.image}
      alt="Shoes"
      class="rounded-xl" />
    `;
  petLiked.append(newLiked);
};

const loadPetDetails = async (petId) => {
  const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayPetDetails(data.petData);
};

const displayPetDetails = (petData) => {
  const petDetailsInfo = document.getElementById("modalDetails");
  petDetailsInfo.innerHTML = `
      <div class="flex gap-4 ">
      <div class="w-45 h-40">
      <img
        src="${petData.image || "https://via.placeholder.com/150"}"
        alt="${petData.pet_name || "Pet Image"}"
        class="rounded-xl object-cover w-full h-full" />
      </div>
      <div>
      <h2 class="card-title">${petData.pet_name || "Unnamed Pet"}</h2>
      <p><i class="fa-solid fa-table-list"></i> Breed: ${
        petData.breed || "Not Available"
      }</p>
      <p><i class="fa-solid fa-calendar-days"></i> Birth: ${
        petData.date_of_birth ? petData.date_of_birth : "Date not provided"
      }</p>
      <p><i class="fa-solid fa-mercury"></i> Gender: ${
        petData.gender ? petData.gender : "Not specified"
      }</p>
      <p><i class="fa-solid fa-tags"></i> Price: ${
        petData.price !== null && petData.price !== undefined
          ? `$${petData.price}`
          : "Price not available"
      }</p>
      <p><i class="fa-solid fa-syringe"></i> Vaccinated status: ${
        petData.vaccinated_status ? petData.vaccinated_status : "Not specified"
      }</p>
      </div>
      </div>
      <div class="divider"></div>
      <p><b>Details Information:</b></p>
      <p>${petData.pet_details || "No additional details available."}</p>
    `;

  document.getElementById("showData").click();
};

const loadPetsProfile = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets ")
    .then((res) => res.json())
    .then((data) => displayPets(data.pets))
    .catch((error) => console.log(error));
};

const displayPets = (pets) => {
  const petSection = document.getElementById("petsPro");
  petSection.innerHTML = ``;

  if (pets.length === 0) {
    petSection.classList.remove("grid");
    petSection.innerHTML = `<div class="w-full text-center shadow-xl"> 
          <div class="h-full lg:h-96"><img class="w-40 mx-auto pt-6" src="images/error.webp" alt="No pets available" />
          <h2 class="text-3xl font-bold">"No Information Available"</h2>
          <p class="w-10/12 mx-auto">We Are Very Sorry! All The Birds Have Been Adopted. Please Check After Few Days.</p></div>
            </div>
          `;
    return;
  } else {
    petSection.classList.add("grid");
  }

  pets.forEach((pet) => {
    const card = document.createElement("div");
    card.classList = "card bg-base-100 w-78 shadow-xl border";
    card.innerHTML = `<figure class="px-4 pt-4">
        <img src="${pet.image || "https://via.placeholder.com/150"}" alt="${
      pet.pet_name || "Pet Image"
    }" class="rounded-xl" />
      </figure>
      <div class="p-4">
        <h2 class="card-title">${pet.pet_name || "Unnamed Pet"}</h2>
        <p><i class="fa-solid fa-table-list"></i> Breed: ${
          pet.breed || "Not Available"
        }</p>
        <p><i class="fa-solid fa-calendar-days"></i> Birth: ${
          pet.date_of_birth ? pet.date_of_birth : "Date not provided"
        }</p>
        <p><i class="fa-solid fa-mercury"></i> Gender: ${
          pet.gender ? pet.gender : "Not specified"
        }</p>
        <p><i class="fa-solid fa-tags"></i> Price: ${
          pet.price !== null && pet.price !== undefined
            ? `$${pet.price}`
            : "Price not available"
        }</p>
        <div class="divider"></div>
        <div class="card-actions grid grid-cols-3 gap-1 lg:gap-5">
          <button onclick="loadLikeDetails(${
            pet.petId
          })" class="btn border border-[#0E7A81] bg-white"><i class="fa-regular fa-thumbs-up text-gray-500 b"></i></button>
          <button onclick="clickAdopt(this)" class="adopt-btn btn btn-outline text-[#0E7A81] font-bold">Adopt</button>
          <button onclick="loadPetDetails(${
            pet.petId
          })" class="btn btn-outline text-[#0E7A81]  font-bold">Details</button>
        </div>
      </div>
      `;
    petSection.append(card);
  });
};

document.querySelector(".sort-pets").addEventListener("click", sortPets);

function sortPets() {
  const spinner = document.getElementById("loading-spinner");
  const petSection = document.getElementById("petsPro");

  // Show the spinner and hide the pet section
  spinner.classList.remove("hidden");
  petSection.classList.add("hidden");
  setTimeout(()=>{
    fetch("https://openapi.programming-hero.com/api/peddy/pets ")
    .then((res) => res.json())
    .then((data) => displayPets(data.pets.sort((a, b) => b.price - a.price)))
    .catch((error) => console.log(error));
    //hide the spinner
    spinner.classList.add("hidden");
    petSection.classList.remove("hidden");

  },2000)


  
}
async function sortPetsByCategory(pet) {
  const spinner = document.getElementById("loading-spinner");
  const petSection = document.getElementById("petsPro");

  // Show the spinner and hide the pet section
  spinner.classList.remove("hidden");
  petSection.classList.add("hidden");

  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${pet}`
  );
  const data = await res.json();
  const displayData = await data.data;
  setTimeout(() => {
    displayPets(displayData.sort((a, b) => b.price - a.price));
    // Hide the spinner and show the pet section after data is fetched
    spinner.classList.add("hidden");
    petSection.classList.remove("hidden");
  }, 1000);
}



//navigating view more to adopt section
document.getElementById("view-more").addEventListener("click", () => {
  window.location.href = "#adopt-best-friend";
});


//sent (this) keyword from the creation of the button as a
//target to the particular click adopt function since all class is same
const clickAdopt = (button) => {
  const modal = document.getElementById('my_modal_5');
  modal.showModal();

  let counter = 3; 
  const countdownElement = modal.querySelector('.countdown span');
  countdownElement.style.setProperty('--value', counter);
  const interval = setInterval(() => {
    counter--;
    countdownElement.style.setProperty('--value', counter);

    // Close the modal and clear the interval after 3 seconds
    if (counter <= 0) {
      clearInterval(interval);
      modal.close();
      button.textContent = 'Adopted'; 
      button.classList.add('bg-blue-200')
      button.disabled = true;
    }
  }, 1000); 
  
  
};




loadCategories();
loadPetsProfile();



