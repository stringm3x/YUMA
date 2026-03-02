import BestSelling from "./Home/BestSellingClient";
import Design from "./Home/Design";
import DropServer from "./Home/DropServer";
import Hero from "./Home/Hero";
import Intro from "./Home/Intro";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Intro />
      <BestSelling />
      <DropServer />
      <Design />
    </div>
  );
}
