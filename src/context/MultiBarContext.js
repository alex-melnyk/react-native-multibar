"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
exports.MultiBarContext = react_1.createContext({});
exports.MultiBarProvider = ({ children, data, iconSize = 30, initialExtrasVisible = false, overlayRadius = 80 }) => {
    const [extrasVisible, setExtrasVisible] = react_1.useState(initialExtrasVisible);
    return (<exports.MultiBarContext.Provider value={{
        data,
        extrasVisible,
        iconSize,
        overlayRadius,
        setExtrasVisible
    }}>
      {children}
    </exports.MultiBarContext.Provider>);
};
