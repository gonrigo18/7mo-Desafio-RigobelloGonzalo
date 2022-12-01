import knexLib from 'knex';

class ClientSql {
    constructor(config) {
        this.knex = knexLib(config);
    }

    createTable() {
        return this.knex.schema.dropTableIfExists('products')
            .finally(() => {
                return this.knex.schema.createTable('products', table => {
                    table.increments('id').primary();
                    table.string('nombre', 50).notNullable();
                    table.string('codigo', 10).notNullable();
                    table.float('precio');
                    table.integer('stock');
                })
            })
    }

    insertProducts(products) {
        return this.knex('products').insert(products);
    }

    listProducts() {
        return this.knex('products').select('*');
    }

    deleteProductById(id) {
        return this.knex.from('products').where('id', id).del();
    }

    updateStockById(stock, id) {
        return this.knex.from('products').where('id', id).update({ stock: stock });
    }

    close() {
        this.knex.destroy();
    }
}

export default ClientSql;