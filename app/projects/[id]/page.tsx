import { MDXRemote } from 'next-mdx-remote/rsc'
import { getProjects } from '@/lib/content'
import MDXComponents from '@/components/mdx-components'

export async function generateStaticParams() {
  const projects = getProjects()
  return projects.map((project) => ({
    id: project.id,
  }))
}

export default async function ProjectPage(props: any) {
  const { params } = props
  const project = getProjects().find((p) => p.id === params?.id)

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <article className="prose dark:prose-invert mx-auto py-16 px-6">
  <h1>{project.title}</h1>
  {project.content && <MDXRemote source={project.content} components={MDXComponents} />}
    </article>
  )
}