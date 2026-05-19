import { Link } from 'react-router-dom';
export default function NotFound(){return(
  <div className="text-center py-32">
    <h1 className="h-display text-7xl">404</h1>
    <p className="text-white/60 mt-2">Page not found</p>
    <Link to="/" className="btn-primary mt-6 inline-flex">Go home</Link>
  </div>
);}
