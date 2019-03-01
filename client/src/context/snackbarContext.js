import { createContext } from 'react';

const Context = createContext({
    color: null,
    text: null,
    children: null,
    hideTime: null,
    showTime: null
})

export default Context