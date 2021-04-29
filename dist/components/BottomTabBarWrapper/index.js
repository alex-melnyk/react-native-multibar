"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BottomTabBarWrapper = void 0;
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const MultiBarOverlay_1 = require("../MultiBarOverlay");
const Styles_1 = require("./Styles");
const BottomTabBarWrapper = ({ children, params }) => (<react_native_1.View pointerEvents="box-none" style={Styles_1.styles.container}>
    <MultiBarOverlay_1.MultiBarOverlay params={params}/>
    {children}
  </react_native_1.View>);
exports.BottomTabBarWrapper = BottomTabBarWrapper;
