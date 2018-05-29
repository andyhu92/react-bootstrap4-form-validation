import React from "react";
import { render } from "react-dom";
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './index.css';
import Sidebar from './sideBar';
import BasicUsage from './examples/basicUsage';
import Routes from './routes';

class Demo extends React.Component {
  state = {
    isShow: true
  }

  handleSubmit = (e, formData) => {
    e.preventDefault();
    console.log(formData);
  }

  render() {
    return (
      <Router>
        <main>
          <Sidebar />
            <section className="container-fluid" >
              <Switch>
                <Route path="/" exact component={BasicUsage}/>
                {
                  Routes.map((route,i) => (
                    <div key={i}>
                      {route.routes.map(r => (
                        <Route path={`/${route.path}/${r.pathname}`} key={r.pathname} component={r.component} />
                      ))}
                    </div>
                  ))
                }
                
              </Switch>
            </section>
        </main>
      </Router>
    );
  }
}

render(<Demo />, document.getElementById("app"));

export function initCodeSyntaxHighlight() {
  let codes = document.getElementsByTagName("code");
  for (let i = 0; i < codes.length; i++) {
    hljs.highlightBlock(codes[i]);
  }
}

export function InfoBox({children}){
  return <div className="alert alert-info mt-2">{ children }</div>
}