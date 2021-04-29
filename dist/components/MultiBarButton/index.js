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
exports.MultiBarButton = void 0;
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const context_1 = require("../../context");
const Styles_1 = require("./Styles");
const MultiBarButton = ({ children, rotationDegrees, style, onPress }) => {
    const { extrasVisible, setExtrasVisible } = React.useContext(context_1.MultiBarContext);
    const animated = React.useRef(new react_native_1.Animated.Value(0)).current;
    React.useEffect(() => {
        const animation = react_native_1.Animated.spring(animated, {
            toValue: extrasVisible ? 1 : 0,
            useNativeDriver: true
        });
        animation.start();
        return () => animation.stop();
    }, [extrasVisible]);
    const handlePress = React.useCallback(() => {
        if (!onPress || !onPress()) {
            setExtrasVisible(!extrasVisible);
        }
    }, [extrasVisible]);
    const rotateZ = animated.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', `${rotationDegrees !== null && rotationDegrees !== void 0 ? rotationDegrees : 180}deg`]
    });
    return (<react_native_1.TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
      <react_native_1.Animated.View style={[Styles_1.styles.contentContainer, {
                transform: [
                    { rotateZ }
                ]
            }, style]}>
        {children}
      </react_native_1.Animated.View>
    </react_native_1.TouchableOpacity>);
};
exports.MultiBarButton = MultiBarButton;
