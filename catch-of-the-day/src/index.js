// This is importing is from package.json
import React from 'react';

// This means just cherry pick render from everything available in react-dom
import { render } from 'react-dom'

// We need to import Router
import Router from './components/Router'

// Here's how you import css
import './css/style.css'

// render() seems to take two arguments here:
// 1. The component to render (i.e. StorePicker)
// 2. The place to render it (i.e. #main in index.html)
// Note: this also seems to be different to the render() used in components
render(<Router />, document.querySelector('#main'));
