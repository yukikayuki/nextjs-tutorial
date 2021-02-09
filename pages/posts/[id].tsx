import Layout from '../../components/layout'
import {getAllPostIds, getPostData, PostData, PostDataWithContent, PostIdParam} from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from '../../styles/utils.module.css';
import {GetStaticPaths, GetStaticProps} from 'next'

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const paths = getAllPostIds()

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<{ postData: PostDataWithContent }, { id: string }> = async ({params}) => {
  const postData = await getPostData(params.id)

  return {
    props: {
      postData
    }
  }
}

export default function Post({postData}: { postData: PostDataWithContent }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date}/>
        </div>
        <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}/>
      </article>
    </Layout>
  )
}
