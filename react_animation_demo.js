class Routes extends React.Component {
  render () {
    const { location } = this.props;
    return (
      <TransitionGroup className={'router-wrapper'}>
        <CSSTransition
          classNames={'fade'}
          appear={true}
          key={location.pathname}
          timeout={300}
          unmountOnExit={true}
        >
          <Switch location={location}>
            {routeData.map(({ path, component, exact }) => (
              <Route key={path} path={path} component={component} exact={exact} />
            ))}
            <Route component={NotFound} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

/* 动画相关样式 */
.fade-enter, .fade-appear {
  opacity: 0;
}

.fade-enter.fade-enter-active, .fade-appear.fade-appear-active {
  opacity: 1;
  transition: opacity 300ms ease-in;
}

.fade-exit {
  opacity: 1;
}

.fade-exit.fade-exit-active {
  opacity: 0;
}
