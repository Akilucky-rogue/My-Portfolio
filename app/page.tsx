export default function Home() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <section className="mb-16">
        <h1 className="text-2xl mb-4">Akshat Vora</h1>
        <div className="space-y-4">
          <p className="text-[var(--color-fg-muted)]">
            A passionate Software Engineer and Data Scientist with a strong foundation in AI/ML and full-stack development.
            Currently pursuing B.Tech in Computer Engineering at MPSTME, NMIMS University, while actively engaging in research
            and development initiatives.
          </p>
          <p className="text-[var(--color-fg-muted)]">
            I combine technical expertise in machine learning and software development with practical experience in client
            relationships and team leadership. My journey spans from developing AI models to creating innovative full-stack
            applications, always driven by a commitment to solving complex problems and delivering impactful solutions.
          </p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-xl mb-4">Education</h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-medium">B. Tech in Computer Engineering</h3>
            <p className="text-[var(--color-fg-muted)]">MPSTME, NMIMS University • 2023-2026</p>
            <p className="text-[var(--color-fg-muted)]">CGPA: 3.05/4</p>
          </div>
          <div>
            <h3 className="font-medium">Diploma in Computer Engineering</h3>
            <p className="text-[var(--color-fg-muted)]">MPSTME, NMIMS University • 2020-2023</p>
            <p className="text-[var(--color-fg-muted)]">CGPA: 3.14/4</p>
          </div>
          <div>
            <h3 className="font-medium">IGCSE</h3>
            <p className="text-[var(--color-fg-muted)]">Witty International School • 2020</p>
            <p className="text-[var(--color-fg-muted)]">Score: 78%</p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-xl mb-4">Projects</h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-medium">TradeSim • 2025</h3>
            <p className="text-[var(--color-fg-muted)]">
              Created a trading simulator enabling users to practice stock and cryptocurrency investments with real-time data. 
              Designed portfolio tracking and risk-free learning modules, gaining exposure to market analysis, sentiment 
              interpretation, and decision-making under uncertainty.
            </p>
            <a 
              href="https://github.com/Akilucky-rogue/tradesim" 
              className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] mt-1 inline-block"
              target="_blank" 
              rel="noopener noreferrer"
            >
              View project →
            </a>
          </div>
          <div>
            <h3 className="font-medium">Commune One • 2025</h3>
            <p className="text-[var(--color-fg-muted)]">
              Developed a modern dashboard using Next.js for planning Mumbai Local journeys, featuring responsive UI, 
              real-time station swapping, and intelligent search results. Strengthened problem-solving and analytical 
              thinking by optimizing user navigation and data flow.
            </p>
            <a 
              href="https://github.com/Akilucky-rogue/commune-one" 
              className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] mt-1 inline-block"
              target="_blank" 
              rel="noopener noreferrer"
            >
              View project →
            </a>
          </div>
          <div>
            <h3 className="font-medium">GenoScan • 2024</h3>
            <p className="text-[var(--color-fg-muted)]">
              Built a web platform for DNA sequence analysis to detect genetic abnormalities and provide research insights. 
              Enhanced data interpretation and research-driven critical thinking skills, aligning with analytical demands 
              in financial markets.
            </p>
            <a 
              href="https://github.com/Akilucky-rogue/genoscan" 
              className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] mt-1 inline-block"
              target="_blank" 
              rel="noopener noreferrer"
            >
              View project →
            </a>
          </div>
          <div>
            <h3 className="font-medium">HeartSync • 2024</h3>
            <p className="text-[var(--color-fg-muted)]">
              Developed a comprehensive suite of features aimed at celebrating and enhancing intimacy, communication, 
              and shared experiences between partners & families. Created a scalable and engaging application with 
              focus on user experience and future extensibility.
            </p>
            <a 
              href="https://github.com/Akilucky-rogue/heartsync" 
              className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] mt-1 inline-block"
              target="_blank" 
              rel="noopener noreferrer"
            >
              View project →
            </a>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-xl mb-4">Experience</h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-medium">Software Development Intern @ Wirerr Solutions</h3>
            <p className="text-[var(--color-fg-muted)]">May 2025 - July 2025 • Remote</p>
            <ul className="list-disc pl-4 mt-2 text-[var(--color-fg-muted)]">
              <li>Collaborated in an Agile environment to enhance UI/UX functionalities</li>
              <li>Worked closely with senior developers to understand client requirements and deliver optimized features</li>
              <li>Strengthened adaptability, teamwork, and problem-solving in a fast-paced setting</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium">Client Relationship Executive @ SERNET Financial Services</h3>
            <p className="text-[var(--color-fg-muted)]">June 2023 - March 2025</p>
            <ul className="list-disc pl-4 mt-2 text-[var(--color-fg-muted)]">
              <li>Excelled in effective communication and demonstrated strong analytical skills within tight timelines</li>
              <li>Assisted senior employees in understanding client requirements to deliver optimized resolutions and reports</li>
              <li>Cultivated an ability to understand complex financial concepts and interpret financial data</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-xl mb-4">Certifications</h2>
        <ul className="list-disc pl-4 space-y-2 text-[var(--color-fg-muted)]">
          <li>NISM Series VA – Mutual Fund Distributor, Pursuing NISM VIII – Equity Derivatives</li>
          <li>Deloitte Australia Data Analytics Job Simulation – Applied data analytics to solve real-world business cases</li>
          <li>AWS Cloud Architecting Certification – Gained exposure to cloud-based data management and scalability</li>
          <li>Ethical Hacking – Developed problem-solving and risk-analysis and vulnerability testing mindset</li>
          <li>Technical Certifications – C, C++, Python, Tally Prime & GST, Stop Motion Animation, Desktop Publishing, Web Design</li>
        </ul>
      </section>

      <section className="mb-16">
        <h2 className="text-xl mb-4">Technical Skills</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium">Core Competencies</h3>
            <p className="text-[var(--color-fg-muted)]">
              Problem-Solving, Analytical Thinking, Cross-functional Collaboration, Team Leadership, Research 
              & Experimentation, Agile Development
            </p>
          </div>
          <div>
            <h3 className="font-medium">AI/ML & Data Engineering</h3>
            <p className="text-[var(--color-fg-muted)]">
              Agentic AI, LLMs (Prompt Engineering), Machine Learning (Scikit-Learn, PyTorch, TensorFlow), 
              Anomaly Detection, Predictive Modeling, Python (Pandas, NumPy, Matplotlib), SQL, R, Tableau, 
              Power BI, ETL, Log Analysis, Data Quality Assurance, Process Optimization, Statistical Analysis
            </p>
          </div>
          <div>
            <h3 className="font-medium">Development & Cloud</h3>
            <p className="text-[var(--color-fg-muted)]">
              Python, Java, JavaScript, React, Next.js, Node.js, Full Stack Development, RESTful APIs, 
              Git/GitHub, AWS (S3, EC2), Linux, ArcGIS, Spatial Data Analysis, GeoJSON, Data Visualization
            </p>
          </div>
          <div>
            <h3 className="font-medium">Tools</h3>
            <p className="text-[var(--color-fg-muted)]">
              VS Code, Jupyter Notebooks, Postman, Excel (Advanced), Power Automate, MS Office Suite, Linux
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-xl mb-4">Leadership & Achievements</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Student Placement Committee</h3>
            <p className="text-[var(--color-fg-muted)]">2020–2026</p>
            <ul className="list-disc pl-4 mt-2 text-[var(--color-fg-muted)]">
              <li>Coordinated with recruiters, strengthening exposure to industry standards and decision-making</li>
              <li>Represented NMIMS for NAAC A++ Accreditation, showcasing responsibility and analytical presentation</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium">R&D Head @ ACM MPSTME</h3>
            <ul className="list-disc pl-4 mt-2 text-[var(--color-fg-muted)]">
              <li>Led research initiatives, fostering strategic thinking, experimentation, and podcasts</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="flex gap-4 text-[var(--color-fg-muted)]">
        <a href="https://github.com/Akilucky-rogue" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-fg)]">
          GitHub
        </a>
        <a href="/cv" className="hover:text-[var(--color-fg)]">
          CV
        </a>
      </footer>
    </main>
  )
}