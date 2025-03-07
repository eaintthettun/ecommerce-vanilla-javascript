const Error404Screen={
    render(){
        return `<div>Page not found</div>`
    },
    after_render(){
        console.log('Error404 Screen after render loaded');
    },
}
export default Error404Screen;