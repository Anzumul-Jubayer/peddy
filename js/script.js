const categoryDiv = document.getElementById("category-div");
const allPets = document.getElementById("all-pets");
const modalContainer = document.getElementById("modal-container");

// category
const loadAllCategory = () => {
  const url = "https://openapi.programming-hero.com/api/peddy/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAllCategory(data.categories));
};
const showAllCategory = (data) => {
  categoryDiv.innerHTML = "";
  data.forEach((el) => {
    categoryDiv.innerHTML += ` <a  id="${el.id}"
            class="anchor flex items-center gap-3 border-1 border-gray-300 px-14 py-5 rounded-xl hover:bg-[#0e7a811a] cursor-pointer" 
          >
            <img src="${el.category_icon}" alt="" />
            <h1 class="font-bold text-2xl">${el.category}</h1>
          </a>`;
  });
  categoryDiv.addEventListener("click", (event) => {
    const allBtns = document.querySelectorAll(".anchor");
    allBtns.forEach((el) => {
      el.classList.remove("bg-[#0e7a811a]");
    });
    if (event.target.tagName === "A") {
      event.target.classList.add("bg-[#0e7a811a]", "hover:none");
      loadPetByCategory(event.target.innerText);
    }
  });
};
// all pets
let allPet=[]
const loadAllPets = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
  .then((data) => {
   allPet = data.pets;       
   showAllPets(allPet);      
});
}

const showAllPets = (data) => {
  allPets.innerHTML = "";
  data.forEach((el) => {
    const div = document.createElement("div");
    div.innerHTML = `<div class="card bg-base-100 shadow-sm">
              <figure class="p-3">
                <img
                  src="${el.image}" class="h-50 w-full object-cover"
                />
              </figure>
              <div class="card-body">
                <h2 class="card-title">
                  ${el.pet_name}
                </h2>
                <p class="text-gray-500 my-1"><i class="fa-solid fa-table-cells-large"></i> Breed: ${el.breed}</p>
                <p class="text-gray-500 my-1"><i class="fa-regular fa-calendar"></i> ${el.date_of_birth}</p>
                <p class="text-gray-500 my-1"><i class="fa-solid fa-mercury"></i> Gender: ${el.gender}  </p>
                <p class="text-gray-500 mt-1"><i class="fa-solid fa-dollar-sign"></i> Price : ${el.price} </p>
                <div class="card-actions justify-between mt-3">
                  <div onclick="addToLiked('${el.image}')" class="border-1 border-gray-400 px-3 py-1 rounded-lg"><span class="text-gray-400 font-semibold cursor-pointer"><i class="fa-regular fa-thumbs-up"></i></span></div>
                  <div class="flex gap-1">
                    <div class="border-1 border-gray-400 px-3 py-1 rounded-lg cursor-pointer"><span class="text-green-500 font-semibold">Adopt</span></div>
                  <div id="${el.petId}" onclick="loadModal(${el.petId})" class="border-1 border-gray-400 px-3 py-1 rounded-lg cursor-pointer"><span class="text-green-500 font-semibold">Details</span></div>
                  </div>
                 </div>
              </div>
            </div>`;
    allPets.appendChild(div);
  });
};
const sortByPrice = () => {
  const sortedPets = [...allPet].sort((a, b) => b.price - a.price);
  showAllPets(sortedPets);
};

// PetByCategory
const loadPetByCategory = (categoryName) => {
  fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`
  )
    .then((res) => res.json())
    .then((data) => showPetByCategory(data.data));
};
const showPetByCategory = (data) => {
  allPets.innerHTML = "";

  if (data.length === 0) {
    allPets.innerHTML = `<div class="col-span-3 text-center bg-gray-200 p-15 rounded-l-md">
          <div class="flex justify-center">
            <img src="./images/error.webp" alt=""/>
          </div>
          <h1 class="text-2xl font-bold my-4">No Information Available</h1>
          <p class="text-gray-400">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at <br />
            its layout. The point of using Lorem Ipsum is that it has a.
          </p>
        </div>`;
  }
  data.forEach((el) => {
    allPets.innerHTML += `<div class="card bg-base-100 shadow-sm">
              <figure class="p-3">
                <img
                  src="${el.image}" class="h-50 w-full object-cover"
                />
              </figure>
              <div class="card-body">
                <h2 class="card-title">
                  ${el.pet_name}
                </h2>
                <p class="text-gray-500 my-1"><i class="fa-solid fa-table-cells-large"></i> Breed: ${el.breed}</p>
                <p class="text-gray-500 my-1"><i class="fa-regular fa-calendar"></i> ${el.date_of_birth}</p>
                <p class="text-gray-500 my-1"><i class="fa-solid fa-mercury"></i> Gender: ${el.gender}  </p>
                <p class="text-gray-500 mt-1"><i class="fa-solid fa-dollar-sign"></i> Price : ${el.price} </p>
                <div class="card-actions justify-between mt-3">
                  <div onclick="addToLiked('${el.image}')" class="border-1 border-gray-400 px-3 py-1 rounded-lg"><span class="text-gray-400 font-semibold cursor-pointer"><i class="fa-regular fa-thumbs-up"></i></span></div>
                  <div class="flex gap-1">
                    <div class="border-1 border-gray-400 px-3 py-1 rounded-lg cursor-pointer"><span class="text-green-500 font-semibold">Adopt</span></div>
                  <div id="${el.petId}" onclick="loadModal(${el.petId})" class="border-1 border-gray-400 px-3 py-1 rounded-lg cursor-pointer"><span class="text-green-500 font-semibold">Details</span></div>
                  </div>
                 </div>
              </div>
            </div>`;
  });
};
// Modal
const loadModal = (petId) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then((res) => res.json())
    .then((data) => showModal(data.petData));
};

const showModal = (data) => {
 const modalBox = document.getElementById("modal-box");
  modalBox.innerHTML = `
  <div class="bg-white p-5 rounded-lg max-w-md mx-auto">
    <img src="${data.image}" class="w-full h-auto mx-auto my-3 rounded-lg"/>
    
    <h3 class="text-lg font-bold text-center">${data.pet_name}</h3>
    
    <p class="py-1 text-gray-500"><i class="fa-solid fa-table-cells-large"></i> Breed: ${data.breed}</p>
    <p class="py-1 text-gray-500"><i class="fa-solid fa-venus"></i> Gender: ${data.gender}</p>
    <p class="py-1 text-gray-500"><i class="fa-solid fa-dollar-sign"></i> Price: ${data.price}</p>
    <p class="py-1 text-gray-500"><i class="fa-solid fa-syringe"></i> Vaccinate: ${data.vaccinated_status}</p>
    
    <hr class="my-2 border-gray-300">
    
    <h3 class="text-lg font-bold mt-2">Details Information</h3>
    <p class="text-gray-500">
      ${data.pet_details}
    </p>
    
   <div class="modal-action mt-4 w-full">
  <form method="dialog" class="w-full">
    <button class="btn w-full">Cancel</button>
  </form>
</div>

  </div>
  `;

  // Open the modal
  modalContainer.showModal();
};

// like pets
const likedPetsDiv = document.getElementById("liked-pets");

const addToLiked = (imgUrl) => {
  const img = document.createElement("img");
  img.src = imgUrl;
  img.className = "w-full h-24 object-cover rounded-md";
  likedPetsDiv.appendChild(img);
};

// function call
loadAllCategory();
loadAllPets();

