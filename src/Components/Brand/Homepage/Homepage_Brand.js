import React from 'react';
import {
    Chart as ChartJS,
    PointElement,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

//file
import { DOMAIN_API } from '../../../config/const'
import StatisticLikeShareCmt from './StatisticLikeShareCmt'

//icon
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';

ChartJS.register(
    PointElement,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);


const SidebarStyled = styled.div`
  background: #f0f2f5;
  color: black;
  min-height:calc(100vh - 65px);
  font-size: 14px;

 
`;

const options = {
    // plugins: {
    //     title: {
    //         display: true,
    //         text: 'Visitor',//setting chart title
    //     }
    // },
    scales: {
        x: {
            display: true,
            title: {
                display: true,
                text: 'Tháng'//setting Name of X axis 
            }
        },
        y: {
            display: true,
            title: {
                display: true,
                text: 'Bài tuyển dụng/ Chiến dịch',//Name of Y axis 
                font: {
                    family: "Arial",
                    size: "18px",
                    weight: 500,
                    color: "gray"
                }
            }
        }
    }
}

const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
        {
            label: "Số bài tuyển dụng",
            data: [4, 5, 1, 2, 4, 6],
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)"
        },
        //   {
        //     label: "Second dataset",
        //     data: [33, 25, 35, 51, 54, 76],
        //     fill: false,
        //     borderColor: "#742774"
        //   }
    ]
};

