import Image from 'next/image';
import { Image as Img } from 'lucide-react';
import { ChevronRight, Link } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { url } from 'inspector';

// Enhanced project content array with all projects
const PROJECT_CONTENT = [
  {
    title: 'Daily News Highlight',
    description:
      'Daily News Highlight (DNH) is a news agreegator website with AI Crawler and AI news summarization. It has awesome news personalization that no other news website offers. The AI crawler currently works with more than 900 news sources and increasing every month.',
    techStack: [
      'Laravel',
      'MySQL',
      'Nuxt.js',
      'Boostrap',
      'TypeScript',
      'Python',
      'Custom AI Model',
    ],
    date: '2021',
    links: [
      {
        name: 'website',
        url: 'https://dailynewshighlights.com/',
      },
      {
        name: 'X',
        url: 'https://twitter.com/DNHStreem',
      },
    ],
    images: [
      {
        src: '/dnh.png',
        alt: 'DNH landing page',
      },
      {
        src: '/dnh2.png',
        alt: 'DNH News Personalization',
      },
      {
        src: '/dnh3.png',
        alt: 'DNH Account Creation',
      },
    ],
  },
  {
    title: 'Lernwelt',
    description:
      'A comprehensive Learning Management Solution tailored for large schools and individual German teachers. It encompasses management of courses, assignments, exams, board exams, placement tests, and pre-tests. This rapidly growing software is designed to save time and enhance educational efficiency., Comprehensive Features: Facilitates the management of courses, assignments, exams, board exams, placement tests, and pre-tests, Wide Adoption: Successfully implemented in multiple schools, proving its effectiveness and reliability, Resource Sharing: Enables teachers to reuse and share assignments and quizzes both publicly and privately, enhancing collaboration and teaching efficiency, User-Friendly Interface: Designed to save time and streamline educational processes, making it a highly valued tool for educators, Professional Achievement: A project of personal pride, demonstrating my ability to create impactful and scalable educational software solutions.',
    techStack: [
      'Laravel',
      'MySQL',
      'Boostrap',
      'Vuejs'
    ],
    date: '2022',
    links: [
      {
        name: 'website',
        url: 'https://lernwelt-deutsch.de/',
      },
    ],
    images: [
      {
        src: '/lernwelt-1.png',
        alt: 'Login Page',
      },
      {
        src: '/lernwelt-2.png',
        alt: 'Dashboard page',
      },
      {
        src: '/lernwelt-3.png',
        alt: 'Exam Landing page',
      },
      {
        src: '/lernwelt-4.png',
        alt: 'Exam Main page',
      },
    ],
  },
  {
    title: 'ProHR',
    description:
      'A versatile HR management and payroll system that simplifies employee management and automates salary calculations. Remote Accessibility: Engineered a fully online HR management and payroll system, enabling seamless access from any location, thus supporting the growing need for remote work flexibility. Integrated Attendance System: Developed an integrated attendance management feature that supports ZKTeco terminals, facilitating accurate employee attendance tracking through fingerprint and face recognition technology. Flexible Licensing Models: Offered the solution via both subscription-based and self-hosting licenses, providing companies with flexible deployment options that cater to their specific needs and infrastructure. Multi-Branch Support: Implemented support for multi-branch operations, enabling the system to manage and streamline HR functions across various company branches effectively. Comprehensive HR Control: Enabled HR departments to manage employee information directly on attendance devices and monitor attendance in real time, enhancing operational efficiency. Windows Application Development: Utilized Python to develop a Windows application that automatically connects ZKTeco attendance terminals with the cloud, ensuring seamless synchronization of employee data and biometric information, thereby automating and simplifying attendance management processes.',
    techStack: [
      'Laravel',
      'MySQL',
      'Boostrap',
      'Python'
    ],
    date: '2024',
    links: [
      {
        name: 'website',
        url: 'https://app.prohrbd.com',
      },
      {
        name: 'website',
        url: 'http://demo.prohrbd.com/',
      },
    ],
    images: [
      {
        src: '/prohr4.png',
        alt: 'Landing page',
      },
      {
        src: '/prohr3.png',
        alt: 'Pricing page',
      },
      {
        src: '/prohr2.png',
        alt: 'Demo Login',
      },
      {
        src: '/prohr1.png',
        alt: 'Demo Dashboard',
      },
    ],
  },
];

// Define interface for project prop
interface ProjectProps {
  title: string;
  description?: string;
  techStack?: string[];
  date?: string;
  links?: { name: string; url: string }[];
  images?: { src: string; alt: string }[];
}

const ProjectContent = ({ project }: { project: ProjectProps }) => {
  // Find the matching project data
  const projectData = PROJECT_CONTENT.find((p) => p.title === project.title);

  if (!projectData) {
    return <div>Project details not available</div>;
  }

  return (
    <div className="space-y-10">
      {/* Header section with description */}
      <div className="rounded-3xl bg-[#F5F5F7] p-8 dark:bg-[#1D1D1F]">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
            <span>{projectData.date}</span>
          </div>

          <p className="text-secondary-foreground font-sans text-base leading-relaxed md:text-lg">
            {projectData.description}
          </p>

          {/* Tech stack */}
          <div className="pt-4">
            <h3 className="mb-3 text-sm tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {projectData.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="rounded-full bg-neutral-200 px-3 py-1 text-sm text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Links section */}
      {projectData.links && projectData.links.length > 0 && (
        <div className="mb-24">
          <div className="px-6 mb-4 flex items-center gap-2">
            <h3 className="text-sm tracking-wide text-neutral-500 dark:text-neutral-400">
              Links
            </h3>
            <Link className="text-muted-foreground w-4" />
          </div>
          <Separator className="my-4" />
          <div className="space-y-3">
            {projectData.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#F5F5F7] flex items-center justify-between rounded-xl p-4 transition-colors hover:bg-[#E5E5E7] dark:bg-neutral-800 dark:hover:bg-neutral-700"
              >
                <span className="font-light capitalize">{link.name}</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Images gallery */}
      {projectData.images && projectData.images.length > 0 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {projectData.images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-video overflow-hidden rounded-2xl"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Main data export with updated content
export const data = [
  {
    category: 'News Project',
    title: 'DNH',
    src: '/dnh.png',
    content: <ProjectContent project={{ title: 'DNH' }} />,
  },
  {
    category: 'LMS Project',
    title: 'Lernwelt',
    src: '/lernwelt-2.png',
    content: <ProjectContent project={{ title: 'Lernwelt' }} />,
  },
  {
    category: 'HRMS Project',
    title: 'ProHR',
    src: '/prohr1.png',
    content: <ProjectContent project={{ title: 'ProHR' }} />,
  },
];
