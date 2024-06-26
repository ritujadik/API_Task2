const searchElem = document.getElementById("Search");
const buttonElem = document.getElementById("new_button");
const outputElem = document.getElementById("output");
const productlistElem = document.getElementById("product-list")

let new_data = []
let filterdata = []
fetch("https://dummyjson.com/products") 
.then((response) => response.json())
.then((data) =>{
    new_data = data.products;
    filterdata = data.products;
    renderListUI();    
})
.catch (error =>{
    console.error(error)
});
function renderListUI() {
    console.log(filterdata);
    const productfragment = document.createDocumentFragment();
    for(let i=0;i<filterdata.length;i++) {
        const product = filterdata[i];
        const review = product.reviews.length > 0 ? `Rating: ${product.reviews[0].rating}` : "No review";
        //const review = product.reviews.length > 0 ?'rating: ${product.reviews[0].rating}' :"No review";

     
        const {title,price,thumbnail,description} = product;
        console.log({ title, price, thumbnail,description,review});

        
        const liElem = document.createElement("ul")
        liElem.className="card";

        const imageElem = document.createElement("img");
        const titleElem = document.createElement("h4");
        const priceElem = document.createElement("p");
        const descriptionElem = document.createElement("p");
        const reviewElem = document.createElement("p");

        imageElem.src = thumbnail;
        imageElem.height= 100;
        imageElem.width=100;
        
        titleElem.innerText = `Product:${title}`;
        descriptionElem.innerText = `Description:${description}`;
        priceElem.innerText = `Price:${price}`;
        reviewElem.innerText = review;
        
       
        liElem.appendChild(imageElem);
        liElem.appendChild(titleElem);
        liElem.appendChild(descriptionElem);
        liElem.appendChild(priceElem);
        liElem.appendChild(reviewElem);
        productfragment.appendChild(liElem);
        
    }
    outputElem.innerHTML = "";
    outputElem.appendChild(productfragment);
}

function livesearch(){
    let input = searchElem.value.trim().toLowerCase();
    let new_filterdata = new_data.filter(product=>
        product.title.toLowerCase().includes(input) ||
        product.description.toLowerCase().includes(input) 
    );
    displaydata(new_filterdata,input);
}
function performsearch(){
   livesearch();
}
function displaydata(new_data,searchitem){
    let html ="";
    new_data.forEach(item => {
        let title = item.title.replace(new RegExp(searchitem,'gi'),match => `<span class="highlight">${match}</span>`);
        let description = item.description.replace(new RegExp(searchitem,'gi'),match => `<span class="highlight">${match}</span>`);
        let image = item.thumbnail;
        let price = item.price;
        let Rating = item.rating;
        
        html += `<div>
          <img src="${image}" alt="Product Image" height="100" width="100" />
          <p>Title:${title} </p>
          <p>Description:${description} </p>
          <p>Price:${price} </p>
          <p>Rating:${Rating} </p>
          </div>`;
    });
    outputElem.innerHTML =html;
    
}    
searchElem.addEventListener('input', livesearch);
buttonElem.addEventListener('button', performsearch);