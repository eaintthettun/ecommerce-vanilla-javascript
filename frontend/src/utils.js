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