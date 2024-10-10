import Layout from "@/components/Layout/page";
import FuturisticAnimation from "@/components/Animations/Futurstic";
import Text from "./text";
import Grid from "./grid";
import BackgroundImage from "./backgroundImage";

export default function Home() {
  return (
    <Layout>
      <section className="relative flex flex-col pt-20 items-center justify-center min-h-screen max-h-screen w-full overflow-hidden">
        <BackgroundImage />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mx-auto space-y-8 md:space-y-0 md:space-x-12 px-4 sm:px-6 lg:px-8 text-white">
          <Text />
          <FuturisticAnimation />
        </div>
        <Grid />
      </section>
    </Layout>
  );
}