export default function Homepage_Brand() {

    let actoken = localStorage.access_token;
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const [kolLikeBrand, setKolLikeBrand] = React.useState(0);
    const [kolBrandLike, setKolBrandLike] = React.useState(0);
    const [kolWorkWithBrand, setKolWorkWithBrand] = React.useState(0);
    const [recruitmentOfBrand, setRecruitmentOfBrand] = React.useState(0);
    const [yearSelected, setYearSelected] = React.useState('');
    const [yearStatistic, setYearStatistic] = React.useState([]);
    const [allStatisticPostData, setAllStatisticPostData] = React.useState([]);

    const [chartOptions, setChartOptions] = React.useState({});
    const [postChartData, setPostChartData] = React.useState({
        labels: [0],
        datasets: [
            {
                label: "Số bài Tuyển dụng / Chiến dịch",
                data: [0],
                fill: true,
                backgroundColor: "green",
                borderColor: "green",
            },
        ],

    });

    const handleSelectYear = (event) => {
        setYearSelected(event.target.value)
        let temp = event.target.value;
        for (let i = 0; i < allStatisticPostData.length; i++) {
            if (allStatisticPostData[i].year == temp) {
                let labels = allStatisticPostData[i].statistic.map((list) => (list.mon));
                let data = allStatisticPostData[i].statistic.map((list) => (list.total));
                setPostChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: "Số bài Tuyển dụng/ Chiến dịch",
                            data: data,
                            fill: true,
                            backgroundColor: "green",
                            borderColor: "green"
                        },
                    ]
                })
                break;
            }

        }
    }



    async function countKolLikeBrand() {
        setLoading(true);
        try {
            let url1 = "";
            url1 = DOMAIN_API + `statistic/count-kol-like-brand`;
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
                        setKolLikeBrand(result);
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

    async function countKolBrandLike() {
        setLoading(true);
        try {
            let url1 = "";
            url1 = DOMAIN_API + `statistic/count-kol-brand-like`;
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
                        setKolBrandLike(result);
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

    async function countKolWorkWithBrand() {
        setLoading(true);
        try {
            let url1 = "";
            url1 = DOMAIN_API + `statistic/count-kol-work-with-brand`;
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
                        setKolWorkWithBrand(result);
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

    async function countRecruitmentOfBrand() {
        setLoading(true);
        try {
            let url1 = "";
            url1 = DOMAIN_API + `statistic/count-recruitment-of-brand`;
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
                        setRecruitmentOfBrand(result);

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

    async function countPostOfBrand() {
        setLoading(true);
        try {
            let url1 = "";
            url1 = DOMAIN_API + `statistic/count-post-of-brand-per-month`;
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
                        setAllStatisticPostData(result);

                        let tempYearStatistic = []
                        for (let i = 0; i < result.length; i++) {
                            tempYearStatistic.push({
                                "id": i,
                                "year": result[i].year
                            })
                        }
                        setYearStatistic(tempYearStatistic);
                        setYearSelected(result[result.length - 1].year)

                        let labels = result[result.length - 1].statistic.map((list) => (list.mon));
                        let data = result[result.length - 1].statistic.map((list) => (list.total));
                        setPostChartData({
                            labels: labels,
                            datasets: [
                                {
                                    label: "Số bài Tuyển dụng/ Chiến dịch",
                                    data: data,
                                    fill: true,
                                    backgroundColor: "green",
                                    borderColor: "green"
                                },
                            ]
                        }
                        )
 
                    })
                }
        catch (error) {
                setError(error)
            }
            finally {
                setLoading(false);
            }
        }

    async function countLikeShareCmtPerPost() {
            setLoading(true);
            try {
                let url1 = "";
                url1 = DOMAIN_API + `statistic/count-like-share-cmt-per-post`;
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
                            console.log("GetcountLikeShareCmtPerPost: ", result);
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
            countKolLikeBrand();
            countKolBrandLike();
            countKolWorkWithBrand();
            countRecruitmentOfBrand();
            countPostOfBrand();
            countLikeShareCmtPerPost();
        }, [])

        return (
            <SidebarStyled>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div className="d-flex justify-content-between">
                            <div key="1"
                                style={{ width: "23%", backgroundColor: "white", borderRadius: "10px", height: "200px" }}>
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
                                    Bài tuyển dụng
                                </div>

                                <div style={{
                                    display: "flex", justifyContent: "center",
                                    fontSize: "20px", fontWeight: "500", paddingTop: "15px"
                                }}>
                                    {recruitmentOfBrand}
                                </div>

                            </div>

                            <div key="2"
                                style={{ width: "23%", backgroundColor: "white", borderRadius: "10px", height: "200px" }}>
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
                                    Kol bạn đang quan tâm
                                </div>

                                <div style={{
                                    display: "flex", justifyContent: "center",
                                    fontSize: "20px", fontWeight: "500", paddingTop: "15px"
                                }}>
                                    {kolBrandLike}
                                </div>

                            </div>

                            <div key="3"
                                style={{ width: "23%", backgroundColor: "white", borderRadius: "10px", height: "200px" }}>
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
                                    Kol đang theo dõi bạn
                                </div>

                                <div style={{
                                    display: "flex", justifyContent: "center",
                                    fontSize: "20px", fontWeight: "500", paddingTop: "15px"
                                }}>
                                    {kolLikeBrand}
                                </div>

                            </div>

                            <div key="4"
                                style={{ width: "23%", backgroundColor: "white", borderRadius: "10px", height: "200px" }}>
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <div style={{ paddingTop: "20px" }}>
                                        <Avatar sx={{
                                            width: 50, height: 50, bgcolor: "#CC00CC",
                                            "&:hover": { bgcolor: "#800080" }
                                        }}>
                                            <RecordVoiceOverIcon sx={{ fontSize: 30 }} />
                                        </Avatar>
                                    </div>

                                </div>

                                <div style={{ paddingTop: "20px", paddingLeft: "15px", paddingRight: "15px" }}>
                                    <Divider sx={{ bgcolor: "#800080" }} />
                                </div>
                                <div style={{
                                    display: "flex", justifyContent: "center",
                                    fontSize: "18px", fontWeight: "500", paddingTop: "10px", color: "gray"
                                }}>
                                    Kol đang làm việc cùng
                                </div>

                                <div style={{
                                    display: "flex", justifyContent: "center",
                                    fontSize: "20px", fontWeight: "500", paddingTop: "15px"
                                }}>
                                    {kolWorkWithBrand}
                                </div>

                            </div>

                        </div>
                    </Grid>
                    <Grid item xs={12}>

                        <div style={{ paddingTop: "20px", width: "100%" }}>
                            <div style={{
                                backgroundColor: "white",
                                borderRadius: "10px", padding: "20px",
                                position: "relative"
                            }}>
                                <div className="d-flex justify-content-between">
                                    <div style={{ fontSize: "18px", fontWeight: 500 }}>
                                        Các bài Tuyển dụng/ Chiến dịch của bạn
                                    </div>
                                    <div>
                                        <div>
                                            {/* <span style={{ paddingBottom: "-15px", marginRight: "15px" }}>
                                                Hiển thị theo
                                            </span> */}
                                            <span style={{ paddingBottom: "15px" }}>
                                                <FormControl sx={{ width: "200px" }}>
                                                    <InputLabel size="small" id="demo-simple-select-label"
                                                        sx={{
                                                            fontSize: "14px",
                                                            color: yearSelected ? "green" : "#c0c0c0",
                                                            fontWeight: yearSelected ? 600 : 400,
                                                        }}>{yearSelected ? <span>Năm </span> : <span>Chọn năm </span>}</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={yearSelected}
                                                        label={yearSelected ? <span>Năm </span> : <span>Chọn năm </span>}
                                                        onChange={handleSelectYear}
                                                        size="small"

                                                    >

                                                        {yearStatistic.length > 0 && yearStatistic.map((year) => (
                                                            <MenuItem value={year.year} key={year.id} >{year.year}</MenuItem>
                                                        ))}


                                                    </Select>

                                                </FormControl>
                                            </span>
                                        </div>

                                    </div>
                                </div>
                                <div>
                                    {yearSelected ?
                                        <Bar data={postChartData}
                                            options={options} />
                                        : ""
                                    }

                                </div>

                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div style={{ paddingTop: "20px", width: "100%" }}>
                            <StatisticLikeShareCmt />
                        </div>
                    </Grid>
                </Grid>
            </SidebarStyled>
        );
    }