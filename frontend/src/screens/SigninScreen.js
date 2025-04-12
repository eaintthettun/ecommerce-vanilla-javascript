import { signin } from "../api.js";
import { getUserInfo, setUserInfo } from "../localStorage.js";
import { hideLoading, showLoading, showMessage } from "../utils.js";

const SigninScreen={
    after_render(){
        document
        .getElementById("signin-form")
        .addEventListener("submit",async (e)=>{
            e.preventDefault();
            //if email & pwd exist, it saves data in server
            showLoading();
            const data=await signin({
                email:document.getElementById("email").value,
                password:document.getElementById("password").value
            });
            hideLoading();
            if(data.error){
                showMessage(data.error);
            }else{
                setUserInfo(data);
                document.location.hash="/"; //login success,go to home screen
            }
        });
    },
    render(){
        //if already signed in, just show home page,do not signin again 
        if(getUserInfo().name){
            document.location.hash="/";
        }
        return `
        <div class="form-container">
            <form id="signin-form">
                <ul class="form-items">
                    <li>
                        <h1>Sign-In</h1>
                    </li>
                    <li>
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email">
                    </li>
                    <li>
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password">
                    </li>
                    <li>
                        <button type="submit" class="primary">Signin</button>
                    </li>
                    <li>
                        <div>
                            New User?
                            <a href="/#/register">Create your account</a>
                        </div>
                    </li>
            </form>
        </div>`
    }
}
export default SigninScreen;