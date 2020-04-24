"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_native_1 = require("react-native");
const context_1 = require("../../context");
const Styles_1 = require("./Styles");
const COMMON_DEGREES = 180;
exports.MultiBarOverlay = ({ navigation }) => {
    const { data, extrasVisible, iconSize, overlayRadius, setExtrasVisible } = react_1.useContext(context_1.MultiBarContext);
    const iconSizeHalf = react_1.useMemo(() => iconSize / 2, [iconSize]);
    const surfaceSize = react_1.useMemo(() => (overlayRadius * 2) + iconSize, [iconSize, overlayRadius]);
    const surfaceSizeHalf = react_1.useMemo(() => surfaceSize / 2, [surfaceSize]);
    const angleStep = react_1.useMemo(() => COMMON_DEGREES / data.length, [data]);
    const animations = react_1.useMemo(() => data.map(() => new react_native_1.Animated.Value(extrasVisible ? 1 : 0)), [data]);
    react_1.useEffect(() => {
        // TODO: Implement animation switch.
        const animate = react_native_1.Animated.spring || react_native_1.Animated.timing;
        const animationsList = animations.map((anim, idx) => animate(anim, {
            toValue: extrasVisible ? 1 : 0,
            delay: idx * 150
        }));
        react_native_1.Animated.parallel(animationsList).start();
    }, [extrasVisible]);
    const itemsList = react_1.useMemo(() => data.map((extrasRender, idx) => {
        const handleTouchEnd = () => {
            setExtrasVisible(false);
        };
        const angle = COMMON_DEGREES + (angleStep * idx) + (angleStep / 2);
        const x = overlayRadius * Math.cos(angle * Math.PI / COMMON_DEGREES) + (surfaceSizeHalf - iconSizeHalf);
        const y = overlayRadius * Math.sin(angle * Math.PI / COMMON_DEGREES) + (surfaceSizeHalf);
        const left = animations[idx].interpolate({
            inputRange: [0, 1],
            outputRange: [surfaceSizeHalf - iconSizeHalf, x]
        });
        const top = animations[idx].interpolate({
            inputRange: [0, 1],
            outputRange: [surfaceSize, y]
        });
        const rotation = animations[idx].interpolate({
            inputRange: [0, 1],
            outputRange: [90, 0]
        });
        return (<react_native_1.Animated.View key={`extra_item_${idx}`} style={[Styles_1.styles.itemContainer, {
                left,
                top,
                width: iconSize,
                height: iconSize,
                transform: [
                    { rotateZ: rotation }
                ]
            }]} onTouchEnd={handleTouchEnd}>
        {extrasRender({
            navigation
        })}
      </react_native_1.Animated.View>);
    }), [animations, angleStep, data, iconSize, overlayRadius, surfaceSizeHalf, iconSizeHalf]);
    return (<react_native_1.Animated.View pointerEvents="box-none" style={[Styles_1.styles.container, {
            width: surfaceSize,
            height: surfaceSizeHalf * (surfaceSize / overlayRadius / 2)
        }]}>
      {itemsList}
    </react_native_1.Animated.View>);
};
