import CartScreen from "./screens/CartScreen.js";
import Error404Screen from "./screens/Error404Screen.js";
import HomeScreen from "./screens/HomeScreen.js";
import ProductScreen from "./screens/ProductScreen.js";
import { parseRequestUrl } from "./utils.js";
const routes={
    "/":HomeScreen,
    "/product/:id":ProductScreen,
    "/cart/:id":CartScreen,
    "/cart":CartScreen
}
const router=async ()=>{
    const request=parseRequestUrl();
    console.log(request);
    const parsedUrl=(request.resource?`/${request.resource}`:'/')
    + (request.id ? '/:id':'') +
    (request.verb ? `/${request.verb}`:'');
    const screen=routes[parsedUrl]? routes[parsedUrl]:Error404Screen;

    const main=document.getElementById('main-container');
    main.innerHTML=await screen.render();
    screen.after_render();
}
window.addEventListener("load",router);
window.addEventListener('hashchange',router);