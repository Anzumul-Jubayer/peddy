const categoryDiv=document.getElementById('category-div')
const allPets=document.getElementById('all-pets')

// category
const loadCategory=(()=>{
    const url='https://openapi.programming-hero.com/api/peddy/categories'
    fetch(url)
   .then((res)=>res.json())
   .then((data)=>showCategory(data.categories))
})
const showCategory=((data)=>{
    categoryDiv.innerHTML=""
    data.forEach(el => {
        const div=document.createElement('div')
       div.innerHTML=` <div
            class="flex items-center gap-3 border-1 border-gray-300 px-14 py-5 rounded-xl hover:bg-[#0e7a811a] cursor-pointer" 
          >
            <img src="${el.category_icon}" alt="" />
            <h1 class="font-bold text-2xl">${el.category}</h1>
          </div>`
          categoryDiv.appendChild(div)
    });
   
})
// all pets
const loadAllPets=(()=>{
    fetch('https://openapi.programming-hero.com/api/peddy/pets').then((res)=>res.json()).then((data)=>showAllPets(data.pets))
})
const showAllPets=((data)=>{
  allPets.innerHTML=""
  data.forEach(el => {
    const div=document.createElement('div')
    div.innerHTML=`<div class="card bg-base-100 shadow-sm">
              <figure class="p-3">
                <img
                  src="${el.image}"
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
                  <div class="border-1 border-gray-400 px-3 py-1 rounded-lg"><span class="text-gray-400 font-semibold cursor-pointer"><i class="fa-regular fa-thumbs-up"></i></span></div>
                  <div class="flex gap-1">
                    <div class="border-1 border-gray-400 px-3 py-1 rounded-lg cursor-pointer"><span class="text-green-500 font-semibold">Adopt</span></div>
                  <div class="border-1 border-gray-400 px-3 py-1 rounded-lg cursor-pointer"><span class="text-green-500 font-semibold">Details</span></div>
                  </div>
                 </div>
              </div>
            </div>`
            allPets.appendChild(div)
  });

})
// function call
loadCategory()
loadAllPets()

 