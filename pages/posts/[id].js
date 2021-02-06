import Layout from '../../components/layout'
import {getAllPostIds, getPostData} from "../../lib/posts";

export async function getStaticPaths() {
  const paths = getAllPostIds()
  console.log(paths);
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({params}) {
  const postData = getPostData(params.id)
  console.log(postData);
  return {
    props: {
      postData
    }
  }
}

export default function Post({postData}) {
  return (
    <Layout>
      {postData.title}
      <br/>
      {postData.id}
      <br/>
      {postData.date}
    </Layout>
  )
}
