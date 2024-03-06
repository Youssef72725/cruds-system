let title =document.getElementById('title')
let price =document.getElementById('price')
let taxes =document.getElementById('taxes')
let ads =document.getElementById('ads')
let discount =document.getElementById('discount')
let total =document.getElementById('total')
let count =document.getElementById('count')
let category =document.getElementById('category')
let create =document.getElementById('create')

let mood ="create";

let t;

// -------------------------------get total
function gettotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value)
        - +discount.value ;
        total.innerHTML=result;
    }
    else{
        total.innerHTML='';
    }
    
}


//--------------------------------- create product

// create object include all data whene click button (create) and use array to save all objects into array 
// JSON.stringify convert Array to string becase localStorage story only string
// JSON.parse convert Array to string becase localStorage story only string

let datapro =[];

// let datapro;

if(localStorage.product !=null){
    datapro=JSON.parse(localStorage.product)
}
else{
    let databro=[];
}

create.onclick = function() {

    let newpro={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        count:count.value,
        category:category.value, 
        total:total.innerHTML,

    }
// --------------count
// to create many prodact
if(title.value!=""
&&price.value!=""
&&taxes.value!=""
&&ads.value!=""
&&discount.value!=""
&&category.value!=""){

    if (mood === 'create') {
        if (newpro.count > 1) {
            for(let i=0;i<newpro.count;i++){
                datapro.push(newpro);
            }
        }
        else{
            datapro.push(newpro);
    
           
        }
        
    }
    else{
        datapro[t] = newpro;
    // to return create after  update
        mood='create';
        create.innerHTML='create';
        count.style.display='block';
        
    }
// call clear function in function create 
cleardata()
}

 

    localStorage.setItem('product', JSON.stringify(datapro))
    console.log(datapro);



    
    showdata()

}

//---------------------------------- clear inputs

function cleardata(){
    title.value= '';
    price.value= '';
    taxes.value= '';
    ads.value= '';
    discount.value= '';
    category.value= '';
    count.value= '';
    total.innerHTML='';

}

// ----------------------------------------read
function showdata(){
    
    let table= '';

    for(let i=0;i<datapro.length;i++) {
            table+=`
            <tr>
                <td>${i+1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updatedata( ${i})" id="update">update</button></td>
                <td><button onclick="deletedata( ${i})" id="delete">delete</button></td>

            </tr>
            `;
            
    }
    
   let tbody= document.getElementById('tbody')
    tbody.innerHTML  = table;

        
}
showdata()


//---------------------------------- delete
// splice(begin,num) use to delete from array 
function deletedata(i){
    datapro.splice(i,1);
    
    localStorage.product=JSON.stringify(datapro)
    // We use a function showdata to display the data after delete without restart the page
    showdata();
} 

// -----------------------------------deleteAll

function  deleteall(){
    datapro.splice(0);
    localStorage.clear();
    // We use a function showdata to display the data after delete without restart the page
    showdata();
}

// ---------------------------------update
function updatedata(i){
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    category.value=datapro[i].category;
    gettotal()


    count.style.display='none'
    create.innerHTML='update'
    
    mood='update'

    t=i;
 
}

// -------------------------------search
let searchmood='title';

function search(id){
    if(id=='searchtitel'){
        searchmood='title'
    }
    else{ 
        searchmood='category'
    }
}

function searchdata(value) {
    let table= '';
    
    if (searchmood=='title') {
        
        for(let i=0;i<datapro.length;i++){
            if(datapro[i].title.includes(value)){
                table+=`
                <tr>
                    <td>${i+1}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="updatedata( ${i})" id="update">update</button></td>
                    <td><button onclick="deletedata( ${i})" id="delete">delete</button></td>
    
                </tr>
                `;
            }
     }
    }
    else{
        for(let i=0;i<datapro.length;i++){
            if(datapro[i].category.includes(value)){
                table+=`
                <tr>
                    <td>${i+1}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="updatedata( ${i})" id="update">update</button></td>
                    <td><button onclick="deletedata( ${i})" id="delete">delete</button></td>
    
                </tr>
                `;
            }

    }
    

}
document.getElementById('tbody').innerHTML  = table;
}



// ---------------------------------------------------cleandata

