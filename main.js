import { renderCategories } from "./src/services/categories";
import { setInLocalStorage } from "./src/persistence/localstorage";
import { handleGetProductsToStore, handleRenderList } from "./src/view/store";
import "./style.css";
import { handleSearchProductsByName } from "./src/services/searchBar";


// Aplicación
export let categoriaActiva = null;

export const setCategoriaActiva = (categoriaIn) => {
    categoriaActiva = categoriaIn;
};

export let productoActivo = null;

export const setProductoActivo = (productoIn) => {
    productoActivo = productoIn;
};



handleGetProductsToStore();
renderCategories();

/* Productos */
const buttonAdd = document.getElementById("buttonAddElement");

buttonAdd.addEventListener("click", () => {
    openModal();
});

/*===POPUP==*/
const cancelButton = document.getElementById("cancelButton");

cancelButton.addEventListener('click', () => {
    handleCancelButton();
});

const handleCancelButton = () => {
    closeModal();
};

/* Abrir y cerrar popup */
export const openModal = () => {
    const modal = document.getElementById("modalPopUP");
    modal.style.display = "flex";
    if (productoActivo){
        buttonDelete.style.display= "block";
    } else{
        buttonDelete.style.display= "none";
    }

    if(productoActivo){
        const nombre = document.getElementById("name"),
          imagen = document.getElementById("img"),
          precio = document.getElementById("precio"),
          categories = document.getElementById("categoria");
          imagen.value=productoActivo.imagen;
          categories.value=productoActivo.categories;
          precio.value=productoActivo.precio;
          nombre.value=productoActivo.nombre;
    }
};

export const closeModal = () => {
    const modal = document.getElementById("modalPopUP");
    modal.style.display = "none";
    setProductoActivo(null);
    resetModal();
};

const resetModal =()=>{
    const nombre = document.getElementById("name"),
          imagen = document.getElementById("img"),
          precio = document.getElementById("precio"),
          categories = document.getElementById("categoria");
          imagen.value="";
          categories.value="";
          precio.value=0;
          nombre.value="Seleccione una categoria";
}
const deleteButton = document.getElementById("deleteButton");
deleteButton.addEventListener("click", () =>{
    handleButtonDelete();
})

const handleButtonDelete = () =>{
    handleDeleteProduct();
}
// Guardar o modificar elementos

//Productos
const acceptButton = document.getElementById("acceptButton");
acceptButton.addEventListener("click", () => {
    handleSaveOrModifyElements();
});

const handleSaveOrModifyElements = () => {
    const nombre = document.getElementById("name").value,
          imagen = document.getElementById("img").value,
          precio = document.getElementById("precio").value,
          categories = document.getElementById("categoria").value;
          let object = null;
    if (productoActivo){
        object = {
            productoActivo,
            nombre,
            imagen,
            precio,
            categories,
        };
    } else{
        object = {
            id: new Date().toISOString(),
            nombre,
            imagen,
            precio,
            categories,
        };
    }

    setInLocalStorage(object);
    console.log(object);
    handleGetProductsToStore();
    closeModal();
};

const handleDeleteProduct = () =>{
    const products = handleGetProductsLocalStorage();
    const result = products.filter((el)=> el.id !== productoActivo.id);
    localStorage.setItem("products", JSON.stringify(result));
    const newproducts = handleGetProductsToStore();
    handleRenderList(newproducts);
    closeModal();
}

//ButtonSearch
const ButtonSearch = document.getElementById("buttonSearch");
ButtonSearch.addEventListener("click", () =>{
    handleSearchProductsByName();
})