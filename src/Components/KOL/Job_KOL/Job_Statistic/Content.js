import * as React from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  import { Bar  } from "react-chartjs-2";

import { DOMAIN_API } from '../../../../config/const';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';


//file

//icon
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

export default function Statistic_Number() {

    let actoken = localStorage.access_token;
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const [jobOfKol, setJobOfKol] = React.useState(0);
    const [publishPost, setPublishPost] = React.useState(0);
    const [schedulePost, setSchedulePost] = React.useState(0);
    const [draftPost, setDraftPost] = React.useState(0);
    const [brandKolLike, setBrandKolLike] = React.useState(0);
    const [brandLikeKol, setBrandLikeKol] = React.useState(0);

    const [chartOptions, setChartOptions] = React.useState({});
    const [postChartData, setPostChartData] = React.useState({
        type: "doughnut",
        labels: ["Bài viết đã đăng", "Bài viết hẹn lịch", "Bài viết nháp"],
        datasets: [
            {
                label: "Các bài viết",
                data: [0, 0, 0],
                backgroundColor: [
                    "#ffbb11",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0"
                ]
            }
        ]
    });



async function countJobOfKol() {
    setLoading(true);
    try {
        let url1 = "";
        url1 = DOMAIN_API + `statistic/count-job-of-kol`;
        await fetch(url1, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": actoken
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setJobOfKol(result);
                }
            )
    }
    catch (error) {
        setError(error)
    }
    finally {
        setLoading(false);
    }
}

async function countPublishAndDraftPost() {
    setLoading(true);
    try {
        let url1 = "";
        url1 = DOMAIN_API + `statistic/count-publish-and-draft-post`;
        await fetch(url1, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": actoken
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setPublishPost(result.post_done);
                    setSchedulePost(result.post_schedule);
                    setDraftPost(result.post_draft);
                    setPostChartData({
                        type: "doughnut",
                        labels: ["Bài viết đã đăng", "Bài viết hẹn lịch", "Bài viết nháp"],
                        datasets: [
                            {
                                label: "Các bài viết",
                                data: [result.post_done, result.post_schedule, result.post_draft],
                                backgroundColor: [
                                    "#00B14F",
                                    "#F0C01D",
                                    "#EE0000",
                                    "#f3ba2f",
                                    "#2a71d0"
                                ]
                            }
                        ]
                    });
                    setChartOptions({
                        responsive: true,
                        plugins: {
                          legend: {
                            position: "top",
                          },
                          title: {
                            display: true,
                            text: "Các bài viết",
                            font: {
                                size: "18px",
                                weight: 500,
                                color: "black"
                              }
                          },
                        },
                      });
                }
            )
    }
    catch (error) {
        setError(error)
    }
    finally {
        setLoading(false);
    }
}

async function countBrandKolLike() {
    setLoading(true);
    try {
        let url1 = "";
        url1 = DOMAIN_API + `statistic/count-brand-kol-like`;
        await fetch(url1, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": actoken
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setBrandKolLike(result);
                }
            )
    }
    catch (error) {
        setError(error)
    }
    finally {
        setLoading(false);
    }
}

async function countBrandLikeKol() {
    setLoading(true);
    try {
        let url1 = "";
        url1 = DOMAIN_API + `statistic/count-brand-like-kol`;
        await fetch(url1, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": actoken
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setBrandLikeKol(result);
                }
            )
    }
    catch (error) {
        setError(error)
    }
    finally {
        setLoading(false);
    }
}

React.useEffect(() => {
    countJobOfKol();
    countPublishAndDraftPost();
    countBrandKolLike();
    countBrandLikeKol();
}, [])



return (
    <div>
        <div className="d-flex justify-content-between">
            <div style={{ width: "30%", backgroundColor: "white", borderRadius: "10px", height: "200px" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{ paddingTop: "20px" }}>
                        <Avatar sx={{
                            width: 50, height: 50, bgcolor: "#00B14F",
                            "&:hover": { bgcolor: "green" }
                        }}>
                            <BusinessCenterIcon sx={{ fontSize: 30 }} />
                        </Avatar>
                    </div>

                </div>

                <div style={{ paddingTop: "20px", paddingLeft: "15px", paddingRight: "15px" }}>
                    <Divider sx={{ bgcolor: "#00B14F" }} />
                </div>
                <div style={{
                    display: "flex", justifyContent: "center",
                    fontSize: "18px", fontWeight: "500", paddingTop: "10px", color: "gray"
                }}>
                    Công việc
                </div>

                <div style={{
                    display: "flex", justifyContent: "center",
                    fontSize: "20px", fontWeight: "500", paddingTop: "15px"
                }}>
                    {jobOfKol}
                </div>

            </div>

            <div style={{ width: "30%", backgroundColor: "white", borderRadius: "10px", height: "200px" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{ paddingTop: "20px" }}>
                        <Avatar sx={{
                            width: 50, height: 50, bgcolor: "#F0C01D",
                            "&:hover": { bgcolor: "#F0A318" }
                        }}>
                            <PeopleAltIcon sx={{ fontSize: 30 }} />
                        </Avatar>
                    </div>

                </div>

                <div style={{ paddingTop: "20px", paddingLeft: "15px", paddingRight: "15px" }}>
                    <Divider sx={{ bgcolor: "#F0A318" }} />
                </div>
                <div style={{
                    display: "flex", justifyContent: "center",
                    fontSize: "18px", fontWeight: "500", paddingTop: "10px", color: "gray"
                }}>
                    Theo dõi nhãn hàng
                </div>

                <div style={{
                    display: "flex", justifyContent: "center",
                    fontSize: "20px", fontWeight: "500", paddingTop: "15px"
                }}>
                    {brandKolLike}
                </div>

            </div>

            <div style={{ width: "30%", backgroundColor: "white", borderRadius: "10px", height: "200px" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{ paddingTop: "20px" }}>
                        <Avatar sx={{
                            width: 50, height: 50, bgcolor: "#EE0000",
                            "&:hover": { bgcolor: "#DD0000" }
                        }}>
                            <FavoriteIcon sx={{ fontSize: 30 }} />
                        </Avatar>
                    </div>

                </div>

                <div style={{ paddingTop: "20px", paddingLeft: "15px", paddingRight: "15px" }}>
                    <Divider sx={{ bgcolor: "#EE0000" }} />
                </div>
                <div style={{
                    display: "flex", justifyContent: "center",
                    fontSize: "18px", fontWeight: "500", paddingTop: "10px", color: "gray"
                }}>
                    Nhãn hàng quan tâm
                </div>

                <div style={{
                    display: "flex", justifyContent: "center",
                    fontSize: "20px", fontWeight: "500", paddingTop: "15px"
                }}>
                    {brandLikeKol}
                </div>

            </div>

        </div>

        <div style={{paddingTop:"20px"}}>
            <div style={{backgroundColor: "white", borderRadius: "10px", padding:"20px" }}>
                 <Bar options={chartOptions} data={postChartData}
                   />
            </div>
        </div>

    </div>
);

}