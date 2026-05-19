import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext.jsx';

const services = [
  { icon:'🧼', title:'Deep Cleaning', desc:'Restore shoes to factory fresh.' },
  { icon:'✨', title:'Whitening', desc:'Bring back the original white.' },
  { icon:'👟', title:'Sneaker Restoration', desc:'Sole, midsole, upper revival.' },
  { icon:'💎', title:'Luxury Care', desc:'Leather, suede, premium brands.' },
  { icon:'⚡', title:'Fast Cleaning', desc:'Same-day turnaround.' },
  { icon:'🚚', title:'Pickup & Delivery', desc:'Free in selected sub-cities.' },
];
const faqs = [
  ['How long does cleaning take?','24–48 hours for standard, same-day for Fast service.'],
  ['Do you pick up from home?','Yes, free pickup in Bole, Kirkos, Yeka and more.'],
  ['Which payments do you accept?','Telebirr, Chapa, CBE Birr, and Cash on Delivery.'],
];

export default function Landing() {
  const { t } = useLang();
  return (
    <>
      <section className="relative overflow-hidden bg-hero">
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-28 text-center">
          <motion.h1 initial={{y:40,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.7}}
            className="h-display text-5xl md:text-7xl font-extrabold leading-[1.05]">
            {t('hero')}<br/>
            <span className="bg-gradient-to-r from-ethio-green via-ethio-yellow to-ethio-red bg-clip-text text-transparent">
              Made in Ethiopia.
            </span>
          </motion.h1>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.3}}
            className="mt-6 text-white/70 max-w-2xl mx-auto">
            Deep cleaning, whitening, sneaker restoration and luxury care — picked up from your door across Addis Ababa.
          </motion.p>
          <div className="mt-8 flex justify-center gap-3 flex-wrap">
            <Link to="/order" className="btn-primary">Order Now →</Link>
            <Link to="/services" className="btn glass">Our Services</Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="h-display text-3xl font-bold mb-8">Our Services</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s,i)=>(
            <motion.div key={s.title} initial={{y:20,opacity:0}} whileInView={{y:0,opacity:1}} viewport={{once:true}} transition={{delay:i*0.05}} className="card">
              <div className="text-3xl">{s.icon}</div>
              <h3 className="mt-3 font-semibold text-lg">{s.title}</h3>
              <p className="text-white/60 text-sm mt-1">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="h-display text-3xl font-bold mb-8">Before & After</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[1,2,3,4].map(i=>(
            <div key={i} className="aspect-square glass overflow-hidden grid place-items-center text-white/30 text-sm">Photo {i}</div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="h-display text-3xl font-bold mb-8">Pricing</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[['Basic',250,'Standard deep cleaning']
           ,['Pro',450,'Whitening + polishing + pickup']
           ,['Luxury',800,'Leather, suede, premium brands']].map(([t,p,d])=>(
            <div key={t} className="card flex flex-col">
              <h3 className="h-display text-xl">{t}</h3>
              <p className="text-4xl font-extrabold mt-3">{p} <span className="text-base font-medium text-white/50">ETB</span></p>
              <p className="text-white/60 mt-2">{d}</p>
              <Link to="/order" className="btn-accent mt-6">Order {t}</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="h-display text-3xl font-bold mb-6">FAQ</h2>
        <div className="space-y-3">
          {faqs.map(([q,a])=>(
            <details key={q} className="glass p-4 group">
              <summary className="cursor-pointer font-semibold">{q}</summary>
              <p className="mt-2 text-white/70">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="h-display text-3xl font-bold mb-6">Find Us</h2>
        <div className="aspect-video rounded-2xl overflow-hidden">
          <iframe title="map" className="w-full h-full" loading="lazy" src="https://www.google.com/maps?q=Bole,+Addis+Ababa&output=embed"/>
        </div>
      </section>
    </>
  );
}
