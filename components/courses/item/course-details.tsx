import { Calendar, Users, BookOpen, Zap } from "lucide-react";

export function CourseDetails() {
  const details = [
    {
      icon: Calendar,
      label: "Published",
      value: "July 30, 2026",
    },
    {
      icon: Users,
      label: "Instructor",
      value: "Adam Rackis",
    },
    {
      icon: BookOpen,
      label: "Level",
      value: "Advanced",
    },
    {
      icon: Zap,
      label: "Duration",
      value: "4h 28m",
    },
  ];

  return (
    <section className="py-12 border-t border-white/5">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="section-title">Course Details</h2>
            <div className="grid grid-cols-2 gap-4">
              {details.map((item) => (
                <div
                  key={item.label}
                  className="p-4 rounded-lg bg-white/5 border border-white/5"
                >
                  <item.icon size={18} className="text-purple-400 mb-2" />
                  <p className="text-xs text-gray-500">{item.label}</p>
                  <p className="text-sm font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="section-title">Learn Straight from the Experts</h2>
            <p className="text-gray-300 mb-4">Who Shape the Modern Web</p>
            <p className="text-2xl font-bold mb-4">
              Your Path to Senior Developer and Beyond
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">•</span>
                <span>300+ In-depth courses</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">•</span>
                <span>24 Learning Paths</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">•</span>
                <span>Industry Leading Experts</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">•</span>
                <span>Live Interactive Workshops</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
