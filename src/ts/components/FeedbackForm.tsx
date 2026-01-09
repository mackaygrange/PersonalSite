import React, { useState } from 'react';
import { FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

export function FeedbackForm()
{
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch('https://formspree.io/f/mjgknnra', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setSubmitted(true);
        form.reset();
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative rounded-2xl w-full border border-(--color-overlay)/60 bg-(--color-muted)/40 shadow-xl overflow-hidden backdrop-blur">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r from-(--color-rose) via-(--color-foam) to-(--color-pine)/80" />
      <div className="p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-(--color-text) mb-6">Feedback & Suggestions</h2>
        <p className="text-(--color-text) mb-6">
          Have a suggestion, found a bug, or just want to say hi? I'd love to hear from you! All fields except your message are optional.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-2 text-(--color-text)">
              Name (Optional)
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              className="w-full px-4 py-3 bg-(--color-base) border border-(--color-overlay) rounded-lg text-(--color-text) placeholder-text-(--color-subtle) focus:outline-none focus:border-(--color-gold) transition-colors"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2 text-(--color-text)">
              Email (Optional)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-(--color-base) border border-(--color-overlay) rounded-lg text-(--color-text) placeholder-text-(--color-subtle) focus:outline-none focus:border-(--color-gold) transition-colors"
            />
          </div>

          {/* Feedback Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-semibold mb-2 text-(--color-text)">
              Type of Feedback
            </label>
            <select
              id="type"
              name="type"
              defaultValue="suggestion"
              className="w-full px-4 py-3 bg-(--color-base) border border-(--color-overlay) rounded-lg text-(--color-text) focus:outline-none focus:border-(--color-gold) transition-colors"
            >
              <option value="suggestion">Suggestion</option>
              <option value="bug">Bug Report</option>
              <option value="question">Question</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-semibold mb-2 text-(--color-text)">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              placeholder="Your message here..."
              className="w-full px-4 py-3 bg-(--color-base) border border-(--color-overlay) rounded-lg text-(--color-text) placeholder-text-(--color-subtle) focus:outline-none focus:border-(--color-gold) transition-colors resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || submitted}
            className="w-full bg-(--color-gold) hover:bg-(--color-gold)/90 text-(--color-base) font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {submitted ? (
              <>
                <FaCheckCircle size={20} />
                Thanks for your feedback!
              </>
            ) : (
              <>
                <FaPaperPlane size={20} />
                {loading ? 'Sending...' : 'Send Feedback'}
              </>
            )}
          </button>
        </form>

        {/* Privacy Note */}
        <p className="text-sm text-(--color-subtle) mt-6 text-center">
          Your feedback is valuable! Messages are sent directly to my email.
        </p>
      </div>
    </div>
  );
}
