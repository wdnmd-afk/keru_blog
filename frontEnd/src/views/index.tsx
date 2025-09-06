import { lazy } from 'react'
import Home from './Home/index.tsx'
const LazyComponents = {
    Home: lazy(() => import('./Home/index.tsx')),
    NotFound: lazy(() => import('./systemPages/NotFound.tsx')),
}

const staticComponents = {
    Login: Home,
}

export { LazyComponents, staticComponents }
