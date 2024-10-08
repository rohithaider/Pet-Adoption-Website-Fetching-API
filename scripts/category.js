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
  }
};


const loadPetCategories = (category) => {
    const spinner = document.getElementById("loading-spinner");
    const petSection = document.getElementById("petsPro");
    
    
  
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
  };
  

  

const displayCategories = (data) => {
  const categoryContainer = document.getElementById("pet-categories");

  data.forEach((item) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.classList = "";
    buttonContainer.innerHTML = `
    <button id="btn-${item.category}" onclick="loadPetCategories('${item.category}')" class="btn category-btn w-full md:w-48 lg:w-72 h-30 p-4 bg-white">
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
  newLiked.classList = "border rounded";
  newLiked.innerHTML = `
    <img
    class="lg:w-20 lg:h-20 object-cover w-30 p-1"
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
  const petDetailsC = document.getElementById("modalDetails");
  petDetailsC.innerHTML = `<img
      src=${petData.image}
      alt="Shoes"
      class="rounded-xl" />
      <h2 class="card-title"> ${petData.pet_name}</h2>
  <p><i class="fa-solid fa-table-list"></i> Breed:${
    petData.breed === undefined ? "Not Available" : petData.breed
  }</p>
  <p><i class="fa-solid fa-calendar-days"></i> Birth:${
    petData.date_of_birth
  }</p>
  <p><i class="fa-solid fa-mercury"></i> Gender:${petData.gender}</p>
  <p><i class="fa-solid fa-tags"></i> Price:${petData.price}</p>
   <p><i class="fa-solid fa-syringe"></i> Vaccinated status:${
     petData.vaccinated_status
   }</p>
    <div class="divider"></div>
   <p>Details Information</p>
   <p>${petData.pet_details}</p>
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
  petSection.innerHTML = "";

  if (pets.length == 0) {
    petSection.classList.remove("grid");
    petSection.innerHTML = `<div class ="w-full text-center  shadow-xl"> 
        <div class="h-full lg:h-96"><img class= "w-40 mx-auto pt-6" src="images/error.webp" alt="" />
        <h2 class=" text-3xl font-bold "> "No Information Available"</h2>
        <p class= "w-10/12 mx-auto">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
its layout. The point of using Lorem Ipsum is that it has a.</p></div>
          </div>
        `;
    return;
  } else {
    petSection.classList.add("grid");
  }

  pets.forEach((pets) => {
    const card = document.createElement("div");
    card.classList = "card bg-base-100 w-78 shadow-xl border";
    card.innerHTML = `<figure class="px-4 pt-4">
    <img
      src=${pets.image}
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="p-4">
  <h2 class="card-title"> ${pets.pet_name}</h2>
  <p><i class="fa-solid fa-table-list"></i> Breed:${
    pets.breed === undefined ? "Not Available" : pets.breed
  }</p>
  <p><i class="fa-solid fa-calendar-days"></i> Birth:${pets.date_of_birth}</p>
  <p><i class="fa-solid fa-mercury"></i> Gender:${pets.gender}</p>
  <p><i class="fa-solid fa-tags"></i> Price:${(pets.price !== null ? pets.price:"No Price Given")}</p>
    <div class="divider"></div>
    <div class="card-actions flex justify-around">
    <button onclick="loadLikeDetails(${
      pets.petId
    })" class="btn btn-outline"><i class="fa-regular fa-thumbs-up"></i></button>
    <button class="btn btn-outline text-lime-600 font-bold">Adopt</button>
    <button onclick="loadPetDetails(${
      pets.petId
    })"  class="btn btn-outline text-lime-600 font-bold">Details</button>
    </div>
  </div>
        `;
    petSection.append(card);
  });
};

document.getElementById('sort-pets').addEventListener('click',(e)=>{
    sortPets();

})

function sortPets(){
    fetch("https://openapi.programming-hero.com/api/peddy/pets ")
    .then((res) => res.json())
    .then((data) => displayPets(data.pets.sort((a,b)=>b.price-a.price)))
    .catch((error) => console.log(error));

}

document.getElementById('view-more').addEventListener('click',()=>{
    window.location.href="#adopt-best-friend"
})


loadCategories();
loadPetsProfile();
