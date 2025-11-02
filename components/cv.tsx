import React from 'react'

export default function CV() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <header className="mb-16">
        <h1 className="text-2xl mb-2">Akshat Vora</h1>
        <p className="text-[var(--color-fg-muted)]">Software Engineer</p>
        <div className="text-[var(--color-fg-muted)] mt-4">
          <p>BITS Pilani • B.E. Electronics and Communication</p>
          <p>akshat.lucky.vora@gmail.com</p>
        </div>
      </header>

      <section className="mb-16">
        <h2 className="text-xl mb-4">Technical Skills</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Languages</h3>
            <p className="text-[var(--color-fg-muted)]">Python, JavaScript, TypeScript, C++, SQL</p>
          </div>
          <div>
            <h3 className="font-medium">Frameworks & Tools</h3>
            <p className="text-[var(--color-fg-muted)]">React, Next.js, TensorFlow, PyTorch, FastAPI, Docker</p>
          </div>
          <div>
            <h3 className="font-medium">Technologies</h3>
            <p className="text-[var(--color-fg-muted)]">Machine Learning, Deep Learning, Computer Vision, Full Stack Development</p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-xl mb-4">Experience</h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-medium">Samsung Research Institute</h3>
            <p className="text-[var(--color-fg-muted)]">Research Intern • May 2023 - July 2023</p>
            <ul className="list-disc pl-4 mt-2 text-[var(--color-fg-muted)]">
              <li>Developed Deep Learning models for face detection achieving 98% accuracy</li>
              <li>Implemented real-time face detection using OpenCV and TensorFlow</li>
              <li>Optimized model performance with TensorRT and quantization techniques</li>
              <li>Created comprehensive documentation and conducted knowledge transfer sessions</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium">Omdena</h3>
            <p className="text-[var(--color-fg-muted)]">ML Engineer • Jan 2023 - Mar 2023</p>
            <ul className="list-disc pl-4 mt-2 text-[var(--color-fg-muted)]">
              <li>Built ML models for semantic text similarity with 92% accuracy</li>
              <li>Implemented model deployment using FastAPI and Docker</li>
              <li>Collaborated with a team of 50 ML engineers in an Agile environment</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-xl mb-4">Projects</h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-medium">Face Detection System</h3>
            <p className="text-[var(--color-fg-muted)]">
              Deep learning model for real-time face detection. Implemented using TensorFlow and OpenCV.
              Optimized for edge devices using TensorRT.
            </p>
          </div>
          <div>
            <h3 className="font-medium">Text Similarity Engine</h3>
            <p className="text-[var(--color-fg-muted)]">
              ML system for computing semantic similarity between texts. Built with PyTorch and 
              deployed using FastAPI and Docker.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-xl mb-4">Education</h2>
        <div>
          <h3 className="font-medium">BITS Pilani</h3>
          <p className="text-[var(--color-fg-muted)]">B.E. Electronics and Communication • 2022-2026</p>
          <p className="text-[var(--color-fg-muted)]">CGPA: 9.2/10.0</p>
        </div>
      </section>
    </main>
  )
}