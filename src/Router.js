import React, {Component} from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginView from './components/LoginView';
import TaskList from './components/TaskList';
import TaskCreate from './components/TaskCreate';
import TaskEdit from './components/TaskEdit';
import LiteMapView from './components/LiteMapView';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }} navigationBarStyle={{backgroundColor: 'red'}}>
      <Scene key="auth">
        <Scene key="login" component={LoginView} title="" />
      </Scene>

      <Scene key="main">
        <Scene
          key="taskList"
          component={TaskList}
          title="Global Sécurité"
          initial
        />
        <Scene key="taskCreate" component={TaskCreate} title="Create Task" />
        <Scene key="taskEdit" component={TaskEdit} title="" />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
