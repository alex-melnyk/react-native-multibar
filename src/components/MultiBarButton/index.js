"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_native_1 = require("react-native");
const context_1 = require("../../context");
const Styles_1 = require("./Styles");
exports.MultiBarButton = ({ children, style, onPress }) => {
    const { extrasVisible, setExtrasVisible } = react_1.useContext(context_1.MultiBarContext);
    const animated = react_1.useRef(new react_native_1.Animated.Value(0)).current;
    react_1.useEffect(() => {
        react_native_1.Animated.spring(animated, {
            toValue: extrasVisible ? 1 : 0
        }).start();
    }, [extrasVisible]);
    const handlePress = react_1.useCallback(() => {
        if (!onPress || !onPress()) {
            setExtrasVisible(!extrasVisible);
        }
    }, [extrasVisible]);
    const rotation = animated.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    });
    return (<react_native_1.TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
      <react_native_1.Animated.View style={[Styles_1.styles.contentContainer, {
            transform: [
                {
                    rotateZ: rotation
                }
            ]
        }, style]}>
        {children}
      </react_native_1.Animated.View>
    </react_native_1.TouchableOpacity>);
};
