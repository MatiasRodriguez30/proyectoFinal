
//=====LocalStorage======//

// Traer productos del localStorage
export const handleGetProductLocalStorage = () => {
    const products = JSON.parse(localStorage.getItem("products"));
    if (products) {
        return products;
    } else {
        return [];
    }
};

// Guardar en localStorage
export const setInLocalStorage = (productIn) => {
    if (productIn) {
        let productsInLocal = handleGetProductLocalStorage();

        const existingIndex = productsInLocal.findIndex(productLocal => productLocal.id === productIn.id);

        if (existingIndex !== -1) {
            // Si el producto existe, reemplázalo
            productsInLocal[existingIndex] = productIn;
        } else {
            // Si el producto no existe, agrégalo
            productsInLocal.push(productIn);
        }

        // Guardar el nuevo array en localStorage
        localStorage.setItem("products", JSON.stringify(productsInLocal));
    }
};

