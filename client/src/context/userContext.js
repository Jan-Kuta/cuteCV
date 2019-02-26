import { createContext } from 'react';

const Context = createContext({
    user: null,
    userErrorMessage: null
})

export default Context