import axios from 'axios';
import Rating from '../components/Rating';
import { hideLoading, showLoading } from '../utils';
const HomeScreen={
     async render(){
        //const {products}=data;
        //fetch products from 'api/products
        showLoading();
        const response=await axios({
            url:"http://localhost:5000/api/products",
            headers:{
                'Content-Type':'application/json'
            }
        });
        console.log('response:',response);
        hideLoading();
        if(!response || response.statusText!=="OK"){ 
            return `<div>Error in getting data</div>`;
        }
        const products=response.data;
        console.log(products);
        return `
        <ul class="products">
        ${products.map(product=>`
            <li>
                <div class="product">
                                <a href="/#/product/${product._id}">
                                    <img src="${product.image}" alt="${product.name}">
                                </a>
                                <div class="product-name">
                                    <a href="/#/product/${product._id}">${product.name}</a>
                                </div>
                                <div class="product-rating">
                                    ${Rating.render({
                                        value:product.rating,
                                        text:`${product.numReviews} reviews`
                                    })}
                                </div>
                                <div class="product-brand">
                                    ${product.brand}
                                </div>
                                <div class="product-price">
                                    $${product.price}
                                </div>
                            </div>
                        
            </li>`).join('\n')}
        </ul>
        `;
    },
    after_render(){
            console.log('Home Screen after render loaded');
    },
};
export default HomeScreen;
