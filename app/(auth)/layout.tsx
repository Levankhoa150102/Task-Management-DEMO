import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login and Register",
    description: "Join my app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body>
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 via-blue-500 to-blue-300">
                    <div className="w-[350px] bg-white p-8 rounded-lg shadow-md dark:bg-[#333643]">
                        {children}
                    </div>
                </div>

            </body>
        </html>
    );
}
