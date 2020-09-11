var currentProductsArray = [];
var currentCommentsArray = [];
var relatedProductsArray = [];
var product = {};
let addComment = "";
let valorStars = "";

$("input[name='rate']" ).on('change', function () {
    valorStars = $(this).val();
});

function showImages(array) {
	let htmlContentToAppend = "";

	for (let i = 0; i < array.length; i++) {
		let imageSrc = array[i];

		htmlContentToAppend +=
        `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div> `;

		document.getElementById("productImages").innerHTML = htmlContentToAppend;
	}
}

function showComments(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let comment = array[i];
        let stars = "";

		for (let i=0; i<comment.score; i++){
			stars += `
				<span class="fa fa-star checked"></span>
			`;
		}
		for (let i=comment.score; i<5; i++){
			stars += `
				<span class="fa fa-star"></span>
			`;
		}   

            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                    <i class="fas fa-user"></i><strong>`+ " " + comment.user +`</strong>
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">`+ stars +`</h5>
                            <small class="text-muted">` + comment.dateTime + ` </small>
                        </div>
                        <p class="mb-1">` + comment.description + `</p>
                    </div>
                </div>
            </div>
            `
        document.getElementById("comments-Container").innerHTML = htmlContentToAppend;
    }
}

function showRelatedProducts(array){

    let htmlContentToAppend = "";
        let relatedProduct = array[1];  
        let relatedProduct2 = array[3]; 

            htmlContentToAppend += `
            <div style="display:flex; margin-bottom: 1rem;">
            <div style="width: 250px; margin-right: 0.5rem">
                ` + relatedProduct.name + `<br> <img class="img-fluid img-thumbnail" width="100%" src="` + relatedProduct.imgSrc + `" alt=""></img>
            </div>
            <div style="width: 250px">
                ` + relatedProduct2.name + `<br> <img class="img-fluid img-thumbnail" width="100%" src="` + relatedProduct2.imgSrc + `" alt=""></img>
            </div>
            </div>
            `
        document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {product = resultObj.data;
            document.getElementById("productName").innerHTML = product.name;
            document.getElementById("productDesc").innerHTML = product.description;
            document.getElementById("productCost").innerHTML = product.currency + " " + product.cost;
            document.getElementById("productSoldCount").innerHTML = product.soldCount;
            document.getElementById("productCategory").innerHTML = product.category;
            showImages(product.images);
        }
    });
});

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            currentCommentsArray = resultObj.data;
            showComments(currentCommentsArray);
        }
    });
});

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            relatedProductsArray = resultObj.data;
            showRelatedProducts(relatedProductsArray);
        }
    });
});

var fecha = new Date(),
segundos = fecha.getSeconds(),
horas = fecha.getHours(),
minutos = fecha.getMinutes(),
día = fecha.getDate(),
mes = fecha.getMonth() +1, /*Porque esta función empieza desde 0, y de otra forma devuelve el mes anterior*/
year = fecha.getFullYear().toString();

if (horas < 10){horas = '0' + horas;}
if (mes < 10){mes = '0' + mes;}
if (día < 10){día = '0' + día;}
if (minutos < 10){ minutos = "0" + minutos; }
if (segundos < 10){ segundos = "0" + segundos; }

var userEmail = sessionStorage.getItem("usuario");
var userName = userEmail.split('@')[0];
var newComment = document.getElementById('userComment');


let estrellas = "";
for (let i = 0; i < 5; i++) {

    if(i <= valorStars-1){
        estrellas += ` 
        <span class="fa fa-star checked"></span> 
        `;
    }else{
        estrellas += ` 
        <span class="fa fa-star"></span> 
        `;
    }
}

function publicar(){
    
        addComment += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <i class="fas fa-user"></i> <strong>${userName}</strong>
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">${estrellas}</h5>
                        <small class="text-muted">${year+"-"+mes+"-"+día+" "+horas+":"+minutos+":"+segundos}</small>
                    </div>
                    <p class="mb-1">${newComment.value}</p>
                </div>
            </div>
        </div>
        `
            document.getElementById("newComments").innerHTML = addComment;

            
}
