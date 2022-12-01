import ClientSql from './sql.js'
import { options } from './options/SQLite3.js'


const sql = new ClientSql(options);

try {
    await sql.createTable();
    console.log("1) tabla creada");

    const productsToInsert = [
        { nombre: 'Ati radeon', codigo: 'NB0001', precio: 136000, stock: 12 },
        { nombre: 'Mononitor Samsung 23"', codigo: 'PK001L', precio: 89000, stock: 5 },
        { nombre: 'Teclado Snapdragon', codigo: 'EF-44411', precio: 7899, stock: 10 }
    ]
    await sql.insertProducts(productsToInsert);
    console.log("2) productos insertados");

    const readProducts = await sql.listProducts();
    console.log("3) productos listados");
    console.table(readProducts);

    await sql.deleteProductById(3);
    console.log("4) producto borrado");

    await sql.updateStockById(0, 2);
    console.log("5) stock actualizado");

    const finalProducts = await sql.listProducts();
    console.log("resultado total");
    console.table(finalProducts);

} catch (err) {
    console.log(err);
} finally {
    sql.close();
}