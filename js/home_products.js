let dataArray;
let local_cart_Count =
  localStorage.getItem("cartcount") ||
  localStorage.setItem(
    "cartcount",
    parseInt(document.getElementById("count_item_header_id").textContent)
  );

let cart_product =
  localStorage.getItem("cartproducts") ||
  localStorage.setItem("cartproducts", "empty");

let cart_header_cnt = document.getElementsByClassName("count_item_header");
console.log(cart_header_cnt.length);
for (var i = 0; i < cart_header_cnt.length; i++) {
  cart_header_cnt[i].textContent = local_cart_Count||0;
}

async function getProducts() {
    try {    
    const jsonproducts = await fetch("products.json");
    const prod_arr = await jsonproducts.json();
    // console.log( prod_arr)
    // const prod_section =document.getElementById("products_section_id")
    const prod_section = document.getElementById("product_wrapper");

    prod_arr.forEach((element) => {
      prod_section.innerHTML += `
        <div class="product_card">
            <span class="sale_percent">${
              element.old_price
                ? Math.floor(
                    ((element.old_price - element.price) / element.old_price) *
                      100
                  )
                : "0"
            }%</span>            
            <div class="product_card_img">
                <img src="img/product/${element.id}.png" alt="">
            </div>
            <div class="stars">
                <i class="fa-regular fa-star star"></i>
                <i class="fa-regular fa-star star"></i>
                <i class="fa-regular fa-star star"></i>
                <i class="fa-regular fa-star star"></i>
                <i class="fa-regular fa-star star"></i>
            </div>
            <p class="product_name">${element.name}</p>
            <div class="product_price">
                <p><span>$${element.price}</span></p>
                <p class="old_price">${
                  element.old_price ? element.old_price : ""
                }</p>
            </div>
            <div class="product_card_buttons" data-id="${
              element.id
            }" onclick="homeAddToCart(${element.id})">
                <span class="product_card_cart">
                    <i class="fa-solid fa-cart-shopping"></i>add to cart
                </span>
                <span class="product_card_like">
                    <i class="fa-regular fa-heart"></i>
                </span>
            </div>
        </div>
        
        `;
    });
    prod_section.innerHTML += prod_section.innerHTML;    
     dataArray = prod_arr;
      return  prod_arr;
  } catch (error) {
    console.log("error");
  }
}
function homeAddToCart(i) {  
  const cartheadercount = document.getElementById("count_item_header_id");
  local_cart_Count = parseInt(local_cart_Count) + 1;
  localStorage.setItem("cartcount", local_cart_Count);
  console.log(local_cart_Count);
  cartheadercount.innerText = localStorage.getItem("cartcount");

  cart_product === "empty"
    ? (cart_product = i)
    : (cart_product = cart_product + "," + i);
  console.log(cart_product);
  localStorage.setItem("cartproducts", cart_product);

}
async function getAllStoreProducts() {
  try {    
  const jsonproducts = await fetch("products.json");
  const prod_arr = await jsonproducts.json();
  // console.log( prod_arr)
  // const prod_section =document.getElementById("products_section_id")
  const prod_section = document.getElementById("all_store_products");
  prod_section.innerHTML ='';
  prod_arr.forEach((element) => {
    prod_section.innerHTML += `
      <div class="product_card">
          <span class="sale_percent">${
            element.old_price
              ? Math.floor(
                  ((element.old_price - element.price) / element.old_price) *
                    100
                )
              : "0"
          }%</span>            
          <div class="product_card_img">
              <img src="img/product/${element.id}.png" alt="">
          </div>
          <div class="stars">
              <i class="fa-regular fa-star star"></i>
              <i class="fa-regular fa-star star"></i>
              <i class="fa-regular fa-star star"></i>
              <i class="fa-regular fa-star star"></i>
              <i class="fa-regular fa-star star"></i>
          </div>
          <p class="product_name">${element.name}</p>
          <div class="product_price">
              <p><span>$${element.price}</span></p>
              <p class="old_price">${
                element.old_price ? element.old_price : ""
              }</p>
          </div>
          <div class="product_card_buttons" data-id="${
            element.id
          }" onclick="homeAddToCart(${element.id})">
              <span class="product_card_cart">
                  <i class="fa-solid fa-cart-shopping"></i>add to cart
              </span>
              <span class="product_card_like">
                  <i class="fa-regular fa-heart"></i>
              </span>
          </div>
      </div>
      
      `;
  });
  // prod_section.innerHTML += prod_section.innerHTML;    
   dataArray = prod_arr;
    return  prod_arr;
} catch (error) {
  console.log("error");
}
}
getAllStoreProducts()

let cat_cards = document.querySelectorAll(".cat_card");
console.log(cat_cards.length);
cat_cards.forEach((card) => {
  card.addEventListener("click", function () {
    getCatProducts(card);
  });
});

const categorySelect = document.getElementById('category');
categorySelect.addEventListener('change', function() { 
  const selectedValue = this.value; 
  // prod_section.scrollIntoView({ behavior: "smooth", block: "start" });   
  selectedValue==='All Categories'?getProducts():getCatProducts(selectedValue);
  
});

async function getCatProducts(catcard) {
   let catpar
  if (typeof(catcard) == 'string') {
    catpar = catcard;    
  }
  else{catpar = catcard.querySelector("h2").innerText }

  // let catpar = catcard.querySelector("h2").innerText

  try {
    const jsonproducts = await fetch("products.json");
    const prod_arrin = await jsonproducts.json();
    // console.log( prod_arr)
    // const prod_section =document.getElementById("products_section_id")
    console.log(catpar);
    const prod_section = document.getElementById("product_wrapper");
    prod_section.innerHTML = "";
    const prod_arr = prod_arrin.filter((item) => item.category === catpar);
    console.log(prod_arr);

    prod_arr.forEach((element) => {
      prod_section.innerHTML += `
            <div class="product_card">
                <span class="sale_percent">${
                  element.old_price
                    ? Math.floor(
                        ((element.old_price - element.price) /
                          element.old_price) *
                          100
                      )
                    : "0"
                }%</span>            
                <div class="product_card_img">
                    <img src="img/product/${element.id}.png" alt="">
                </div>
                <div class="stars">
                    <i class="fa-regular fa-star star"></i>
                    <i class="fa-regular fa-star star"></i>
                    <i class="fa-regular fa-star star"></i>
                    <i class="fa-regular fa-star star"></i>
                    <i class="fa-regular fa-star star"></i>
                </div>
                <p class="product_name">${element.name}</p>
                <div class="product_price">
                    <p><span>$${element.price}</span></p>
                    <p class="old_price">${
                      element.old_price ? element.old_price : ""
                    }</p>
                </div>
                <div class="product_card_buttons" data-id="${
                  element.id
                }" onclick="homeAddToCart(${element.id})">
                    <span class="product_card_cart">
                        <i class="fa-solid fa-cart-shopping"></i>add to cart
                    </span>
                    <span class="product_card_like">
                        <i class="fa-regular fa-heart"></i>
                    </span>
                </div>
            </div>
            
            `;
    });
    prod_section.innerHTML += prod_section.innerHTML;
    prod_section.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    console.log(error);
  }
}

window.onload = async()=> {await getProducts();
  console.log(dataArray)
  
}


