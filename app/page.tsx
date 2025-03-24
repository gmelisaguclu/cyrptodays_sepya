import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Partners from "@/components/Partners";
import Speakers from "@/components/Speakers";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Speakers />
      <Partners />
      <FAQ />
    </main>
  );
}
