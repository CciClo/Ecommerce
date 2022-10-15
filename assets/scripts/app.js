const productCart = document.querySelector('.product-cart');
const cart = document.querySelector(".cart");
const menu = document.querySelector(".menu");
const menuMovil = document.querySelector(".menu-movil");
let cartArray = JSON.parse(localStorage.getItem("carts")) ?? [];
createCart();

menuMovil.addEventListener("click", (e) => {
  if (menu.classList.contains("hide-media")) {
    menu.classList.remove("hide-media");
  }else {
    menu.classList.add("hide-media");
  }
})

cart.addEventListener("click", (e) => {
  if (productCart.classList.contains("hide")) {
    productCart.classList.remove("hide");
    e.target.classList.add("displacement-cart");
  }else {
    productCart.classList.add("hide");
    e.target.classList.remove("displacement-cart");
  }
})

addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-mas")){
    let imageProduct = e.target.parentElement.firstElementChild.outerHTML;
    const nameProduct = e.target.parentElement.childNodes[3].textContent;
    const stock = e.target.parentElement.childNodes[5].textContent;
    const priceProduct = e.target.parentElement.childNodes[7].textContent.split(" ");
    let amountCart = 1;
    checkCart(imageProduct,nameProduct,priceProduct,amountCart,stock);
  }
  if (e.target.classList.contains("btn-sum1")){
    sum1(e.target.getAttribute("id"));
  }else if (e.target.classList.contains("btn-rest1")){
    rest1(e.target.getAttribute("id"));
  }else if (e.target.classList.contains("btn-trash")){
    trash1(e.target.getAttribute("id"));
  }
  createCart();
  localStorage.setItem("carts", JSON.stringify(cartArray));
})


function createCart() {
  const elements = cartArray.map((cart2) => {
    const boolean = cart2.priceProduct.length > 1;
    let price1;
    let price2;
    if (boolean){
      price1 = cart2.priceProduct[1];
      price2 = Number(cart2.priceProduct[1].replace("$",""))*cart2.amountCart;
    }else {
      price1 = cart2.priceProduct[0];
      price2 = Number(cart2.priceProduct[0].replace("$",""))*cart2.amountCart;
    }
    return  `
    <div class="product-in-cart">
      ${cart2.imageProduct}
      <div class="cart-title">
        <h3>${cart2.nameProduct}</h3>
        ${boolean ? `<p><span>${price1}</span>$${price2}</p>` : `<p><span>${price1}</span>$${price2}</p>`}
        <div>
          <img id="${cart2.nameProduct}" class="btn-rest1" src="./assets/icons/minus-small.svg">
          <p>${cart2.amountCart}</p>
          <img id="${cart2.nameProduct}" class="btn-sum1" src="./assets/icons/plus-small.svg">
          <img id="${cart2.nameProduct}" class="btn-trash" src="./assets/icons/trash.svg">
        </div>
      </div>
    </div>
    ` 
  })
  productCart.innerHTML = elements;
}

function checkCart (imageProduct,nameProduct,priceProduct,amountCart,f) {
  let index = cartArray.findIndex((cart1) => cart1.nameProduct == nameProduct)
  if (index === -1) {
    cartArray.push({imageProduct,nameProduct,priceProduct,amountCart,stock:Number(f.replace("Stock:", ""))});
  } else if (index !== -1 && cartArray[index].amountCart < cartArray[index].stock) {
    cartArray[index].amountCart++;
  }
  /*
  let boolean = true;
  if(cartArray.length > 0) {
    for (let i of cartArray) {
      if (i.nameProduct === b && i.amountCart < i.stock ) {
        i.amountCart++;
      }
      if (i.nameProduct === b){
        boolean = false;
      }
    }
  }
  if (boolean) {
    cartArray.push({imageProduct:a,nameProduct:b,priceProduct:c,amountCart:e,stock:Number(f.replace("Stock:", ""))});
  }
  */
}


function sum1(e) {
  const sum = cartArray.findIndex((cart1)=> cart1.nameProduct === e);
  if (cartArray[sum].amountCart < cartArray[sum].stock){
    cartArray[sum].amountCart++;
  }
}

function rest1(e) {
  const rest = cartArray.findIndex((cart1)=> cart1.nameProduct === e);
  if (cartArray[rest].amountCart > 1) {
    cartArray[rest].amountCart--;
  }
}

function trash1 (e) {
  const newArray = cartArray.filter((cart1)=> cart1.nameProduct !== e);
  cartArray = [...newArray];
}