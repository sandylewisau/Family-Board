import React, { Component } from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
// import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
// import ProjectDetails from './components/projects/ProjectDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
// import {signOut} from './store/actions/authActions';
import FamilyDashboard from './components/family/FamilyDashboard';
import CreateFamily from './components/family/CreateFamily';
import CreateFamilyMember from './components/family/CreateFamilyMember';
// import CreateProject from './components/projects/CreateProject';
import AuthGuard from './components/auth/authGuard';

import Navigation from './components/layout/Navbar';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">

          <Navigation></Navigation>

          <div className="container app-body">
            <h1 className="display-2 text-center pt-3 pb-3">
              <span className="pl-3 pr-3" role="img" aria-labelledby="jsx-a11y/accessible-emoji">👨🏻‍</span>
              <span className="pl-3 pr-3" role="img" aria-labelledby="jsx-a11y/accessible-emoji">👩🏻‍</span>
              <span className="pl-3 pr-3" role="img" aria-labelledby="jsx-a11y/accessible-emoji">👧🏻</span>
              <span className="pl-3 pr-3" role="img" aria-labelledby="jsx-a11y/accessible-emoji">👦🏻‍</span>
            </h1>

            <Switch>
              <Route exact path="/" component={AuthGuard(Dashboard)} />
              <Route exact path="/family/dashboard" component={FamilyDashboard} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/family/create-family" component={CreateFamily} />
              <Route path="/family/create-family-member" component={AuthGuard(CreateFamilyMember)} />
            </Switch>


            {/* <div className="row">
              <div className="col-sm-6 portfolio-item">
                <div className="card h-100">
                  <a href="#"><img className="card-img-top" src="http://placehold.it/700x400" alt="" /></a>
                  <div className="card-body">
                    <h4 className="card-title">
                      <a href="#">Project One</a>
                    </h4>
                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 portfolio-item">
                <div className="card h-100">
                  <a href="#"><img className="card-img-top" src="http://placehold.it/700x400" alt="" /></a>
                  <div className="card-body">
                    <h4 className="card-title">
                      <a href="#">Project Two</a>
                    </h4>
                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit aliquam aperiam nulla perferendis dolor nobis numquam, rem expedita, aliquid optio, alias illum eaque. Non magni, voluptates quae, necessitatibus unde temporibus.</p>
                  </div>
                </div>
              </div>       
            </div>
 */}
          </div>



          {/* <Navbar></Navbar> */}
          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
