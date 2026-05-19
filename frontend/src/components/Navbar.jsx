import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext.jsx';
import { useLang } from '../context/LangContext.jsx';
import { FiSun, FiMoon, FiGlobe } from 'react-icons/fi';

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const { lang, setLang, t } = useLang();
  const links = [['/', t('home')],['/services', t('services')],['/order', t('order')],['/track', t('track')]];
  return (
    <motion.header initial={{y:-30,opacity:0}} animate={{y:0,opacity:1}} className="sticky top-0 z-40">
      <div className="mx-3 mt-3 glass flex items-center justify-between px-5 py-3">
        <Link to="/" className="h-display text-xl font-extrabold tracking-tight">
          <span className="text-ethio-green">Ethio</span><span className="text-ethio-yellow">Shoe</span> <span className="text-ethio-red">Clean</span>
        </Link>
        <nav className="hidden md:flex gap-6 text-sm">
          {links.map(([to,label])=>(
            <NavLink key={to} to={to} className={({isActive})=>`hover:text-ethio-yellow transition ${isActive?'text-ethio-yellow':''}`}>{label}</NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={()=>setLang(lang==='en'?'am':'en')} className="p-2 rounded-full hover:bg-white/10" title="Language"><FiGlobe/></button>
          <button onClick={toggle} className="p-2 rounded-full hover:bg-white/10" title="Theme">{theme==='dark'?<FiSun/>:<FiMoon/>}</button>
          <Link to="/login" className="btn-primary !py-2 !px-4 text-sm">{t('login')}</Link>
        </div>
      </div>
    </motion.header>
  );
}
