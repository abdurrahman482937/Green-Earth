// Globals variable and functions
const catagoryButtons = document.getElementsByClassName("removeCatarogyDesign");

const removeBgOfCatagory = () => {
  for (const catagorybutton of catagoryButtons) {
    catagorybutton.classList.remove("CatagoryButtonD");
  }
};

const catagoryLoad = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/categories"
  );
  const data = await res.json();
  displayCatagory(data.categories);
  // console.log(data.);
};

// All Catagory plants here

// spinbar here
const spinbar = (situation) => {
  if (situation == true) {
    document.getElementById("spinbar").classList.remove("hidden");
    document.getElementById("Product-container").classList.add("hidden");
  } else {
    document.getElementById("spinbar").classList.add("hidden");
    document.getElementById("Product-container").classList.remove("hidden");
  }
};

const allplantsLoad = () => {
  spinbar(true);
  const url = "https://openapi.programming-hero.com/api/plants";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayProducts(data.plants);
    });
  //   spinbar(false);
  // console.log(data.plants);
};
// all tree button here
const alltreeBtn = document.getElementById("allTreeBtn");
alltreeBtn.addEventListener("click", () => {
  removeBgOfCatagory();
  alltreeBtn.classList.add("CatagoryButtonD");

  allplantsLoad();
});
allplantsLoad();

// Catagory Display here
const displayCatagory = (datas) => {
  // console.log(data);
  const catagoryContainer = document.getElementById("CatagoryLeft");
  datas.forEach((data) => {
    catagoryContainer.innerHTML += `
        <button  onclick="loadProducts(${data.id})" id="${data.id}"  class=" bg-[#DCFCE7] border-none font-medium py-2 my-2 text-[#1F2937] cursor-default w-full text-left hover:bg-[#15803D] px-2 rounded-md removeCatarogyDesign ">
     ${data.category_name}
    </button>
        `;
  });
};

// products load here
const loadProducts = async (id) => {
  spinbar(true);

  removeBgOfCatagory();
  productUrl = `https://openapi.programming-hero.com/api/category/${id}`;
  const res = await fetch(productUrl);
  const data = await res.json();
  //   console.log(data);
  displayProducts(data.plants);
  //   modalFunc(data.plants)

  document.getElementById(id).classList.add("CatagoryButtonD");
};

// products display here
const displayProducts = (products) => {
  const productContainer = document.getElementById("Product-container");

  productContainer.innerHTML = "";
  products.forEach((product) => {
    // console.log(product)
    const newProduct = document.createElement("div");
    newProduct.innerHTML = `
    <div class="rounded-lg bg-white p-4  ">
            <img class="h-48 w-full object-cover rounded-lg" src="${product.image}" alt="" />
            <h3 onclick="modalFunc(${product.id})" class="font-semibold text-sm text-[#1F2937] cursor-pointer mt-3">
              ${product.name}
            </h3>
            <p class="text-[12px] text-[#71717A] my-2  line-clamp-2">
              ${product.description}
            </p>
            <div class="flex justify-between items-center">
              <h3 class="bg-[#DCFCE7] px-3 py-1 rounded-full text-[#15803D]">
                ${product.category}
              </h3>
              <h3 class="text-[#1F2937]">৳ <span>${product.price}</span></h3>
            </div>
            <button onclick="CartFunc(${product.id})"
              class="bg-[#15803D] text-white font-medium text-[16px] w-full rounded-full mt-3 py-3"
            >
              Add to Cart
            </button>
          </div>
    `;
    productContainer.appendChild(newProduct);
  });
  spinbar(false);
};

const modalFunc = (id) => {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res) => res.json())
    .then((data) => {
      displayModal(data.plants);
    });
};

const displayModal = (data) => {
  // const modalDetails = document.getElementById("modalDetails");
  const modalDetails = document.getElementById("my_modal_5");
  modalDetails.innerHTML = " ";
  const newModalDetails = document.createElement("div");
  newModalDetails.innerHTML = `
  <div class="modal-box">
<div class="rounded-lg bg-white p-2  ">
            <img class="w-full object-cover rounded-lg" src="${data.image}" alt="" />
            <h3  class="font-semibold text-sm text-[#1F2937] mt-3">
              ${data.name}
            </h3>
            <p class="text-[16px] text-[#1d1d1f] my-3 ">
              ${data.description}
            </p>
            <div class="flex justify-between items-center">
              <h3 class="bg-[#e7f8ed] px-3 py-2 rounded-full text-[#15803D]">
                ${data.category}
              </h3>
              <h3 class="text-[#1F2937]">৳ <span>${data.price}</span></h3>
            </div>
           
           
          </div>
          <div class="modal-action">
                <form method="dialog">
                  <!-- if there is a button in form, it will close the modal -->
                  <button class="btn">Close</button>
                </form>
              </div>
              </div>


`;
  modalDetails.appendChild(newModalDetails);

  document.getElementById("my_modal_5").showModal(data);
};

// Cart Funcload
const CartFunc = (id) => {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res) => res.json())
    .then((data) => {
      Storecart(data.plants);
    });
};

const Storecart = (data) => {
  const cartContainer = document.getElementById("carContainer");
  const newCartItem = document.createElement("div");
  newCartItem.id = `cartItems${data.id}`;
  newCartItem.innerHTML = `
    <div id="Cart${data.id}" class="cartItem flex justify-between items-center bg-[#F0FDF4] rounded-lg space-y-1 mb-2 py-2">
             <div>
                <h3 class="text-[#1F2937] text-sm font-semibold ">৳ <span>${data.name}</span></h3>
             <h3  class="text-[#8C8C8C]">৳ <span >${data.price}</span> × 1 </h3>
             </div>
             <button onclick="delAmount(${data.id},${data.price})"><i class="fa-solid fa-xmark text-3xl"></i></button>
         </div> 
    
    `;
  cartContainer.appendChild(newCartItem);

  const totalAmountElement = document.getElementById("totalAmount");
  let totalAmount = parseInt(totalAmountElement.innerText);
  totalAmount += parseInt(data.price);
  totalAmountElement.innerText = totalAmount;

  // removeAfterAmount=(`${data.price}`)
};

const delAmount = (id, price) => {
  console.log(id);

  const CartItem = document.getElementById(`cartItems${id}`);
  console.log(CartItem);
  //  CartItem.innerHTML=""
  //  console.log(CartItem)
  const remCartItem = document.getElementById(`Cart${id}`);
  CartItem.removeChild(remCartItem);

  const totalAmountElement = document.getElementById("totalAmount");
  let totalAmount = parseInt(totalAmountElement.innerText);
  totalAmount -= parseInt(price);
  totalAmountElement.innerText = totalAmount;

};

catagoryLoad();
