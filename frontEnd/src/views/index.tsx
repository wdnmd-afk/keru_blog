import { lazy } from 'react'
import Home from './systemPages/Home.tsx'
const LazyComponents = {
    Home: lazy(() => import('./systemPages/Home.tsx')),
    NotFound: lazy(() => import('./systemPages/NotFound.tsx')),
}

const staticComponents = {
    Login: Home,
}

export { LazyComponents, staticComponents }
