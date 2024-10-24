import { openModal, setProductoActivo } from "../../main";
import { handleGetProductLocalStorage } from "../persistence/localstorage";

//==STORE==///
//Funcion que se encarga de traer elementos y llamar al render
export const handleGetProductsToStore = () => {
    const products = handleGetProductLocalStorage();
    console.log("Productos obtenidos del almacenamiento local:", products); // Depuración
    handleRenderList(products);
};
//Se encarga de filtrar y de renderizar la seccion con todos sus resèctivo elementos
export const handleRenderList = (productosIn) => {
    console.log("Productos recibidos para renderizar:", productosIn); // Depuración
    //filtrado de arrays por categoria
    const burgers = productosIn.filter((el) => el.categories === "Hamburguesa");
    const papas = productosIn.filter((el) => el.categories === "Papas");
    const gaseosas = productosIn.filter((el) => el.categories === "Gaseosa");

    console.log("Hamburguesas:", burgers); // Depuración
    console.log("Papas:", papas); // Depuración
    console.log("Gaseosas:", gaseosas); // Depuración

    //Renderiza los elementos de la seccion
    const renderProductGroup = (productos, title) => {
        if (productos.length > 0) {
            const productosHTML = productos.map((producto, index) => {
                return `<div class="containerTargetItem" id='product-${producto.categories}-${index}'>
                    <div>
                        <img src='${producto.imagen}'/>
                        <div>
                            <h2>${producto.nombre}</h2>
                        </div>
                    </div class='targetProps'>
                    <p><b>Precio:</b> $ ${producto.precio}</p>
                    <p><b>Categoría:</b> ${producto.categories}</p>
                </div>`;
            });
            //Retorna la seccion con todos los elementos dentro
            return `
                <section class='sectionStore'>
                <div class='containerTitleSection'>
                <h3>${title}</h3>
                </div>
                    <div class='containerProductStore'>
                        ${productosHTML.join("")}
                    </div>
                </section>`;
        } else {
            return "";
        }
    };
    //renderizar cada uno de los productos dentro de su categoria
    const appContainer = document.getElementById("storeContainer");
    if (!appContainer) {
        console.error("El elemento storeContainer no se encontró");
        return;
    }

    appContainer.innerHTML = `
        ${renderProductGroup(burgers, "Hamburguesa")}
        ${renderProductGroup(papas, "Papas")}
        ${renderProductGroup(gaseosas, "Gaseosa")}`;
    //Añaden los eventos de manera dinamica
    const addEvents = (productsIn) => {
        productsIn.forEach((element, index) => {
            const productContainer = document.getElementById(`product-${element.categories}-${index}`);
            if (productContainer) {
                productContainer.addEventListener('click', () => {
                    setProductoActivo(element);
                    openModal();
                });
            } else {
                console.error(`El contenedor del producto no se encontró para ${element.categories}-${index}`);
            }
        });
    };

    addEvents(burgers);
    addEvents(papas);
    addEvents(gaseosas);
};
