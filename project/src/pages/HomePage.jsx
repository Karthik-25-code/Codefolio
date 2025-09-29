import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, TrendingUp, Award, Zap } from 'lucide-react';

const HomePage = () => {
  const [leetcodeUsername, setLeetcodeUsername] = useState('');
  const [codechefUsername, setCodechefUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!leetcodeUsername.trim() || !codechefUsername.trim()) {
      alert('Please enter both usernames');
      return;
    }

    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      navigate("/dashboard", {
        state: { leetcodeUsername, codechefUsername }
      });

      // Also store in localStorage
      localStorage.setItem("leetcodeUsername", leetcodeUsername);
      localStorage.setItem("codechefUsername", codechefUsername);

      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/3 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-3/4 left-3/4 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-40 animation-delay-300"></div>
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping opacity-50 animation-delay-500"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-lg w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] transition-all duration-300 hover:scale-110 group">
                  <Code className="w-8 h-8 text-white group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-600/20 rounded-2xl blur-xl animate-pulse"></div>
              </div>
            </div>

            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              CodeFolio
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full mb-6 opacity-60"></div>
            <p className="text-xl text-gray-300 font-medium leading-relaxed">
              Track your competitive programming journey with
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-bold"> real-time analytics</span>
            </p>
          </div>

          {/* Form Card */}
          <div className="group relative backdrop-blur-xl bg-white/3 border border-white/5 rounded-3xl p-8 shadow-2xl hover:bg-white/5 hover:shadow-[0_0_60px_rgba(59,130,246,0.2)] hover:border-blue-400/30 transition-all duration-500 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* LeetCode Input */}
                <div className="group/input">
                  <label className="block text-white font-semibold mb-3 text-sm">
                    <span className="flex items-center gap-3">
                      <img
                        src="/leetlogo.png" 
                        alt="Leetcodelogo"
                        className="w-5 h-5 object-contain"
                      />
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">LeetCode Username</span>
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={leetcodeUsername}
                      onChange={(e) => setLeetcodeUsername(e.target.value)}
                      placeholder="Enter your LeetCode username"
                      className="w-full px-4 py-4 bg-white/3 border border-white/5 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 focus:bg-white/5 focus:shadow-[0_0_20px_rgba(250,204,21,0.2)] transition-all duration-300 hover:border-white/10"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/10 to-orange-400/10 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>

                {/* CodeChef Input */}
                <div className="group/input">
                  <label className="block text-white font-semibold mb-3 text-sm">
                    <span className="flex items-center gap-3">
                      <img
                        src="/codelogo.png" 
                        alt="CodeChef"
                        className="w-5 h-5 object-contain"
                      />
                      <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">CodeChef Username</span>
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={codechefUsername}
                      onChange={(e) => setCodechefUsername(e.target.value)}
                      placeholder="Enter your CodeChef username"
                      className="w-full px-4 py-4 bg-white/3 border border-white/5 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400/50 focus:bg-white/5 focus:shadow-[0_0_20px_rgba(249,115,22,0.2)] transition-all duration-300 hover:border-white/10"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400/10 to-red-400/10 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group/btn relative w-full font-bold py-4 px-6 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none mt-8"
                >
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                  <span className="relative flex items-center justify-center gap-3">
                    {isLoading ? (
                      <>
                        <div className="relative w-5 h-5">
                          <div className="absolute inset-0 rounded-full border-2 border-white/30"></div>
                          <div className="absolute inset-0 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                        </div>
                        <span>Analyzing Profiles...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" />
                        <span>Launch Dashboard</span>
                      </>
                    )}
                  </span>
                </button>
              </form>

              {/* Features */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <h3 className="text-white font-bold mb-4 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  ✨ Powerful Analytics Features
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  <div className="group/feature flex items-center gap-4 p-3 rounded-xl bg-white/3 hover:bg-white/5 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg group-hover/feature:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all duration-300">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-300 font-medium">Real-time profile statistics & global rankings</span>
                  </div>

                  <div className="group/feature flex items-center gap-4 p-3 rounded-xl bg-white/3 hover:bg-white/5 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg group-hover/feature:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all duration-300">
                      <Code className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-300 font-medium">Interactive problem difficulty breakdown</span>
                  </div>

                  <div className="group/feature flex items-center gap-4 p-3 rounded-xl bg-white/3 hover:bg-white/5 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center shadow-lg group-hover/feature:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all duration-300">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-300 font-medium">Contest performance & rating trends</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/3 backdrop-blur-sm border border-white/5 rounded-full">
              <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse"></div>
              <p className="text-gray-400 text-sm font-medium">
                Built with React, Recharts & Tailwind CSS
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;