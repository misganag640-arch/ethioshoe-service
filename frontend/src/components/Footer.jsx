export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 px-6 py-10 text-sm text-white/60">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="h-display text-lg text-white">EthioShoe Clean</h3>
          <p className="mt-2">Premium shoe care across Addis Ababa.</p>
        </div>
        <div>
          <h4 className="text-white mb-2">Contact</h4>
          <p>📍 Bole, Addis Ababa</p>
          <p>📞 +251 911 000 000</p>
          <p>✉ hello@ethioshoe.et</p>
        </div>
        <div>
          <h4 className="text-white mb-2">Payments</h4>
          <p>Telebirr · Chapa · CBE Birr · Cash on Delivery</p>
        </div>
      </div>
      <p className="text-center mt-8">© {new Date().getFullYear()} EthioShoe Clean. Made in Ethiopia 🇪🇹</p>
    </footer>
  );
}
