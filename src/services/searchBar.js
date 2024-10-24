import { handleGetProductLocalStorage } from "../persistence/localstorage";
import { handleRenderList } from "../view/store";

export const handleSearchProductsByName = () =>{
    const inputHeader = document.getElementById("inputHeader");
    const products = handleGetProductLocalStorage();
    const result = products.filter((el)=>{
        el.nombre.toLowerCase().includes(inputHeader.value)
    });
    handleRenderList(result);
}