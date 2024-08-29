import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
         <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50 ">
            <Navbar/>
        </div>
      {/* Sidebar for larger screens */}
      <div className="hidden md:flex h-full w-56 fixed flex-col inset-y-0 z-50 bg-slate-100">
       
        <Sidebar />
      </div>

      {/* Main content area */}
      <main className="md:pl-56 pt-[80px] ">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
