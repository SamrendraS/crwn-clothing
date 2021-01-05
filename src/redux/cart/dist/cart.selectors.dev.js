"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectCartTotal = exports.selectCartItemsCount = exports.selectCartHidden = exports.selectCartItems = void 0;

var _reselect = require("reselect");

var selectCart = function selectCart(state) {
  return state.cart;
};

var selectCartItems = (0, _reselect.createSelector)([selectCart], function (cart) {
  return cart.cartItems;
});
exports.selectCartItems = selectCartItems;
var selectCartHidden = (0, _reselect.createSelector)([selectCart], function (cart) {
  return cart.hidden;
});
exports.selectCartHidden = selectCartHidden;
var selectCartItemsCount = (0, _reselect.createSelector)([selectCartItems], function (cartItems) {
  return cartItems.reduce(function (accumulatedQuantity, cartItem) {
    return accumulatedQuantity + cartItem.quantity;
  }, 0);
});
exports.selectCartItemsCount = selectCartItemsCount;
var selectCartTotal = (0, _reselect.createSelector)([selectCartItems], function (cartItems) {
  return cartItems.reduce(function (accumulatedQuantity, cartItem) {
    return accumulatedQuantity + cartItem.quantity * cartItem.price;
  }, 0);
});
exports.selectCartTotal = selectCartTotal;