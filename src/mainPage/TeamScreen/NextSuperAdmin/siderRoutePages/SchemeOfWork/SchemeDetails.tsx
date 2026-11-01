import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSchemeOfWork } from "../../../../../pages/api/schoolAPIs";

const SchemeDetails = () => {
  const navigate = useNavigate();
  const { className, subjectName, term } = useParams();
  const [schemeData, setSchemeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSchemeData = async () => {
      setLoading(true);
      try {
        const response = await fetchSchemeOfWork(className, subjectName, term);
        console.log("Fetched response:", response);

        if (Array.isArray(response.data)) {
          const sortedData = response.data.sort((a, b) => {
            const weekA = parseInt(a.weeks, 10);
            const weekB = parseInt(b.weeks, 10);

            if (isNaN(weekA)) return 1;
            if (isNaN(weekB)) return -1;

            return weekA - weekB;
          });

          setSchemeData(sortedData);
        } else {
          setSchemeData([]);
          setError("Unexpected data format.");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching scheme data.");
      } finally {
        setLoading(false);
      }
    };
    getSchemeData();
  }, [className, subjectName, term]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!schemeData.length) {
    return <p>No data found for this scheme of work.</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="w-20">
        <div
          className="text-[20px] font-semibold hover:underline transition-all duration-500 cursor-pointer w-[140px] pl-3"
          onClick={() => navigate(-1)}
        >
          Go Back
        </div>
      </div>
      {schemeData.map((weekData) => (
        <div
          key={weekData._id}
          className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-4"
        >
          <div className="p-8 border-b border-gray-300">
            <h1 className="text-4xl font-bold text-gray-800">Scheme of Work</h1>
            <p className="text-xl text-gray-600 mt-2">
              Subject: {weekData.subject} | Class: {weekData.classType}
            </p>
            <p className="text-lg text-gray-600 mt-1">Term: {term || "N/A"}</p>
            <p className="text-lg text-gray-600 mt-1">
              Weeks: {weekData.weeks || "N/A"}
            </p>
            <p className="text-lg text-gray-600 mt-1">
              Status: {weekData.status || "un-set"}
            </p>
          </div>

          <div className="p-8 space-y-6">
            {/* Topics Section */}
            <section>
              <h2 className="text-3xl font-semibold text-gray-700 mb-4">
                Topics
              </h2>
              <ul className="space-y-2 text-lg">
                {weekData.topics && weekData.topics.length > 0 ? (
                  weekData.topics.map((topic, idx) => (
                    <li key={idx}>
                      -{" "}
                      {typeof topic === "string"
                        ? topic
                        : topic.value || topic.name}
                    </li>
                  ))
                ) : (
                  <p>No topics available</p>
                )}
              </ul>
            </section>

            {/* Learning Objectives */}
            <section>
              <h2 className="text-3xl font-semibold text-gray-700 mb-4">
                Learning Objectives
              </h2>
              <ul className="space-y-2 text-lg">
                {weekData.learningObject &&
                weekData.learningObject.length > 0 ? (
                  weekData.learningObject.map((objective) => (
                    <li key={objective._id}>- {objective.value}</li>
                  ))
                ) : (
                  <p>No learning objectives available</p>
                )}
              </ul>
            </section>

            {/* Learning Activities */}
            <section>
              <h2 className="text-3xl font-semibold text-gray-700 mb-4">
                Learning Activities
              </h2>
              <ul className="space-y-2 text-lg">
                {weekData.learningActivities &&
                weekData.learningActivities.length > 0 ? (
                  weekData.learningActivities.map((activity) => (
                    <li key={activity._id}>- {activity.value}</li>
                  ))
                ) : (
                  <p>No learning activities available</p>
                )}
              </ul>
            </section>

            {/* Embedded Core Skills */}
            <section>
              <h2 className="text-3xl font-semibold text-gray-700 mb-4">
                Embedded Core Skills
              </h2>
              <ul className="space-y-2 text-lg">
                {weekData.embeddedCoreSkills &&
                weekData.embeddedCoreSkills.length > 0 ? (
                  weekData.embeddedCoreSkills.map((skill) => (
                    <li key={skill._id}>- {skill.value}</li>
                  ))
                ) : (
                  <p>No embedded core skills available</p>
                )}
              </ul>
            </section>

            {/* Learning Resources */}
            <section>
              <h2 className="text-3xl font-semibold text-gray-700 mb-4">
                Learning Resources
              </h2>
              <ul className="space-y-2 text-lg">
                {weekData.learningResource &&
                weekData.learningResource.length > 0 ? (
                  weekData.learningResource.map((resource) => (
                    <li key={resource._id}>
                      -{" "}
                      <a
                        href={resource.value}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {resource.value}
                      </a>
                    </li>
                  ))
                ) : (
                  <p>No learning resources available</p>
                )}
              </ul>
            </section>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SchemeDetails;
