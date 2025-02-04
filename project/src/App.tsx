import { useEffect, useState } from "react";
import { ChevronDown, Sun, Moon, Briefcase, GraduationCap, Code, Award, User, MessageSquare, FileDown } from "lucide-react";
import { FaLinkedin, FaGithub, FaTools } from "react-icons/fa";

export default function ModernPortfolio() {
  const [darkMode, setDarkMode] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("");

  const handleScrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const headerHeight = 96; // This accounts for the header height (p-6 * 2 = 96px)
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      setSelectedSection(id);
      setDropdownOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("Sending...");
    try {
      await fetch("https://formsubmit.co/padakandlasreekar07@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setFormStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setFormStatus("Error sending message. Please try again.");
    }
  };

  const sections = [
    { id: "AboutMe", title: "About Me", icon: <User />, content: "Master's in Data Science from University of New Haven, passionate about cloud technologies, data engineering, and automation." },
    { id: "Skills", title: "Skills", icon: <FaTools />, content: "Azure, AWS, Python, SQL, Airflow, Terraform, Power BI, PySpark." },
    { id: "Experience", title: "Experience", icon: <Briefcase />, content: "Delta Airlines - Data Analyst | Cognizant - Data Engineer." },
    { id: "Certifications", title: "Certifications", icon: <Award />, content: "AWS Certified Data Engineer - Associate." },
    { id: "Education", title: "Education", icon: <GraduationCap />, content: "M.S. in Data Science, University of New Haven | B.Tech in Civil Engineering, ACE Engineering College." },
    { id: "Projects", title: "Projects", icon: <Code />, content: "Lane Detection Model | Pizza Sales Analysis Dashboard." },
    { id: "ContactMe", title: "Contact Me", icon: <MessageSquare />, content: "Get in touch with me by filling out the form below." }
  ];

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen`}>
      <header className={`fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center shadow-lg transition-all ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <h1 className={`text-2xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent transition-colors duration-300`}>Venkata Krishna Sreekar Padakandla</h1>
        <div className="flex items-center space-x-4">
          <a href="https://www.linkedin.com/in/venkata-krishna-sreekar-padakandla/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 transition-all text-2xl">
            <FaLinkedin />
          </a>
          <a 
            href="/resume/resume.pdf" 
            download
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-all"
          >
            <FileDown size={20} />
            <span>Resume</span>
          </a>
          <a href="https://github.com/krishnasreekar07" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition-all text-2xl">
            <FaGithub />
          </a>
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full transition-all bg-gray-200 hover:bg-gray-300">
            {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-700" />}
          </button>
          <div className="relative">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-all flex items-center">
              Sections <ChevronDown className="ml-2" />
            </button>
            {dropdownOpen && (
              <ul className="absolute top-full right-0 w-48 bg-gray-900 text-white shadow-lg rounded mt-2">
                {sections.map((section) => (
                  <li key={section.id} className="p-3 cursor-pointer hover:bg-gray-700 transition-all" onClick={() => handleScrollToSection(section.id)}>
                    {section.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </header>

      {/* Profile Section */}
      <section className="flex flex-col items-center text-center mt-20 py-12">
        <div className="w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-yellow-500 shadow-xl transition-transform transform hover:scale-110">
          <img src="/images/profile.jpg" alt="Profile Picture" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mt-4 md:mt-6 animate-pulse">Venkata Krishna Sreekar Padakandla</h1>
        <p className="mt-2 md:mt-4 text-md md:text-lg">Data Engineer & Analyst | Expertise in Big Data, Cloud, and Automation</p>
      </section>

      <main className="mt-0 container mx-auto p-10 grid grid-cols-1 gap-12">
        {sections.map((section, index) => (
          <section 
            id={section.id} 
            key={index}
            className={`${darkMode ? 'p-10 bg-gray-800 text-white' : 'p-10 bg-white text-black'} rounded-lg shadow-xl flex items-center space-x-4 transition-all hover:bg-gray-200`}
          >
            <div className="text-4xl text-yellow-500">{section.icon}</div>
            <div>
              <h2 className="text-3xl font-semibold">{section.title}</h2>
              <p className="mt-4">{section.content}</p>
            </div>
          </section>
        ))}

        {/* Contact Me Section */}
        <section 
          id="ContactMe"
          className={`${darkMode ? 'p-10 bg-gray-800 text-white hover:bg-gray-700' : 'p-10 bg-white text-black hover:bg-gray-200'} rounded-lg shadow-xl transition-all`}
        >
          <h2 className="text-3xl font-semibold flex items-center"><MessageSquare className="mr-3 text-yellow-500" /> Contact Me</h2>
          <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="name" 
              placeholder="Your Name" 
              value={formData.name} 
              onChange={handleInputChange} 
              className={`${darkMode ? 'p-3 rounded bg-gray-700 text-white' : 'p-3 rounded bg-gray-200 text-black'}`} 
              required 
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Your Email" 
              value={formData.email} 
              onChange={handleInputChange} 
              className={`${darkMode ? 'p-3 rounded bg-gray-700 text-white' : 'p-3 rounded bg-gray-200 text-black'}`} 
              required 
            />
            <textarea 
              name="message" 
              placeholder="Your Message" 
              value={formData.message} 
              onChange={handleInputChange} 
              className={`${darkMode ? 'p-3 rounded bg-gray-700 text-white' : 'p-3 rounded bg-gray-200 text-black'}`} 
              required
            ></textarea>
            <button type="submit" className="px-6 py-3 text-lg bg-yellow-500 hover:bg-yellow-600 transition-all">Send Message</button>
          </form>
          {formStatus && <p className="mt-4 text-lg">{formStatus}</p>}
        </section>
      </main>
    </div>
  );
}