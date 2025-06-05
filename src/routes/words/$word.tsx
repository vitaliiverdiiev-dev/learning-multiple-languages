import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/words/$word')({
  component: RouteComponent,
  loader: async ({ params }) => {
    if (!params.word) {
      throw new Error('Word parameter is required')
    }
    return { word: params.word }
  },
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => <div>Error: Word not found</div>,
})

function RouteComponent() {
  const { word } = Route.useLoaderData()
  if (!word) {
    return <div>Error: Word not found</div>
  }

  return <div className='py-2'>Word - {word}</div>
}
