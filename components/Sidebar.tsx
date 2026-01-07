import {
  CreditCardIcon,
  FolderCheck,
  HomeIcon,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

const Sidebar = ({ currentPath = "/" }: { currentPath: string }) => {
  const pages = [
    { label: "Home", icon: <HomeIcon />, route: "/home" },
    { label: "Chat", icon: <MessageCircle />, route: "/chat" },
    { label: "Flashcard", icon: <CreditCardIcon />, route: "/flashcard" },
    { label: "Quiz", icon: <FolderCheck />, route: "/quiz" },
  ];
  return (
    <div className="min-h-screen flex flex-col fixed left-0 top-0 p-6 bg-slate-50 w-64 gap-8 z-10">
      <div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">🧠</span>
          </div>
          <span className="text-xl font-bold text-indigo-500">BrainBoost</span>
        </div>
      </div>

      <div>
        {pages.map((item, key) => {
          const isActive = item.route == currentPath; 
          return (
            <Link key={key} href={item.route}>
              <div className={`flex items-center gap-x-2 py-6 px-3 font-semibold hover:cursor-pointer rounded-xl ${isActive ? "bg-indigo-500 text-white" : "bg-slate-50"}`}>
                {item.icon}
                <p className="text-md">{item.label}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="flex-grow"></div>

      <div className="flex">
        <p>c25Kenneth</p>
      </div>
    </div>
  );
};

export default Sidebar;
