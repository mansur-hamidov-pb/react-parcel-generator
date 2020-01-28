import * as React from 'react';

import "./App.scss";

const App: React.FC = () => {
    return (
        <div className="app">
            <h1 className="app__heading">Welcome to 
                <span className="app__heading__appName"> <%= appName %></span>
            </h1>
        </div>
    )
}

export default App;