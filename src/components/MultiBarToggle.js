import React, { Component } from 'react';
import { Animated, Dimensions, Text, TouchableOpacity, TouchableWithoutFeedback, Vibration, View } from 'react-native';
import PropTypes from 'prop-types';

import { Colors } from '../utils';
import { MultibarToggleStyles } from './Styles';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const DEFAULT_TOGGLE_SIZE = 80;
const DEFAULT_ACTION_SIZE = 40;
const DEFAULT_TOGGLE_ANIMATION_DURATION = 300;
const DEFAULT_ACTION_STAGING_DURATION = 100;
const DEFAULT_ACTION_ANIMATION_DURATION = 200;
const DEFAULT_NAVIGATION_DELAY = 500;
const DEFAULT_EXPANDING_ANGLE = 135;
const DEFAULT_OVERLAY_ACTIVE = false;

const Styles = MultibarToggleStyles;

class MultiBarToggle extends Component {
  activation = new Animated.Value(0);

  state = {
    measured: false,
    active: false
  };

  actionPressed = (route) => {
    this.togglePressed();

    const {
      actionVibration,
      navigationDelay
    } = this.props;

    actionVibration && Vibration.vibrate();

    if (route.routeName) {
      setTimeout(() => this.props.navigation.navigate({
        routeName: route.routeName,
        params: route.params
      }), navigationDelay);
    }

    route.onPress && route.onPress();
  };

  togglePressed = () => {
    const {
      routes,
      toggleVibration,
      toggleAnimationDuration,
      actionAnimationDuration,
      actionStagingDuration,
      animateIcon
    } = this.props;

    if (this.state.active) {
      this.setState({ active: false });

      Animated.parallel([
        animateIcon && Animated.timing(this.activation, { toValue: 0, duration: toggleAnimationDuration }),
        Animated.stagger(actionStagingDuration, routes.map((v, i) => Animated.timing(this[`actionActivation_${(routes.length - 1) - i}`], {
          toValue: 0,
          duration: actionAnimationDuration
        })))
      ]).start();
    } else {
      this.setState({ active: true });

      Animated.parallel([
        animateIcon && Animated.timing(this.activation, { toValue: 1, duration: toggleAnimationDuration }),
        Animated.stagger(actionStagingDuration, routes.map((v, i) => Animated.timing(this[`actionActivation_${i}`], {
          toValue: 1,
          duration: actionAnimationDuration
        })))
      ]).start();
    }

    toggleVibration && Vibration.vibrate();
  };

  renderActions = () => {
    const {
      routes,
      actionSize,
      actionExpandingAngle
    } = this.props;

    const {
      active
    } = this.state;

    const STEP = actionExpandingAngle / routes.length;

    return routes.map((route, i) => {
      const offset = (STEP * (i + 1)) / DEFAULT_EXPANDING_ANGLE - 0.5;
      const angle = -90 + (DEFAULT_EXPANDING_ANGLE * offset) - (STEP / 2);
      const radius = 80;

      const x = radius * Math.cos(-angle * Math.PI / 180);
      const y = radius * Math.sin(-angle * Math.PI / 180);

      const activationScale = this[`actionActivation_${i}`].interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0, 1]
      });

      const activationPositionX = this[`actionActivation_${i}`].interpolate({
        inputRange: [0, 1],
        outputRange: [0, x]
      });

      const activationPositionY = this[`actionActivation_${i}`].interpolate({
        inputRange: [0, 1],
        outputRange: [0, y]
      });

      return (
        <Animated.View
          key={`action_${i}`}
          style={[Styles.actionContainer, {
            marginLeft: -actionSize / 2,
            left: activationPositionX,
            bottom: activationPositionY,
            transform: [
              { scale: activationScale }
            ]
          }]}
        >
          <AnimatedTouchable
            style={{
              width: actionSize,
              height: actionSize,
              borderRadius: actionSize / 2,
              backgroundColor: route.color
            }}
            onPress={() => this.actionPressed(route)}
          >
            <View
              pointerEvents="box-none"
              style={Styles.actionContent}
            >
              {route.icon}
            </View>
          </AnimatedTouchable>
          {route.buttonlabel && active && (
            <Text style={Styles.actionContentLabel}>
              {route.buttonlabel}
            </Text>
          )}
        </Animated.View>
      );
    });
  };

  /**
   * Create animation values for each action.
   */
  makeActivations = (routes) => {
    routes.forEach((v, i) => this[`actionActivation_${i}`] = new Animated.Value(0));
    this.setState({ measured: true });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.routes !== this.props.routes) {
      this.makeActivations(nextProps.routes);
    }
  }

  componentDidMount() {
    this.makeActivations(this.props.routes);
  }

  render() {
    const {
      icon,
      toggleColor,
      toggleContainerStyle,
      toggleSize,
      showOverlay
    } = this.props;

    const {
      active,
      measured
    } = this.state;

    const activationRotate = this.activation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '135deg']
    });

    const activationScale = this.activation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 1.25, 1]
    });

    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

    return (
      <View
        pointerEvents="box-none"
        style={toggleContainerStyle}
      >
        {active && showOverlay && (
          <TouchableWithoutFeedback onPress={this.togglePressed}>
            <View style={Styles.overlayActive}/>
          </TouchableWithoutFeedback>
        )}
        {measured && (
          <View style={Styles.actionsWrapper}>
            {this.renderActions()}
          </View>
        )}
        <AnimatedTouchable
          activeOpacity={1}
          onPress={this.togglePressed}
        >
          <Animated.View style={[Styles.toggleButton, {
            transform: [
              { rotate: activationRotate },
              { scale: activationScale }
            ],
            width: toggleSize,
            height: toggleSize,
            borderRadius: toggleSize / 2,
            backgroundColor: toggleColor
          }]}>
            {icon}
          </Animated.View>
        </AnimatedTouchable>
      </View>
    );
  }
}

MultiBarToggle.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape({
    routeName: PropTypes.string,
    color: PropTypes.string,
    icon: PropTypes.node,
    buttonlabel: PropTypes.string,
    params: PropTypes.object
  })),
  actionSize: PropTypes.number,
  actionVibration: PropTypes.bool,
  actionExpandingAngle: PropTypes.number,
  toggleVibration: PropTypes.bool,
  showOverlay: PropTypes.bool,
  toggleContainerStyle: PropTypes.object,
  toggleColor: PropTypes.string,
  toggleSize: PropTypes.number,
  toggleAnimationDuration: PropTypes.number,
  actionAnimationDuration: PropTypes.number,
  actionStagingDuration: PropTypes.number,
  navigationDelay: PropTypes.number,
  icon: PropTypes.node,
  animateIcon: PropTypes.bool
};

MultiBarToggle.defaultProps = {
  routes: [],
  actionSize: DEFAULT_ACTION_SIZE,
  actionExpandingAngle: DEFAULT_EXPANDING_ANGLE,
  showOverlay: DEFAULT_OVERLAY_ACTIVE,
  toggleContainerStyle: Styles.container,
  toggleColor: Colors.toggleColor,
  toggleSize: DEFAULT_TOGGLE_SIZE,
  navigationDelay: DEFAULT_NAVIGATION_DELAY,
  toggleAnimationDuration: DEFAULT_TOGGLE_ANIMATION_DURATION,
  actionAnimationDuration: DEFAULT_ACTION_ANIMATION_DURATION,
  actionStagingDuration: DEFAULT_ACTION_STAGING_DURATION,
  animateIcon: true
};

export { MultiBarToggle };