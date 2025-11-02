import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type Project = {
  id: string
  title: string
  description?: string
  year?: number
  url?: string
  content?: string
}

const PROJECTS_DIR = path.join(process.cwd(), 'content', 'projects')

export function getProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return []

  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))

  const projects = files.map((fileName) => {
    const fullPath = path.join(PROJECTS_DIR, fileName)
    const raw = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(raw)

    return {
      id: fileName.replace(/\.mdx?$/, ''),
      title: data.title || fileName,
      description: data.description || '',
      year: data.year || null,
      url: data.url || null,
      content: content || '',
    }
  })

  return projects
}
