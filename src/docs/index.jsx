import React from "react";
import { render } from "react-dom";
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import Sidebar from './sideBar';
import BasicUsage from './basicUsage';
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
          <section className="container-fluid" style={{marginTop:120}}>
            {
              Routes.map(route => (
                <Switch>
                  {route.routes.map(r => (
                    <Route path={`/${route.path}/${r.pathname}`} component={r.component} />
                  ))}
                </Switch>
              ))
            }
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