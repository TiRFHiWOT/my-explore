import Image from "next/image";

const Layout = ({ children }: any) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300 dark:bg-gray-950 overflow-hidden relative">
      <div
        className="absolute inset-0 bg-center bg-cover bg-fixed before:absolute before:inset-0 dark:before:inset-0 before:bg-gray-100/80 dark:before:bg-gray-900/80 z-0"
        style={{
          backgroundImage: `url('/pngegg (9).png')`,
        }}
      />
      {children}
    </div>
  );
};

export default Layout;
