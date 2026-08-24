import { Award, Share2 } from "lucide-react";
import {FaLinkedin} from 'react-icons/fa';

export function Certificate() {
  return (
    <section className="py-12 border-t border-white/5">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex p-3 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <Award size={32} className="text-purple-400" />
          </div>

          <h2 className="section-title">Earn a Completion Certificate</h2>

          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            After completing this course, you'll receive a certificate of
            completion that serves as proof of your achievement, showcasing your
            expertise, and commitment to professional development. You can
            easily share this certificate on your LinkedIn profile to highlight
            your new skills and demonstrate continuous learning to potential
            employers and professional connections.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0a66c2] hover:bg-[#0a66c2]/90 transition font-medium">
              <FaLinkedin size={18} />
              Share on LinkedIn
            </button>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition">
              <Share2 size={18} />
              Share Certificate
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
