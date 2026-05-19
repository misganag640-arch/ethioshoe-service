export default function Services(){
  const items=['Deep Cleaning','Whitening','Sneaker Restoration','Polishing','Fast Cleaning','Luxury Shoe Care','Delivery Service'];
  return (
    <div className="max-w-5xl mx-auto px-6 py-14">
      <h1 className="h-display text-4xl font-bold">All Services</h1>
      <div className="grid sm:grid-cols-2 gap-4 mt-8">
        {items.map(s=> <div key={s} className="card">{s}</div>)}
      </div>
    </div>
  );
}
