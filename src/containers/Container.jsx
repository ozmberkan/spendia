const Container = ({ children }) => {
  return (
    <div className="flex h-screen flex-grow bg-main-bg bg-no-repeat bg-center bg-cover p-12">
      {children}
    </div>
  );
};

export default Container;
