import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SolvedPieChart from '../components/SolvedPieChart';
import ContestGraph from '../components/ContestGraph';
import axios from 'axios';

const DashboardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [leetcodeData, setLeetcodeData] = useState(null);
  const [codechefData, setCodechefData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const leetcodeUsername = location.state?.leetcodeUsername || localStorage.getItem("leetcodeUsername");
  const codechefUsername = location.state?.codechefUsername || localStorage.getItem("codechefUsername");


  
  useEffect(() => {
    if (!leetcodeUsername || !codechefUsername) {
      navigate('/');
      return;
    }

    setLoading(true);

    const fetchAllData = async () => {
      try {
        const [leetProfileRes, leetContestRes, chefProfileRes, chefContestRes] = await Promise.all([
          axios.get(`https://codefolio-1-71p2.onrender.com/stats/leetcode/${leetcodeUsername}`),
          axios.get(`https://codefolio-1-71p2.onrender.com/stats/leetcode/contest/${leetcodeUsername}`),
          axios.get(`https://codefolio-1-71p2.onrender.com/stats/codechef/${codechefUsername}`),
          axios.get(`https://codefolio-1-71p2.onrender.com/stats/codechef/contest/${codechefUsername}`)
        ]);

        setLeetcodeData({
          ...leetProfileRes.data,
          rating: leetContestRes.data.rating,
          contestRating: leetContestRes.data.contestRating
        });

        setCodechefData({
          ...chefProfileRes.data,
          rating: chefContestRes.data.rating,
          contestRating: chefContestRes.data.contestRating
        });
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [leetcodeUsername, codechefUsername, navigate]);


  const handleBackHome = () => {
  // Clear stored usernames
  localStorage.removeItem("leetcodeUsername");
  localStorage.removeItem("codechefUsername");

  // Navigate back to home
  navigate('/');
};


  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
        <div className="relative backdrop-blur-xl bg-white/3 border border-red-500/30 rounded-2xl p-8 text-center max-w-md shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-2xl"></div>
          <div className="relative z-10">
            <div className="text-red-400 text-6xl mb-6 animate-pulse">⚠️</div>
            <h2 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
              Something went wrong
            </h2>
            <p className="text-gray-300 mb-8 text-sm leading-relaxed">{error}</p>
            <button 
              onClick={handleBackHome} 
              className="group relative px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
              <span className="relative">Back to Home</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/3 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="relative">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              Dashboard
            </h1>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-60"></div>
          </div>
          <button 
            onClick={handleBackHome} 
            className="group relative px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-medium rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:border-blue-400/50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
            <span className="relative flex items-center gap-2">
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back
            </span>
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-8">
                <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20"></div>
                <div className="absolute inset-0 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin shadow-[0_0_20px_rgba(34,211,238,0.4)]"></div>
                <div className="absolute inset-2 rounded-full border-2 border-blue-400/30 border-b-transparent animate-spin animation-delay-300"></div>
              </div>
              <p className="text-xl text-cyan-300 font-medium animate-pulse">Loading your stats...</p>
              <div className="mt-2 w-48 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full animate-pulse"></div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* User Info Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* LeetCode Card */}
              <div className="group relative backdrop-blur-xl bg-white/3 border border-white/5 rounded-2xl p-6 transition-all duration-300 hover:bg-white/5 hover:shadow-[0_0_40px_rgba(250,204,21,0.2)] hover:border-yellow-400/30 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <img
                        src="/leetlogo.png" 
                        alt="CodeChef"
                        className="w-14 h-14 object-contain"
                      />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">LeetCode</h3>
                      <p className="text-gray-300 text-sm bg-white/10 px-3 py-1 rounded-full">@{leetcodeData?.username}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-white/3 rounded-xl border border-white/5 hover:border-green-400/30 transition-all duration-300">
                      <p className="text-3xl font-bold text-green-400 mb-1">#{leetcodeData?.ranking}</p>
                      <p className="text-gray-400 text-sm">Global Rank</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between items-center mb-3 p-3 bg-white/3 rounded-lg">
                      <span className="text-gray-300 font-medium">Problems Solved</span>
                      <span className="text-white font-bold text-lg bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                        {leetcodeData?.total_solved}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/3 rounded-lg">
                      <span className="text-gray-300 font-medium">Rating Stars</span>
                      <div className="flex gap-1">
                        {[...Array(leetcodeData?.starRating || 0)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-lg animate-pulse hover:scale-125 transition-transform duration-200 cursor-pointer" style={{animationDelay: `${i * 100}ms`}}>★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CodeChef Card */}
              <div className="group relative backdrop-blur-xl bg-white/3 border border-white/5 rounded-2xl p-6 transition-all duration-300 hover:bg-white/5 hover:shadow-[0_0_40px_rgba(249,115,22,0.2)] hover:border-orange-400/30 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <img
                        src="/codelogo.png" 
                        alt="CodeChef"
                        className="w-14 h-14 object-contain"
                      />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">CodeChef</h3>
                      <p className="text-gray-300 text-sm bg-white/10 px-3 py-1 rounded-full">@{codechefData?.username}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-white/3 rounded-xl border border-white/5 hover:border-blue-400/30 transition-all duration-300">
                      <p className="text-3xl font-bold text-blue-400 mb-1">{codechefData?.rating}</p>
                      <p className="text-gray-400 text-sm">Current Rating</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between items-center p-3 bg-white/3 rounded-lg">
                      <span className="text-gray-300 font-medium">Rating Stars</span>
                      <div className="flex gap-1">
                        {[...Array((codechefData?.stars?.match(/★/g) || []).length)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-lg animate-pulse hover:scale-125 transition-transform duration-200 cursor-pointer" style={{animationDelay: `${i * 100}ms`}}>★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="backdrop-blur-xl bg-white/3 border border-white/5 rounded-2xl p-6 hover:bg-white/5 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all duration-300">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      Problem Distribution
                    </h3>
                    <div className="w-full h-1 bg-gradient-to-r from-cyan-400/50 to-blue-400/50 rounded-full"></div>
                  </div>
                  <SolvedPieChart data={leetcodeData} loading={false} />
                </div>
              </div>
              
              <div className="lg:col-span-2 space-y-8">
                <div className="backdrop-blur-xl bg-white/3 border border-white/5 rounded-2xl p-6 hover:bg-white/5 hover:shadow-[0_0_30px_rgba(250,204,21,0.15)] transition-all duration-300">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                      LeetCode Contest Performance
                    </h3>
                    <div className="w-full h-1 bg-gradient-to-r from-yellow-400/50 to-orange-400/50 rounded-full"></div>
                  </div>
                  <ContestGraph data={leetcodeData} platform="leetcode" loading={false} />
                </div>
                
                <div className="backdrop-blur-xl bg-white/3 border border-white/5 rounded-2xl p-6 hover:bg-white/5 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] transition-all duration-300">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                      CodeChef Contest Performance
                    </h3>
                    <div className="w-full h-1 bg-gradient-to-r from-orange-400/50 to-red-400/50 rounded-full"></div>
                  </div>
                  <ContestGraph data={codechefData} platform="codechef" loading={false} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;