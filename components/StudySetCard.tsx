import { SubjectStyles }  from "@/utils/Subjects";

interface SetData {
    title: string, 
    createdAt: string, 
    description: string, 
    subject: string, 
};

const StudySetCard = ({
 title, 
 createdAt, 
 description, 
 subject 
}: SetData) => {
    const style = SubjectStyles[subject as keyof typeof SubjectStyles] || {
        emoji: "📚",
        bg: "bg-gray-100",
        text: "text-gray-700"
    };
  return (
    <div className="flex flex-col border border-gray-300 rounded-2xl p-4 hover:bg-slate-100 hover:cursor-pointer">
      <div className="flex flex-row justify-between items-center">
        <h2 className={`font-semibold md:text-md lg:text-xl text-gray-700`}>{title}</h2>
         <div>
            <div className={`w-10 h-10 ${style.bg} rounded-lg flex items-center justify-center`}>
              <span className="text-white font-bold text-lg">{style.emoji}</span>
            </div>
        </div>
      </div>
      <div className={`py-1 px-2 text-sm rounded-xl w-fit ${style.bg}`}>
        <p>{subject}</p>
      </div>
      <p className="mt-2 text-gray-600">Created on {createdAt}</p>
      <p className="mt-1">{description}</p>
    </div>
  );
};

export default StudySetCard;
