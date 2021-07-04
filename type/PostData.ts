export type PostData = {
  id: string,
  date: string,
  title: string
}

export type PostDataWithContent = PostData & { contentHtml: string }
