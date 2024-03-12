import MobileNav from "@/components/shared/MobileNav";
import Sidebar from "@/components/shared/Sidebar";


const DashboardLayout = ({ 
    children 
} : {
    children: React.ReactNode;
}) => {
    return (
        <div className="min-h-screen relative">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
                <Sidebar />
            </div>
            <main className="md:pl-72 mt-10">
                <MobileNav />
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout
