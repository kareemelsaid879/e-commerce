let cart_header_cnt= document.getElementsByClassName("count_item_header")
let cart_title = document.querySelector("#cart_area_title_id span")
let summary_count=document.getElementById("count")
let summary_price=document.getElementById("price_sum")
let summary_shipp=document.getElementById("cart_ship_sum")
let summary_price_vat=document.getElementById("cart_price_sum")


async function addProductToCart(){
    try{
        const jsonproducts=await fetch('products.json')
        const prod_arr = await jsonproducts.json()  
        for (var i=0 ; i<cart_header_cnt.length ;i++){
            cart_header_cnt[i].textContent=localStorage.getItem('cartcount')
        }
        const prod_section =document.getElementById("cart_prod_area_id")
        prod_section.innerHTML=''
        let summary_price_counter =0
        let summary_shipp_counter=0 
        summary_price.innerText='$'+summary_price_counter
        summary_shipp.innerText='$'+summary_shipp_counter
        let total= summary_price_counter + summary_shipp_counter
        summary_price_vat.innerText='$'+ total
        const cartarrd =  localStorage.getItem('cartproducts').split(',')
        const cartarr = [...new Set(cartarrd)];
        prod_section.innerHTML+=`
        <h2 class="cart_area_title" id="cart_area_title_id">Cart <span>(${cartarr[0]==='empty'?'0':cartarr.length} Item)</span></h2>`

        cartarr.forEach(element => 
            {  
                const cart_product =prod_arr.find(item => item.id ===Number(element))     
                // console.log(cart_product)
            prod_section.innerHTML+=`
            <div class="cart_product">
                    <div>
                        <img src="./img/product/${cart_product.id}.png" class="cart_prod_img">
                    </div>                
                    <div class="cart_prod_details">
                        <div class="cart_product_info">
                            <p class="cart_prod_name">${cart_product.name}</p>
                            <div class="price_part">
                                <p class="cart_prod_price"><span>$</span>${cart_product.price}</p>
                                <p class="cart_product_old_price">${cart_product.old_price?cart_product.old_price:""}<span>${cart_product.old_price?Math.floor((cart_product.old_price-cart_product.price)/cart_product.old_price*100):'0'}%OFF</span></p>
                            </div>
                        </div>

                        <div class="cart_product_btns">
                            <span class="cart_product_remove"  onclick="removeProduct(${cart_product.id})"><i class="fa-regular fa-trash-can"></i>Remove</span>
                            <div class="cart_prod_qty" data-id="${cart_product.id}">
                                <p id="decrease_${cart_product.id}" class="cart_prod_qty_btn" onclick="cartProdControl(${cart_product.id},'-')"><span>-</span></p>
                                <input type="text" aria-label="x" name="qty" class="qty" id="qty_${cart_product.id}" value="1" required>
                                <p id="increase_${cart_product.id}" class="cart_prod_qty_btn"  onclick="cartProdControl(${cart_product.id},'+')"><span>+</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            
            `;
            summary_price_counter += parseInt(cart_product.price )||0
            summary_shipp_counter += parseInt(cart_product.shipp )||0
            
            });
            summary_price.innerText='$'+summary_price_counter
            summary_shipp.innerText='$'+summary_shipp_counter
            total= summary_price_counter + summary_shipp_counter
            summary_price_vat.innerText='$'+ total
            cartSummary()
}catch(error)
{
            console.log( error) 
        } 
 }
 addProductToCart();
 
 function cartProdControl(prod_id , act){
   let prod_qty = document.getElementById("qty_"+prod_id)
   let proqtyval= parseInt(prod_qty.value) 
   if(act==="-" && proqtyval>1)
        {prod_qty.value= proqtyval-1}  
   else if(act==="+")
        {prod_qty.value= proqtyval+1}
 }

 function cartSummary(){
    
    cart_title.textContent='('+ localStorage.getItem('cartcount') +'Items )'
    summary_count.innerText='Subtotal ('+ localStorage.getItem('cartcount')+' Items)'
    

}

function removeProduct(id){   

    let remove_it=localStorage.setItem('cartproducts', localStorage.getItem('cartproducts').split(',').filter(v => v != id).join(','));
    localStorage.getItem('cartproducts').length==0?localStorage.setItem('cartproducts','empty') :null
    localStorage.setItem('cartcount',parseInt(localStorage.getItem('cartcount'))-1)
    
    addProductToCart()
}
function goPay(){
    localStorage.setItem('total_pay',summary_price_vat.innerText)
    window.open("pay.html","_self")
  }