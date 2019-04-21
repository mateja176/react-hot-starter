import {
  createMuiTheme,
  Divider,
  MuiThemeProvider,
  Typography,
} from '@material-ui/core';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import React, { FC } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { compose } from 'recompose';
import Decrement from './Decrement';
import Increment from './Increment';
import Layout from './Layout';
import { selectCount, selectTheme, State } from './store/reducer';
import {
  Count,
  CreateDecrementByAction,
  createDecrementByAction,
  CreateIncrementAction,
  createIncrementAction,
} from './store/slices/count';

export interface AppProps {
  count: Count;
  increment: CreateIncrementAction;
  decrementBy: CreateDecrementByAction;
  theme: ThemeOptions;
}

const App: FC<AppProps> = ({ count, increment, decrementBy, theme }) => (
  <MuiThemeProvider
    theme={createMuiTheme({
      ...theme,
      typography: {
        useNextVariants: true,
      },
    })}
  >
    <Layout>
      <Typography variant="h1">Count: {count}</Typography>
      <br />
      <Divider />
      <br />
      <Switch>
        <Route
          path="/increment"
          component={() => <Increment increment={increment} />}
        />
        <Route
          path="/decrement"
          component={() => <Decrement decrementBy={decrementBy} />}
        />
      </Switch>
    </Layout>
  </MuiThemeProvider>
);

export const mapStateToProps = (state: State) => ({
  count: selectCount(state),
  theme: selectTheme(state),
});

export const mapDispatchToProps = {
  increment: createIncrementAction,
  decrementBy: createDecrementByAction,
};

export default compose<AppProps, {}>(
  hot(module),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(App);
