import Image from "next/image";
import NoData from "../../../public/NoData.svg";
import StudySetCard from "@/components/StudySetCard";
import { Settings } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";

const Dashboard = async () => {
  const hasExistingSets = true;

  const currUser = await getCurrentUser();

  return (
    <div className="h-screen overflow-hidden">
      <nav className="flex mb-6 p-8 justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">🧠</span>
            </div>
            <span className="text-2xl font-bold text-indigo-500">
              BrainBoost
            </span>
          </div>
        </div>

        <div>
          <Settings className="w-8 h-8" />
        </div>
      </nav>
      {/* <Sidebar currentPath='/home'/> */}
      <main className="flex flex-col min-h-screen overflow-hidden gap-y-4 px-20">
        <div>
          <h1 className="text-indigo-500 md:text-xl lg:text-3xl font-bold">Welcome, {currUser?.name}👋</h1>
          <p className="font-medium md:text-lg lg:text-xl text-gray-500">
            Let&apos;s Get You Ready to Learn
          </p>
        </div>

        {hasExistingSets === false ? (
          <div className="flex flex-col flex-1 items-center justify-center">
            <Image src={NoData} alt="No Data Image" className="h-auto w-72" />
            <p className="text-lg mt-7 text-gray-600">You Have No Sets</p>

            <button className="mt-5 bg-indigo-500 text-white p-3 rounded-xl w-72 hover:cursor-pointer">
              Create Set
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-4">
            <StudySetCard
              title="AP CS A: Unit 7 - ArrayList"
              createdAt="Feb 12th, 2025"
              description="Deep dive into dynamic arrays and iteration methods."
              subject="Computer Science"
            />
            <StudySetCard
              title="AP Calc BC: Integration Techniques"
              createdAt="Mar 5th, 2025"
              description="Review of integration by parts and partial fractions."
              subject="Math"
            />
            <StudySetCard
              title="AP US History: The Gilded Age"
              createdAt="Nov 18th, 2024"
              description="Key terms regarding industrialization and labor unions."
              subject="History"
            />
            <StudySetCard
              title="AP US History: The Gilded Age"
              createdAt="Nov 18th, 2024"
              description="Key terms regarding industrialization and labor unions."
              subject="History"
            />
          </div>
        )}
      </main>

      {/* <main className='ml-64 p-8 h-screen'>
        <div>
            <h1 className='text-indigo-500 text-3xl font-bold'>Hi Kenneth 👋</h1>
            <p className='text-lg font-semibold'>Let&apos;s Get You Ready to Learn</p>
        </div>

        <div className='flex flex-1 flex-col items-center justify-center'>
            <Image src={NoData} alt={"No Data Image"} className="w-72 h-auto"/>
        </div>
      </main> */}
    </div>
  );
};

export default Dashboard;
