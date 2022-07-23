import React from 'react'
import { DOMAIN_API } from '../../../../config/const'

import Show_Recruitment_Post from './Show_Recruitment_Post'

export default function Content_Noti_Type1({ idJobDescribe, idPost, load }) {
    let actoken = localStorage.access_token;

    const [detailPost, setDetailPost] = React.useState(null);
    const [loadingDetail, setLoadingDetail] = React.useState(true);

    async function getDetailPost(id_post) {
        try {
            let url1 = "";
            url1 = DOMAIN_API + `posts/get-detail-post/${id_post}`;
            await fetch(url1, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "x-access-token": actoken
                },
                body: JSON.stringify({ id_post: id_post })
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        setDetailPost(result);
                    }
                )
        }
        catch (error) {
            console.log("error: ", error)
        }
        finally {
            setLoadingDetail(false)
        }
    }

    React.useEffect(() => {
        if(idPost)
        {
            getDetailPost(idPost);
        }
        
    }, [idPost, load])

    if (loadingDetail)
        return (
            <div>
                Đang tải dữ liệu ...
            </div>
        )
    else
        return (
            <div sx={{ flexGrow: 1 }}  >
                <div>
                    <div>
                        <Show_Recruitment_Post
                            detailPost={detailPost}
                            id={idPost}
                            load={load}
                        />
                    </div>

                </div>
            </div >
        )
}
