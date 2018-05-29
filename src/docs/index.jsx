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
                      Routes.example.routes.map(r => (
                        <Route path={`/${Routes.example.path}/${r.pathname}`} key={r.pathname} component={r.component} />
                      ))
                }
                {
                      Routes.api.routes.map(r => (
                        <Route path={`/${Routes.api.path}/${r.pathname}`} key={r.pathname} component={r.component} />
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
    if(codes[i].classList.contains("lang-javascript")) hljs.highlightBlock(codes[i]);
  }
}

export function InfoBox({children}){
  return <div className="alert alert-info mt-2">{ children }</div>
}

export function PropertiesTable ( { properties = [] }){
  return (
     <div className="col-md-12">
          <h4>Properties <small>(<span className="text-danger">*</span> indicates required property)</small></h4>
          <table className="table table-bordered table-striped">
              <thead>
                  <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Default</th>
                      <th>Description</th>
                  </tr>
              </thead>
              <tbody>
                  { properties.map(r => (
                    <tr key={r.name}>
                      <td>{ r.name } {r.required && <span className="text-danger">*</span>}</td>
                      <td>{ r.type }</td>
                      <td>{ r.default }</td>
                      <td>{ r.description }</td>
                    </tr>
                  ))}
              </tbody>
          </table>
      </div>
  )
}