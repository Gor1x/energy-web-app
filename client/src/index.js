import { React, useState, useEffect } from 'react'
import * as ReactDOM from 'react-dom';

const App = () => {
    const [message, setMessage]=useState('')
    return (
        <div className="app">
            {message}
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'));