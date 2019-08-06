import { Dimensions } from 'react-native';

import { Colors } from '../utils/Colors';

const { width, height } = Dimensions.get('window');

export const MultibarStyles = {
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
  }
};

export const MultibarToggleStyles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  toggleButton: {
    top: 15,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  toggleIcon: {
    fontSize: 30,
    color: Colors.white
  },
  actionsWrapper: {
    position: 'absolute',
    bottom: 0
  },
  actionContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionContentLabel: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    fontSize: 9,
    textAlign: 'center',
    color: Colors.white
  },
  overlayActive: {
    position: 'absolute',
    height: height * 2,
    width: width * 2,
    backgroundColor: 'rgba(0,0,0,0.5)',
    bottom: '-150%'
  }
};

export const TabIconStyles = {
  tabStyle: {
    flex: 1,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  labelStyle: {
    fontSize: 11,
    marginBottom: 1,
    marginTop: 1.5
  }
};