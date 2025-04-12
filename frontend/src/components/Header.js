import { getUserInfo } from "../localStorage";

export const Header={
    render:()=>{
        const {name}=getUserInfo();
        console.log('name is:',);
        return `
        <div class="brand">
            <a href="/#/">jsamazona</a>
        </div>
        <div>
        ${name
            ?`<a href="/#/profile">name</a>`
            :`<a href="/#/signin">Sign-In</a>`
        }
            <a href="/#/cart">Cart</a>
        </div>
        `;
    },
    after_render:()=>{
    }
}