import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer.jsx";
import {
  LoaderIcon,
  LockIcon,
  MailIcon,
  MessageCircleIcon,
  UserIcon,
} from "lucide-react";
import { Link } from "react-router";

function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUP } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    signup(formData);
  };

  return (
    <>
      <div className="w-full flex items-center justify-center p-4 bg-slate-900">
        <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
          <BorderAnimatedContainer>
            <div className="w-full flex flex-col md:flex-row">
              {/* FORM COLUM LEFT SIDE */}
              <div className="w-full md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
                <div className="w-full max-w-md">
                  {/* HEADER TEXT*/}
                  <div className="text-center md-8">
                    <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 md-4" />
                    <h2 className="text-2xl font-bold text-slate-200 md-2">
                      Create Account
                    </h2>
                    <p className="text-slate-400">Signup for new account</p>
                  </div>

                  {/* FORM DATA*/}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* FULL NAME */}
                    <div>
                      <label className="auth-input-lable">Full Name</label>
                      <div className="relative">
                        <UserIcon className="auth-input-icon" />
                        <input
                          type="text"
                          placeholder="Jhon Doe"
                          className="input"
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              fullName: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    {/* EMAIL */}
                    <div>
                      <label className="auth-input-lable">Email</label>
                      <div className="relative">
                        <MailIcon className="auth-input-icon" />
                        <input
                          type="email"
                          placeholder="john.doe@example.com"
                          className="input"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    {/* PASSWORD */}
                    <div>
                      <label className="auth-input-lable">Password</label>
                      <div className="relative">
                        <LockIcon className="auth-input-icon" />
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="input"
                          value={formData.password}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    {/* SUBMIT BUTTON */}
                    <button
                      type="submit"
                      className="auth-btn"
                      disabled={isSigningUP}
                    >
                      {isSigningUP ? (
                        <LoaderIcon className="w-full h-5 animate-spin text-center" />
                      ) : (
                        "Sign Up"
                      )}
                    </button>
                  </form>

                  <div className="mt-6 text-center">
                    <Link to="/login" className="auth-link">
                      Already have an account? Log in
                    </Link>
                  </div>
                </div>
              </div>

              {/* FORM ILLUSTRATION RIGHT SIDE */}
              <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
                <div>
                  <img
                    src="/signup.png"
                    alt="People using mobile devices"
                    className="w-full h-auto object-contain"
                  />
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-medium text-cyan-400">
                      Start Your Journey Today
                    </h3>

                    <div className="mt-4 flex justify-center gap-4">
                      <span className="auth-badge">Free</span>
                      <span className="auth-badge">Easy Setup</span>
                      <span className="auth-badge">Private</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BorderAnimatedContainer>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
