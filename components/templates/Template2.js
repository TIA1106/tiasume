import React from 'react';

const Template2 = ({ resume }) => {
  const { profile, experience, education, skills, projects } = resume;

  return (
    <div
      id="resume-preview"
      className="resume template-2 w-[800px] mx-auto bg-white text-black px-10 py-8 font-serif space-y-6 tracking-wide"
    >
      {/* Name + Role */}
      <div>
        <h1 className="text-3xl font-bold uppercase">{profile?.name || "Your Name"}</h1>
        <p className="text-sm font-medium text-gray-600">{profile?.role || "Your Role"}</p>
        <p className="text-xs text-gray-500">{profile?.contact || "email@example.com"}</p>
      </div>

      {/* Summary */}
      {profile?.summary && (
        <div>
          <h2 className="text-base font-semibold border-b border-gray-400 pb-1 uppercase">Summary</h2>
          <p className="text-sm mt-1 text-gray-700">{profile.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <div>
          <h2 className="text-base font-semibold border-b border-gray-400 pb-1 uppercase">Experience</h2>
          <div className="space-y-3 mt-2">
            {experience.map((exp, idx) => (
              <div key={idx}>
                <p className="text-sm font-medium">{exp.role} at {exp.company}</p>
                <p className="text-xs text-gray-500 italic">{exp.start} – {exp.end}</p>
                <ul className="list-disc list-inside text-sm ml-4 text-gray-700">
                  {exp.description.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <div>
          <h2 className="text-base font-semibold border-b border-gray-400 pb-1 uppercase">Projects</h2>
          <div className="space-y-2 mt-2">
            {projects.map((proj, i) => (
              <div key={i}>
                <p className="text-sm font-medium">{proj.name}</p>
                <p className="text-xs text-blue-600">{proj.link}</p>
                <p className="text-sm text-gray-700">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <div>
          <h2 className="text-base font-semibold border-b border-gray-400 pb-1 uppercase">Education</h2>
          <div className="space-y-1 mt-2">
            {education.map((edu, i) => (
              <div key={i}>
                <p className="text-sm">{edu.degree} — {edu.institution}</p>
                <p className="text-xs text-gray-500 italic">{edu.start} – {edu.end}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <div>
          <h2 className="text-base font-semibold border-b border-gray-400 pb-1 uppercase">Skills</h2>
          <p className="text-sm text-gray-700">{skills.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default Template2;