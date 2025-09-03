import { BChart, BHero } from "./(components)";

export default function Home() {
  return (
    <div className="w-full h-full relative flex flex-col">
      <BHero />
      <BChart />
    </div>
  );
}
