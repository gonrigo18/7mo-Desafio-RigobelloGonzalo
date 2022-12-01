import ClientSql from './sql.js'
import { options } from './options/mariaDB.js'


const sql = new ClientSql(options);

sql.createTable()
  .then(() => {
    console.log("1) tabla creada");

    const products = [
      { nombre: 'Ati radeon', codigo: 'NB0001', precio: 136000, stock: 12 },
      { nombre: 'Mononitor Samsung 23"', codigo: 'PK001L', precio: 89000, stock: 5 },
      { nombre: 'Teclado Snapdragon', codigo: 'EF-44411', precio: 7899, stock: 10 }
    ]
    return sql.insertProducts(products);
  })
  .then(() => {
    console.log("2) productos insertados");
    return sql.listProducts();
  })
  .then(products => {
    console.log("3) productos listados");
    console.table(products);
    return sql.deleteById(3);
  })
  .then(() => {
    console.log("4) producto borrado");
    return sql.updateStockById(0, 2);
  })
  .then(() => {
    console.log("5) stock actualizado");
    return sql.listProducts();
  })
  .then(products => {
    console.log("resultado total");
    console.table(products);
  })
  .catch((err) => { console.log(err); throw err })
  .finally(() => {
    sql.close();
  })