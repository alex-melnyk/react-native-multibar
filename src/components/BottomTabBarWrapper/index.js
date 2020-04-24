"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_native_1 = require("react-native");
const bottom_tabs_1 = require("@react-navigation/bottom-tabs");
const MultiBarOverlay_1 = require("../MultiBarOverlay");
const Styles_1 = require("./Styles");
exports.BottomTabBarWrapper = (props) => (<react_native_1.View pointerEvents="box-none" style={Styles_1.styles.container}>
    <MultiBarOverlay_1.MultiBarOverlay {...props}/>
    <bottom_tabs_1.BottomTabBar {...props}/>
  </react_native_1.View>);
