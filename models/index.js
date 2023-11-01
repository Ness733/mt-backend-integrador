import Cart from "./cart.js";
import CartItem from "./cart_item.js";
import Users from "./user.js";
import Products from "./product.js";
import ProductCategory from "./product_category.js";
import Sales from "./sales.js";
import UserCategory from "./user_category.js";
import Provider from "./provider.js";

// Cart
Cart.hasMany(CartItem, { foreignKey: "id_cart" });
CartItem.belongsTo(Cart, { foreignKey: "id_cart" });
Cart.hasMany(Sales, { foreignKey: "id_cart" });
Sales.belongsTo(Cart, { foreignKey: "id_cart" });

// Products
CartItem.belongsTo(Products, { foreignKey: "id_product" });
Products.hasMany(CartItem, { foreignKey: "id_product" });

// Users
Users.hasMany(Cart, { foreignKey: "id_user" });
Cart.belongsTo(Users, { foreignKey: "id_user" });
Users.hasOne(Provider, { foreignKey: "id_user" });
Provider.belongsTo(Users, { foreignKey: "id_user" });

// Products Category
ProductCategory.hasMany(Products, { foreignKey: "id_product_cat" });
Products.belongsTo(ProductCategory, { foreignKey: "id_product_cat" });

// User Category
UserCategory.hasMany(Users, { foreignKey: "id_user_cat" });
Users.belongsTo(UserCategory, { foreignKey: "id_user_cat" });

// Provider
Provider.hasMany(Products, { foreignKey: "id_provider" });
Products.belongsTo(Provider, { foreignKey: "id_provider" });

// Sales

export {
	Cart,
	CartItem,
	Users,
	Products,
	ProductCategory,
	Sales,
	UserCategory,
};
