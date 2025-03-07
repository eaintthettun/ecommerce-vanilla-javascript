import { getProduct } from "../api";
import { getCartItems, setCartItems } from "../localStorage";
import { parseRequestUrl, rerender } from "../utils";

const addToCart = (newItem, forceUpdate = false) => {
    console.log('New item:', newItem);

    // Retrieve from local storage
    let cartItems = getCartItems();
    
    if (!Array.isArray(cartItems)) {
        console.warn("cartItems was not an array. Resetting it.");
        cartItems = [];
    }
    //cartItems = cartItems.filter(item => item.qty !== 3);

    // Check if the item already exists in the cart
    const existItem = cartItems.find(oldItem => oldItem._id === newItem._id);

    if (existItem) {
        if (forceUpdate) {
            // Replace the existing item with newItem
            cartItems = cartItems.map(oldItem =>
                oldItem._id === existItem._id ? newItem : oldItem
            );
        } else {
            // Prevent duplicate item from being added
            console.warn('Item already exists in cart. Use forceUpdate to update it.');
        }
    } else {
        // If item doesn't exist, add it to cart
        cartItems.push(newItem);
    }

    try {
        // Save updated cart to local storage
        setCartItems(cartItems);
    } catch (e) {
        if (e instanceof DOMException && e.code === 22) {
            console.error("LocalStorage quota exceeded!");
            alert("Your cart is full. Try removing some items.");
        }
    }

    if (forceUpdate) {
        rerender(CartScreen);
    }
    
};


const CartScreen={
    async render(){
        const request=parseRequestUrl();
        if(request.id){//if id exists,item will be save into cart with qty 1
            const product=await getProduct(request.id);
            console.log('product is:',product);
            addToCart({
                _id:product._id,
                name:product.name,
                price:product.price,
                image:product.image,
                countInStock:product.countInStock,
                qty:1
            });
        }
        
        const cartItems=getCartItems();
        return `
        <div class="content cart">
            <div class="cart-list">
                <ul class="cart-list-container">
                    <li>
                        <h3>Shopping Cart</h3>
                        <div>Price</div>
                    </li>
                    ${
                        cartItems.length===0?
                        '<div>Cart is empty.<a href="/#/Go Shopping</a>':
                        cartItems.map(item=>`
                            <li>
                                <div class="cart-image">
                                    <img src="${item.image}" alt="${item.name}"/>
                                </div>
                                <div class="cart-name">
                                    <div>
                                        <a href="/#/product/${item._id}">${item.name}</a>
                                    </div>
                                    <div>
                                        Qty:<select class="qty-select" id="${item._id}">
                                            ${
                                                [...Array(item.countInStock).keys()].map(x=>item.qty===x+1?
                                                    `<option selected value="${x+1}">${x+1}</option>`
                                                    :`<option value="${x+1}">${x+1}</option>`
                                                )
                                            }
                                        </select>
                                        <button type="button" class="delete-button" id="${item._id}">Delete
                                        </button>
                                    </div>
                                </div>
                                <div class="cart-price">
                                    $${item.price}
                                </div>
                            </li>`)
                            .join('\n')
                    }
                </ul>
            </div>
            <div class="cart-action">
                    <h3>
                        Subtotal(${cartItems.reduce((a,current
                        )=>a+current.qty,0)}items):
                        $${cartItems.reduce((a,current)=>a+current.price*current.qty,0)}
                    </h3>
                    <button id="checkout-button" class="primary fw">
                        Proceed to Checkout
                    </button>
            </div>
        </div>`;
    },
    after_render(){
        const qtySelects=document.getElementsByClassName("qty-select");
        Array.from(qtySelects).forEach(qtySelect=>{
            qtySelect.addEventListener('change',(e)=>{
                const item=getCartItems().find(x=>x._id===qtySelect.id);
                addToCart({...item,qty:Number(e.target.value)},true);
            })
        });
        const deleteButtons=document.getElementsByClassName('delete-button');
        Array.from(deleteButtons).forEach(deleteButton=>{
            deleteButton.addEventListener('click',()=>{
                removeFromCart(deleteButton.id);   
            });
        });
        document.getElementById('checkout-button').addEventListener('click',()=>{
        document.location.hash="/signin";});
        return `<div>after render</div>`;
    }
}
const removeFromCart=(id)=>{
    setCartItems(getCartItems().filter(x=>x._id!==id));
    if(id===parseRequestUrl().id){
        document.location.hash='/cart';
    }else{
        rerender(CartScreen);
    }
}
export default CartScreen;