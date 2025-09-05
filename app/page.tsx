import { BChart, BHero, BSlider, BWhyUs } from "./(components)";
import { BForm } from "./(components)/form";

export default function Home() {
  return (
    <div className="w-full h-full relative flex flex-col">
      <BHero />
      <BChart />
      <BSlider />
      <BWhyUs />
      <BForm />
    </div>
  );
}
