import React from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';

import {Colors} from '../utils';

const MultiBar = ({style, navigation, activeTintColor, inactiveTintColor, renderIcon, jumpTo}) => {
    const {
        index,
        routes
    } = navigation.state;

    return (
        <SafeAreaView
            pointerEvents="box-none"
            style={Styles.container}
            forceInset={{
                top: 'never',
                bottom: 'always',
            }}
        >
            <SafeAreaView
                style={[Styles.fakeBackground, style]}
                forceInset={{
                    top: 'never',
                    bottom: 'always',
                }}
            >
                <View style={{height: 49}}/>
            </SafeAreaView>
            <View
                pointerEvents="box-none"
                style={Styles.content}
            >
                {
                    routes.map((route, idx) => {
                        const focused = index === idx;

                        if (!route.params || !route.params.navigationDisabled) {
                            return (
                                <TabIcon
                                    key={route.key}
                                    route={route}
                                    renderIcon={renderIcon}
                                    focused={focused}
                                    activeTintColor={activeTintColor}
                                    inactiveTintColor={inactiveTintColor}
                                    onPress={() => (!route.params || !route.params.navigationDisabled) && jumpTo(route.key)}
                                />
                            );
                        }

                        const Icon = renderIcon({
                            route,
                            focused,
                            tintColor: focused
                                ? activeTintColor
                                : inactiveTintColor
                        });

                        return {
                            ...Icon,
                            key: 'simple'
                        };
                    })
                }
            </View>
        </SafeAreaView>
    );
};

MultiBar.propTypes = {
    style: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    renderIcon: PropTypes.func.isRequired,
    jumpTo: PropTypes.func.isRequired,
    activeTintColor: PropTypes.string,
    inactiveTintColor: PropTypes.string,
};

MultiBar.defaultProps = {
    activeTintColor: Colors.activeTintColor,
    inactiveTintColor: Colors.inactiveTintColor
};

const TabIcon = ({route, renderIcon, focused, activeTintColor, inactiveTintColor, onPress}) => (
    <TouchableOpacity
        style={Styles.tabStyle}
        onPress={() => onPress && onPress()}
    >
        {
            renderIcon({
                route,
                focused,
                tintColor: focused
                    ? activeTintColor
                    : inactiveTintColor
            })
        }
    </TouchableOpacity>
);

TabIcon.propTypes = {
    route: PropTypes.object.isRequired,
    renderIcon: PropTypes.func.isRequired,
    activeTintColor: PropTypes.string.isRequired,
    inactiveTintColor: PropTypes.string.isRequired,
    focused: PropTypes.bool,
    onPress: PropTypes.func
};

TabIcon.defaultProps = {
    focused: false
};

const Styles = {
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'flex-end',
        minHeight: 160
    },
    fakeBackground: {
        position: 'absolute',
        width: '100%'
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    tabStyle: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
};

export {MultiBar};