const searchElem = document.getElementById("Search");
const buttonElem = document.getElementById("new_button");
const outputElem = document.getElementById("output");
new_data = []
filterdata = []
fetch("https://dummyjson.com/products") 
.then((data) => data.json())
.then((data) =>{
    new_data = JSON.stringify(data,null,2);
    filterdata = new_data;
    outputElem.textContent = new_data;
    
    /*renderListUI();*/
    
})
.catch (error =>{
    console.error(error)
});

function renderListUI() {
    console.log(filterdata);
    const productfragment = document.createDocumentFragment();
    for(let i=0;i<filterdata.length;i++) {
        const product = filterdata[i];


        const { title,price,image } = product;
        console.log({ title, price, image});

        const liElem = document.getElementById("li")
        liElem.className="card";

        const imageElem = document.createElement("img");
        const priceElem = document.createElement("p");
        const titleElem = document.createElement("p");

        imageElem.src = image;
        imageElem.height= 50;
        imageElem.width=50;
        
        priceElem.innerText = price;
        titleElem.innerText = title;

        liElem.appendChild(imageElem);
        liElem.appendChild(priceElem);
        liElem.appendChild(titleElem);

        productfragment.appendChild(liElem);
    }
    outputElem.innerHTML = "";
    outputElem.appendChild(productfragment);
}

searchElem.addEventListener("input",livesearch()) {
    const new_searchElem =
}

