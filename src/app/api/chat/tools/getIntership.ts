import { tool } from 'ai';
import { z } from 'zod';

export const getInternship = tool({
  description:
    "Gives a summary of what kind of internship I'm looking for, plus my contact info and how to reach me. Use this tool when the user asks about my internship search or how to contact me for opportunities.",
  parameters: z.object({}),
  execute: async () => {
    return `Here’s what I’m looking for 👇

- 📅 **Duration**: Minimum 1 year with 1 month notice
- 🌍 **Location**: Preferably any country in Asia or anywhere in the world
- 🧑‍💻 **Focus**: AI development, full-stack web apps, SaaS, agentic workflows
- 🛠️ **Stack**: PHP, Laravel, Python, Vue/Nuxt.js, Tailwind CSS, TypeScript etc.
- 💼 **Visa**: I’m based in Bangladesh so I might need some **sponsorship**. Depends on your country.
- ✅ **What I bring**: Real experience with secure and enterprise applications. Can become almost any project from the table to make it reality.
- 🔥 I move fast, learn faster, and I’m HUNGRYYYYY for big challenges

📬 **Contact me** via:
- Email: admin@arifdev.com
- LinkedIn: [linkedin.com/in/mdarifislam](https://www.linkedin.com/in/mdarifislam/)
- GitHub: [github.com/marifuli](https://github.com/marifuli)

Let's build cool shit together ✌️
    `;
  },
});
