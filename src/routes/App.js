import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Layout } from "../components";
import { Home, UserPosts } from "../pages";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/posts" exact component={UserPosts} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
