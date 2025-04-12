export const parseRequestUrl=()=>{
    const url=document.location.hash.toLowerCase();
    console.log(url); // /#/product/1
    const request=url.split("/");
    return{
        resource:request[1], //product
        id:request[2], //1
        action:request[3] //undefined
    };
};
export const rerender=async(component)=>{
    document.getElementById("main-container").innerHTML=await component.render();
    await component.after_render();
}
export const showLoading=()=>{
    document.getElementById('loading-overlay').classList.add('active');
}
export const hideLoading=()=>{
    document.getElementById('loading-overlay').classList.remove('active');
}

export const showMessage=(message,callback)=>{
    document.getElementById('message-overlay').innerHTML=`
        <div>
            <div id="message-overlay-content">${message}</div>
            <button id="message-overlay-close-button">OK</button>
        </div>
    `;
    document.getElementById("message-overlay").classList.add('active');
    document
    .getElementById('message-overlay-close-button')
    .addEventListener('click',()=>{
        document.getElementById('message-overlay').classList.remove('active');
        if(callback){
            callback();
        }
    });
}