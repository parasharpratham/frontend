import { useState } from "react";
import axios from "axios";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.message) {
      setStatus("Please fill all fields.");
      return;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(form.email)) {
      setStatus("Invalid email address.");
      return;
    }
    try {
      const res = await axios.post("https://vernabackend.ezlab.in/api/contact-us/", form);
      if (res.status === 200) {
        setStatus("✅ Form Submitted!");
        setForm({ name: "", email: "", phone: "", message: "" });
      }
    } catch (err) {
      setStatus("❌ Submission failed. Try again.");
    }
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-xl mx-auto bg-white shadow-md p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} className="w-full border p-3 rounded" />
          <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} className="w-full border p-3 rounded" />
          <input type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} className="w-full border p-3 rounded" />
          <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} className="w-full border p-3 rounded h-24"></textarea>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition">Submit</button>
        </form>
        {status && <p className="text-center text-sm mt-4 text-blue-700">{status}</p>}
      </div>
    </section>
  );
}