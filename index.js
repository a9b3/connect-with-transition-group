'use strict';

/**
 * Must have called react-redux/connect with the 'withRef' flag
 * ex:
 * connectWithTransitionGroup(connect(mapStateToProps, null, null, {
 *   withRef: true,
 * }));
 *
 * @param {*} connect - return from react-redux/connect
 * @returns {*} component monkey patched with special lifecycle functions
 */
function connectWithTransitionGroup(connect) {
  const willFunctions = [
    'componentWillAppear',
    'componentWillEnter',
    'componentWillLeave',
  ];

  const didFunctions = [
    'componentDidAppear',
    'componentDidEnter',
    'componentDidLeave',
  ];

  willFunctions.forEach(key => {
    connect.prototype[key] = function(cb) {
      if (this.refs.wrappedInstance[key]) {
        this.refs.wrappedInstance[key](cb);
      } else {
        cb();
      }
    }
  });

  didFunctions.forEach(key => {
    connect.prototype[key] = function() {
      if (this.refs.wrappedInstance[key]) {
        this.refs.wrappedInstance[key]();
      }
    }
  });

  return connect;
}

module.exports = connectWithTransitionGroup;
