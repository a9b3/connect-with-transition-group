### connect-with-transition-group

Note: if you want to use it with ReactTransitionGroup and connect this will
work, however I suggest just going with this [react-motion](https://github.com/chenglou/react-motion)
instead of trying to make ReactTransitionGroup work.

react-redux/connect returns a copy of the component you pass in, so it does not
play well with ReactTransitionGroup because that modifies the children directly,
which is the copy that connect makes. All this does is calls the lifecycle
functions on the copy that connect returns.

```
npm install --save connect-with-transition-group
```

```
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import connectWithTransitionGroup from 'connect-with-transition-group';

class Foo extends Component {
  // ...

  componentWillEnter(cb) {
    // this works!
    cb();
  }

  // ...
}

export default connectWithTransitionGroup(connect(
  mapStateToProps,
  null,
  null,
  // IMPORTANT: must pass this flag to react-redux/connect
  {
    withRef: true,
  }
)(Foo));
```

```
import React, { Component, PropTypes } from 'react';
import Foo from './Foo.js';

class Bar extends Component {
  render() {
    return <ReactTransitionGroup>
      <Foo />
    </ReactTransitionGroup>;
  }
}
```
