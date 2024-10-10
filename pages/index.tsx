import About from "@/pages/about";
import Features from "@/pages/features";
import Navbar from "@/components/Header/navbar";
import Hero from "@/pages/hero";
import Testimonials from "@/pages/testimonials";
import Footer from "@/components/Footer/page";
import Contact from "./contact";
import Timeline from "./timeline";
import TeamSection from "./team";

const Page = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <About />
      <Timeline />
      <TeamSection />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
};

export default Page;
