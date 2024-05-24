import RenderBlocks from "@/utils/RenderBlocks";
import axios from "axios";

import React from 'react'

export default function Page(page) {
  return (
    <div>
        <RenderBlocks layout={page.layout} />
    </div>
  );
}

export const getStaticPaths = async () => {
    const pageReq = await axios(`/api/pages/limit=100`);
    const pageData = pageReq.data;

    const returnObj = {
        paths: pageData.docs.map(({slug, id}) => {
            return {
                params: {slug: slug !== 'index' ? slug.split('/') : false},
            }
        }),
        fallback: false,
    }

    console.log('returnObj is', returnObj);
    return returnObj;
}

export const getStaticProps = async(ctx) => {
    const {slug} = ctx.params || {};
    console.log('slug is ',slug);
    //fetch page
    const pathReq = await axios(`/api/pages/?where[slug][equals]=${slug}`);
    // const pathReq = await axios(`/api/pages/${slug}`);
    let pageData = pathReq.data.docs[0];

    console.log('pageData is', pageData);

    return {
        props: {
            page: pageData
        }
    }
}