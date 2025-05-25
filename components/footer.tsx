export const Footer = () => {
  return (
    <footer className="absolute bottom-0 left-0 w-full border bg-neutral-300 py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center text-sm text-black space-y-1">
        <div className="font-semibold text-base">Myzen</div>
        <div>© {new Date().getFullYear()} MasterClass</div>
        <div>Secured with SSL</div>
      </div>
    </footer>
  );
};
