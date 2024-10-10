import Social from "./social";
import Button from "./button";
import Para from "./para";
import Heading from "./heading";

const Text = () => {
  return (
    <section>
      <div className="flex flex-col justify-center items-start space-y-6 w-full max-w-lg">
        <Heading />
        <Para />
        <Button />
        <Social />
      </div>
    </section>
  );
};

export default Text;
