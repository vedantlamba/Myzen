import { ToastProvider } from "@/components/providers/toast-providers";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>
        <ToastProvider />
      </div>
      <div className="h-screen ">
        <div className="h-[80px] md:pl-56 fixed inset-0 w-full z-50">
          <Navbar />
        </div>
        <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
          <Sidebar />
        </div>
        <main className="md:pl-56 h-screen pt-[80px]">{children}</main>;
      </div>
    </>
  );
};
export default DashboardLayout;
