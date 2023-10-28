import Cart from "./cart.js";
import CartItem from "./cart_item.js";
import Users from "./user.js";
import Products from "./product.js";
import ProductCategory from "./product_category.js";

Cart.hasMany(CartItem);
Users.hasMany(Cart);
CartItem.belongsTo(Cart);
Cart.belongsTo(Users);
ProductCategory.hasMany(Products, { foreignKey: "id_product_cat" });
Products.belongsTo(ProductCategory, { foreignKey: "id" });

export { Cart, CartItem, Users, Products, ProductCategory };
