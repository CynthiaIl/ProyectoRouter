export default class Product {
    constructor({ id, title, description, price, thumbnail, code, stock }) {

        if (!id) throw new Error ('falta argumento1')
        if (!title) throw new Error ('falta argumento2')
        if (!description) throw new Error ('falta argumento3')
        if (!price) throw new Error ('falta argumento4')
        if (!thumbnail) throw new Error ('falta argumento5')
        if (!code) throw new Error ('falta argumento6')
        if (!stock) throw new Error ('falta argumento7')
        
            this.id = id
            this.title = title
            this.description = description
            this.price = price
            this.thumbnail = thumbnail
            this.code = code
            this.stock = stock
    }
}