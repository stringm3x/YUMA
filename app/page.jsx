import BestSelling from "./Home/BestSelling";
import Design from "./Home/Design";
import Drop from "./Home/Drop";
import Hero from "./Home/Hero";
import Intro from "./Home/Intro";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Intro />
      <BestSelling />
      <Drop />
      <Design />
    </div>
  );
}
