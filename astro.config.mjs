import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import remarkMermaid from 'remark-mermaidjs'

export default defineConfig({
  integrations: [
    starlight({
      title: "ÆRIS DOCS",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/edusrc/aeris",
        },
      ],
      sidebar: [
        {
          label: "Introduction",
          items: [{ label: "Overview", link: "/introduction" }],
        },

        {
          label: "Use Guide",
          items: [
            { label: "Overview", link: "/use-guide/overview" },
            { label: "User Interface", link: "/use-guide/user-interface" },
            { label: "Editor Features", link: "/use-guide/editor-features" },
            {
              label: "Execution Controls",
              link: "/use-guide/execution-controls",
            },
            { label: "Console & Syscalls", link: "/use-guide/console" },
            { label: "Settings", link: "/use-guide/settings" },
          ],
        },

        {
          label: "Architecture",
          items: [
            { label: "Overview", link: "/architecture/overview" },
            {
              label: "Simulation Engine",
              link: "/architecture/simulation-engine",
            },
            {
              label: "Project Structure",
              link: "/architecture/project-structure",
            },
          ],
        },

        {
          label: "RISC-V",
          items: [
            { label: "Overview", link: "/riscv/overview" },
            { label: "RV32I", link: "/riscv/rv32i" },
            { label: "Instructions", link: "/riscv/instructions" },
            {
              label: "Pseudo Instructions",
              link: "/riscv/pseudo-instructions",
            },
            { label: "Syscalls", link: "/riscv/syscalls" },
            { label: "Directives", link: "/riscv/directives" }
          ],
        },
        {
          label: "Articles",
          items: [{ label: "Articles", link: "/articles" }],
        },
      ],
    }),
  ],
  markdown: {
    remarkPlugins: [remarkMermaid],
  },
});
