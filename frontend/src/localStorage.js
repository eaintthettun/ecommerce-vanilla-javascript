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

export const setUserInfo=({
    _id='',
    name='',
    email='',
    password='',
    token='',
    isAdmin=false
})=>{
    localStorage.setItem(
        'userInfo',
        JSON.stringify({//key value pair
            _id,
            name,
            email,
            password,
            token,
            isAdmin
        })
    )
}

export const getUserInfo=()=>{
    return localStorage.getItem('userInfo')?
    JSON.parse(localStorage.getItem('userInfo')):
    {name:'',email:'',password:''};
}