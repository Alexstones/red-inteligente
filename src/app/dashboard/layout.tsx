import Sidebar from "@/components/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen neural-bg relative">
            <Sidebar />
            <main className="flex-1 overflow-x-hidden relative">
                <div className="max-w-[1600px] mx-auto p-8 lg:p-12 relative z-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
