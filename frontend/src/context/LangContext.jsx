import { createContext, useContext, useState } from 'react';
const dict = {
  en: { home:'Home', services:'Services', order:'Order Now', track:'Track Order', login:'Login', hero:'Premium Shoe Care, Delivered.' },
  am: { home:'መነሻ', services:'አገልግሎቶች', order:'ይዘዙ', track:'ይከታተሉ', login:'ግባ', hero:'ጥራቱ የጠበቀ የጫማ እንክብካቤ።' }
};
const Ctx = createContext();
export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');
  const t = (k) => dict[lang][k] || k;
  return <Ctx.Provider value={{ lang, setLang:(l)=>{ setLang(l); localStorage.setItem('lang',l);}, t }}>{children}</Ctx.Provider>;
};
export const useLang = () => useContext(Ctx);
