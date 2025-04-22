let index = 0;
const slides = document.querySelector(".slides");
const banners = document.querySelector("#showbanners");
const totalSlides = document.querySelectorAll(".slide").length;
let nn = 1;
setInterval(() => {
  // index = (index + 1) % totalSlides;
  // slides.style.transform = `translateX(${-index * 100}%)`;
   nn===7? nn=1 : null   
   banners.src=`img/banner_home${nn}.png`
   nn++
}, 3000);
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

prevButton.addEventListener("click", () => {
  // index = (index - 1 + totalSlides) % totalSlides;
  // slides.style.transform = `translateX(${-index * 100}%)`;
  --nn===0? nn=6 : null
  console.log(nn)
  banners.src=`img/banner_home${nn}.png`
  //  nn--
});

nextButton.addEventListener("click", () => {
  // index = (index + 1) % totalSlides;
  // slides.style.transform = `translateX(${-index * 100}%)`;
  
  ++nn===7? nn=1 : null
  console.log(nn)
  banners.src=`img/banner_home${nn}.png`
  //  nn++
});




document.getElementById("go_up").addEventListener("click", function() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  // window.location = "#";
});
function slideBtn(dir){  
  const wrap=document.querySelector('#product_wrapper')
  const amount = dir ==='Next'? '-50%' : '50%'  
  console.log(wrap);
  wrap.style.transform=`translateX(calc(${amount -20}px))`
// slides.style.transform = `translateX(${-index * 100}%)`;
  
}
