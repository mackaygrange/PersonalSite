import React from 'react';

export function Contact()
{
  return (
    <section id="contact" className="pb-16" aria-hidden="true">
      <h1 className="text-3xl text-(--color-text) font-bold mb-6">Contact</h1>
      <div className="border-b-4 border-double border-(--color-overlay) mb-4 max-w-2xl"> </div>
      <h2 className="text-2xl text-(--color-love) font-extrabold mb-2">Currently Seeking Employment Opportunities!</h2>
      <h2 className="text-2xl text-(--color-text) font-semibold mb-2"> Click the links in the header or see the details below to get in touch!</h2>
      <p className="indent-0">
        <b>Linkedin:</b> <a href="https://linkedin.com/in/mackay-grange-751941235/" target="_blank" rel="noopener noreferrer" className="text-(--color-gold) underline ml-2">mackay-grange-751941235</a>
        <br />
        <b>GitHub:</b> <a href="https://github.com/mackaygrange" target="_blank" rel="noopener noreferrer" className="text-(--color-gold) underline ml-2">mackaygrange</a>
        <br />
        <b>Email:</b> <a href="mailto:mackay.grange@gmail.com" className="text-(--color-gold) underline ml-2">mackay.grange@gmail.com</a>
      </p>
    </section>
  )
}