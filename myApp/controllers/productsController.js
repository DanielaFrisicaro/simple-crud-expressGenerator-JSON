
//require
const fs = require('fs');
const path = require('path');

//declaración de variables a utilizar
const food_path = path.join(__dirname, '../database/food.json');//Path. 1er paso.
const food_read = fs.readFileSync(food_path, 'utf-8');//Read. 2do paso.
const foods = JSON.parse(food_read);//Variable. 3er paso.

//...........................................LIST..............................................................//
const list = (req, res) => {
   // res.send('estamos en el list')
   res.render('products', {foods: foods})//la 1era es la que va a la vista y la 2da es la variable central, la que contiene todos los datos, la del JSON.
};

//en esta vista se usa la "foods" en la vista, por lo que cuando llamamos al ID se hace como "foods[i].id" y te lleva al detail,
//en el cual se usa "food"


//...........................................DETAIL..............................................................//

const productDetail = (req, res) => {

    //destructuring//
    // const { id } = req.params;

    //sin destructuring
    const food = req.params.id
    const food_seleccionada = foods.find((el) => el.id === parseInt(food))// o se hace con doble igual o se deja el triple igual con parseInt porque nota lo que llega es string
   //lo que se trae es lo que se seleccionó por params, por ID.
    res.render('detail',{ food: food_seleccionada });//envio nombre food que se uso en la vista y el resultado que es la food seleccionada.
}


//...........................................CREATE..............................................................//
const crearProduct = (req, res) => {
    // res.send('estamos en el list')
    res.render('create')
 };

 const postProduct = (req, res) =>{
    
    const pais= req.body.pais
    const plato = req.body.plato
    const id= foods.length + 1
    console.log(foods)
    
    foods.push({
        pais: pais, //1ero campo del formulario, 2do variable declarada arriba que trae los datos del relleno(body)del formulario
        plato: plato,//1ero campo del formulario, 2do variable declarada arriba que trae los datos del relleno(body)del formulario
        id
    })

    const foods_string = JSON.stringify(foods, null, 2);//4to paso
    fs.writeFileSync(food_path, foods_string)//5to paso. Se escribe en el JSON

    console.log(foods)
    console.log('estoy pasando por el post')

    res.redirect('/')
 }

 const editarProduct = (req, res) => {

    const indice = req.params.id;
    const food_seleccionada = foods.find((el) => el.id === parseInt(indice));
    //console.log(indice);

    res.render('edit', { food: food_seleccionada });//la 1era (food) es el elemento que va a la vista y el 2do(food-seleccionada) es la variable que contiene el método del array

 };

 const putProduct = (req, res) => {
//traer todos los campos del body del formulario + el id
    const id = req.params.id;
    const pais = req.body.pais;
    const plato = req.body.plato;
    console.log(id);
    console.log(pais);
    console.log(plato);


    foods.forEach(element => {
        //element.campo a llenar de cada formulario, se sigue el orden del form, la 2da parte es el req.body y el req.params, esta ultima info puede estar o no colocada en una variable, es lo que se carga en el form y hay que en este caso actualizarlo.
        if (element.id === parseInt(id)) {
            element.pais = pais;
            element.plato = plato;
        }
    });
    const data = JSON.stringify(foods, null, 2)//4to paso
    fs.writeFileSync(food_path, data)//5to paso. Se escribe en el JSON
    res.redirect('/')
    
 };

 const eliminarProduct = (req, res) => {
  
   // res.render('delete')

   const indice = req.params.id;
   const food_seleccionada = foods.find((el) => el.id === parseInt(indice));
   //console.log(indice);

   res.render('delete', { food: food_seleccionada });//la 1era (food) es el elemento que va a la vista y el 2do(food-seleccionada) es la variable que contiene el método del array

 };

 const deleteProduct = (req, res) => {

    const id = req.params.id;
    const foods_filtradas = foods.filter(el => el.id !== parseInt(id))

    // console.log(id)
    const data = JSON.stringify(foods_filtradas, null, 2)//4to paso
    fs.writeFileSync(food_path, data)//5to paso. Se escribe en el JSON
    res.redirect('/')
}




module.exports = {
    list,
    productDetail,
    crearProduct,
    postProduct,
    editarProduct,
    putProduct,
    eliminarProduct,
    deleteProduct

}
