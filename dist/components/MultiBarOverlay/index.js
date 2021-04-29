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
exports.MultiBarOverlay = void 0;
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const context_1 = require("../../context");
const Styles_1 = require("./Styles");
const COMMON_DEGREES = 180;
const MultiBarOverlay = ({ params }) => {
    const { data, extrasVisible, overlayProps, setExtrasVisible } = React.useContext(context_1.MultiBarContext);
    const { expandingMode, iconSize, overlayRadius } = React.useMemo(() => {
        return Object.assign({
            expandingMode: 'staging',
            iconSize: 30,
            overlayRadius: 80
        }, overlayProps || {});
    }, [overlayProps]);
    const iconSizeHalf = React.useMemo(() => iconSize / 2, [iconSize]);
    const surfaceSize = React.useMemo(() => (overlayRadius * 2) + iconSize, [iconSize, overlayRadius]);
    const surfaceSizeHalf = React.useMemo(() => surfaceSize / 2, [surfaceSize]);
    const angleStep = React.useMemo(() => COMMON_DEGREES / data.length, [data]);
    const animations = React.useMemo(() => data.map(() => new react_native_1.Animated.Value(extrasVisible ? 1 : 0)), [data]);
    const overlayHeight = React.useMemo(() => {
        return surfaceSizeHalf * (surfaceSize / overlayRadius / 2);
    }, [surfaceSizeHalf, surfaceSize, overlayRadius]);
    React.useEffect(() => {
        const animate = react_native_1.Animated.spring;
        const animationsList = animations.map((anim, idx) => animate(anim, {
            toValue: extrasVisible ? 1 : 0,
            useNativeDriver: false
        }));
        const animator = expandingMode === 'staging'
            ? react_native_1.Animated.stagger(100, animationsList)
            : react_native_1.Animated.parallel(animationsList);
        animator.start();
        return () => animator.stop();
    }, [extrasVisible]);
    const itemsList = React.useMemo(() => data.map((extrasRender, idx) => {
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
        const rotateZ = animations[idx].interpolate({
            inputRange: [0, 1],
            outputRange: ['90deg', '0deg']
        });
        return (<react_native_1.Animated.View key={`extra_item_${idx}`} style={[Styles_1.styles.itemContainer, {
                    left,
                    top,
                    width: iconSize,
                    height: iconSize,
                    transform: [
                        { rotateZ }
                    ]
                }]} onTouchEnd={handleTouchEnd}>
        {extrasRender({
                params: params
            })}
      </react_native_1.Animated.View>);
    }), [animations, angleStep, data, iconSize, overlayRadius, surfaceSizeHalf, iconSizeHalf]);
    return (<react_native_1.Animated.View pointerEvents="box-none" style={[Styles_1.styles.container, {
                width: surfaceSize,
                height: overlayHeight
            }]}>
      {itemsList}
    </react_native_1.Animated.View>);
};
exports.MultiBarOverlay = MultiBarOverlay;
