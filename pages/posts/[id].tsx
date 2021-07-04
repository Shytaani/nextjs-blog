import utilStyles from '../../styles/utils.module.css'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import { PostDataWithContent } from '../../type/PostData'
import { PostId } from '../../type/PostId'

export default function Post({ postData }: { postData: PostDataWithContent }): JSX.Element {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths(): Promise<{
  paths: PostId[],
  fallback: boolean
}> {
  const paths: PostId[] = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }: PostId): Promise<{
  props: {
     postData: PostDataWithContent
  }
}> {
  const postData: PostDataWithContent = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}
