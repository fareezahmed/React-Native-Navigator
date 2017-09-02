import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="main">
        <Scene
          onRight={() => Actions.employeeCreate()}
          rightTitle="Add" 
          key="employeeList" 
          component={EmployeeList} 
          title="List" 
        />
        <Scene 
          key="employeeCreate"
          title="Create Employee"
          component={EmployeeCreate}
        />
      </Scene>
      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="Please Login" />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
