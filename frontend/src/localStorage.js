export const getCartItems = () => {
    const cartItems = localStorage.getItem("cartItems");
    try {
        return cartItems ? JSON.parse(cartItems) : []; //Converts a JavaScript Object Notation (JSON) string into object.
    } catch (error) {
        console.error("Error parsing cartItems from localStorage:", error);
        return [];
    }
};

export const setCartItems=(cartItems)=>{
    //save all cartItems again
    localStorage.setItem('cartItems',JSON.stringify(cartItems)); //to save in backend,it need to be string
}