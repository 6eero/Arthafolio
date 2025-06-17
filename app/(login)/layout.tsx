const LoginLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="bg-background h-screen w-screen flex items-center justify-center">
      {children}
    </div>
  );
};

export default LoginLayout;
