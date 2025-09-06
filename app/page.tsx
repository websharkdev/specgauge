import { BChart, BHero, BSlider, BWhyUs, BForm } from "./(components)";

export default function Home() {
  return (
    <div className="w-full h-full relative flex flex-col" id="example" >
      <BHero />
      <BChart />
      <BSlider />
      <BWhyUs />
      <BForm />
    </div>
  );
}
