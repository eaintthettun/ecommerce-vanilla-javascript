JS AMAZONA

1.Create Folder Structure

    1. create root folder as jsamazon(here Ecommerce vanilla javascript)
    2. add frontend and backend folder
    3. create src folder in frontend
    4. create index.html with heading jsamazona in src
    5. run npm init in frontend folder
    6. npm install -D live-server
    7. add start command as 'live-server src --verbose' in package.json
    8. run npm start

2.Design Website

    1. create style.css
    2. link style.css to index.html
    3. div.grid-container
    4. create header, main and footer
    5. style html,body
    6. style grid-container,header,main and footer

3.Create static homescreen

    1. create ul.products
    2. create li
    3. create div.product
    4. add .product-image,.product-name,.product-brand,.product-price in div.product
    5. style ul.products and internal divs
    6. duplicate 2 times to show 3 photos

4.Render dynamic home screen

    1. create data.js
    2. export an array of 6 products
    3. create screen/HomeScreen.js
    4. export HomeScreen as object with render() method
    5. implement render()
    6. import data.js
    7. return products mapped to lis inside ul
    8. create app.js
    9. link it to index.html as module
    10. set main id to main-container
    11. create router() function in app.js
    12. set main container inner html to HomeScreen.render()
    13. set load event of window to router function

5.Build url router

    1. Create routes as route:screen object for home screen in app.ts
    2. create utils.js
    3. export parseRequestUrl() in utils.js
    4. set url as hash address split by slash /
    5. return resource,id and verb of url
    6. update router() //windown.addEventListener(...)
    7. set request as parseRequestUrl()
    8. build parsedUrl and compare it with routes
    9. if route exists render, else render Error404
    10. create screens/Error404Screen.js and render error message

6.Create Node.js server

    1. run npm init in root jsamazona folder
    2. npm install express
    3. create server.js in backend folder
    4. add start command as 'node backend/server.js'
    5. require express in server.js
    6. move data.js from frontend to backend
    7. create route for /api/products
    8. return products in data.js
    9. run npm start

7.Load backend products

    1. edit HomeScreen.js
    2. make render() async
    3. fetch products from 'api/products' in render()
    4. make router async and call await HomeScreen.render()
    5. use cors on backend(run npm install cors in root folder)
