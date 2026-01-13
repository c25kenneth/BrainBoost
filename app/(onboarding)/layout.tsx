import Link from "next/link";

const OnboardingLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-purple-100">
      <nav className="border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
               <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                 <span className="text-white font-bold text-lg">🧠</span>
               </div>
               <span className="text-xl font-bold text-indigo-500">
                 BrainBoost
               </span>
            </Link>
        </div>
      </nav>
      
      <main className="flex-1">{children}</main>
    </div>
  )
}

export default OnboardingLayout




// export default function OnboardingLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Navbar */}
//       <nav className="border-b border-gray-200 bg-white">
//         <div className="container mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             {/* Logo/Brand */}
//             <Link href="/" className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold text-lg">B</span>
//               </div>
//               <span className="text-xl font-bold text-zinc-900">
//                 BrainBoost
//               </span>
//             </Link>

//             {/* Navigation Links */}
//             <div className="flex items-center gap-6">
//               <Link
//                 href="/sign-in"
//                 className="text-gray-600 hover:text-zinc-900 transition font-medium"
//               >
//                 Sign In
//               </Link>
//               <Link
//                 href="/sign-up"
//                 className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 transition"
//               >
//                 Sign Up
//               </Link>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Page Content */}
//       <main className="flex-1">{children}</main>
//     </div>
//   );
// }
