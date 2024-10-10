import Image from "next/image";

const BackgroundImage = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
      <Image
        src="/space.jpg"
        alt="Space Background"
        layout="fill"
        objectFit="cover"
        className="w-full h-full filter dark:sepia"
        priority
      />
    </div>
  );
};

export default BackgroundImage;
