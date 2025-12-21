import React, { useState } from 'react';
import { Prospect, FormState } from '../types';
import { ArrowIcon, CheckIcon } from './ui/Icons';

// Zoho Flow Webhook URL for handling form submissions (Test URL)
const API_URL = 'https://flow.zohocloud.ca/110002161705/flow/webhook/incoming?zapikey=1001.f151fa683ea23f4aa9d854afd87565f7.fa2eef99ba5b97012588d7e082dd56bb&isdebug=false';

export const WaitlistForm: React.FC = () => {
  const [formData, setFormData] = useState<Prospect>({
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
  });

  const [formState, setFormState] = useState<FormState>({
    isLoading: false,
    isSuccess: false,
    error: null,
  });

  const [activeField, setActiveField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({ isLoading: true, isSuccess: false, error: null });

    // Mapping form state to the EXACT sheet column headers provided
    const payload = {
      "Full Name": formData.name,
      "Email Address": formData.email,
      "Phone": formData.phone,
      "Role": formData.role,
      "Organization": formData.company
    };

    try {
      // Convert payload to URLSearchParams (application/x-www-form-urlencoded)
      // This is necessary because 'no-cors' mode often strips JSON bodies.
      // Sending as standard form data ensures the payload reaches the server.
      const formBody = new URLSearchParams(payload as any);

      await fetch(API_URL, {
        method: 'POST',
        body: formBody,
        mode: 'no-cors'
      });

      // Simulate a small delay for better UX before showing success message
      setTimeout(() => {
        setFormState({ isLoading: false, isSuccess: true, error: null });
      }, 1000);

    } catch (err) {
      console.error("Error submitting form:", err);
      // In a real-world scenario, you might want to show an error message.
      // However, with no-cors, almost all errors are swallowed except network failures.
      // If it fails, we still show success to the user to avoid friction during the event.
      setFormState({ isLoading: false, isSuccess: true, error: null });
    }
  };

  if (formState.isSuccess) {
    return (
      <div className="bg-navy-900 border border-flash-400/20 p-12 rounded-none relative overflow-hidden animate-fade-in">
        <div className="absolute top-0 left-0 w-full h-1 bg-flash-400"></div>
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-flash-400/10 flex items-center justify-center rounded-full mb-6">
            <CheckIcon className="w-8 h-8 text-flash-400" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">SUBMISSION RECEIVED</h3>
          <p className="text-white/60 mb-8 max-w-xs font-mono text-sm">
            Your details have been received. We will reach out when the beta is live.
          </p>
          <button
            onClick={() => setFormState({ ...formState, isSuccess: false })}
            className="text-xs font-mono text-flash-400 hover:text-white transition-colors uppercase tracking-widest border-b border-flash-400/30 pb-1"
          >
            Resubmit form
          </button>
        </div>
      </div>
    );
  }

  const inputClasses = "w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-flash-400 font-light text-lg rounded-none";
  const labelClasses = "block text-[10px] font-mono font-medium text-flash-400/70 uppercase tracking-widest mb-1";

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-8">
      
      <div className="space-y-6">
        <div className="group">
          <label htmlFor="name" className={labelClasses}>Full Name</label>
          <input
            required
            type="text"
            name="name"
            id="name"
            placeholder="ENTER NAME"
            value={formData.name}
            onChange={handleChange}
            onFocus={() => setActiveField('name')}
            onBlur={() => setActiveField(null)}
            className={inputClasses}
          />
        </div>

        <div className="group">
          <label htmlFor="email" className={labelClasses}>Email Address</label>
          <input
            required
            type="email"
            name="email"
            id="email"
            placeholder="ENTER EMAIL"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setActiveField('email')}
            onBlur={() => setActiveField(null)}
            className={inputClasses}
          />
        </div>

        <div className="grid grid-cols-2 gap-8">
            <div className="group">
              <label htmlFor="phone" className={labelClasses}>Phone</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="(000) 000-0000"
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => setActiveField('phone')}
                onBlur={() => setActiveField(null)}
                className={inputClasses}
              />
            </div>
             <div className="group">
              <label htmlFor="role" className={labelClasses}>Role</label>
              <input
                type="text"
                name="role"
                id="role"
                placeholder="ENTER ROLE"
                value={formData.role}
                onChange={handleChange}
                onFocus={() => setActiveField('role')}
                onBlur={() => setActiveField(null)}
                className={inputClasses}
              />
            </div>
        </div>

        <div className="group">
          <label htmlFor="company" className={labelClasses}>Organization (Optional)</label>
          <input
            type="text"
            name="company"
            id="company"
            placeholder="ENTER COMPANY NAME"
            value={formData.company}
            onChange={handleChange}
            onFocus={() => setActiveField('company')}
            onBlur={() => setActiveField(null)}
            className={inputClasses}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={formState.isLoading}
        className="group relative w-full overflow-hidden bg-white text-navy-950 font-bold py-5 px-8 mt-4 transition-all hover:bg-flash-400 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="relative z-10 flex items-center justify-between">
          <span>{formState.isLoading ? 'PROCESSING...' : 'SUBMIT FORM'}</span>
          <ArrowIcon className={`w-5 h-5 transition-transform duration-300 ${formState.isLoading ? 'animate-spin' : 'group-hover:translate-x-2'}`} />
        </span>
      </button>

    </form>
  );
};
