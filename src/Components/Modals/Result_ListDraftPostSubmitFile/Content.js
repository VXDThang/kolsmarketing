import React from 'react'
import styled from 'styled-components';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import { DOMAIN_API } from '../../../config/const'
import CircularProgress from '@mui/material/CircularProgress';

const FormStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

export default function Content(props) {
    const { id_draft, indexChoice, content, type } = props;
    const [inputValue, setInputValue] = React.useState(content[indexChoice].review);
    const [isEvaluate, setIsEvaluate] = React.useState(false)
    const [showSuccessEvaluate, setShowSuccessEvaluate] = React.useState(false)
    let actoken = localStorage.access_token;

    const handleEvaluateSuccess = () => {

        setShowSuccessEvaluate(true);
        setTimeout(() => {
            setShowSuccessEvaluate(false);
        }, 3000);
    };

    async function AcceptDraftPost() {
        setIsEvaluate(true)
        try {
            let url1 = "";
            url1 = DOMAIN_API + `social/accept-draft-post`;
            await fetch(url1, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "x-access-token": actoken
                },
                body: JSON.stringify({ id: id_draft, review: inputValue })
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        if (result) {
                            type(indexChoice, "1", inputValue)
                            setIsEvaluate(false)
                            handleEvaluateSuccess()
                        }

                    }
                )
        }
        catch (error) {
            console.log("error: ", error)
        }
        finally {
        }
    }

    async function RejectDraftPost() {
        setIsEvaluate(true)
        try {
            let url1 = "";
            url1 = DOMAIN_API + `social/reject-draft-post`;
            await fetch(url1, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "x-access-token": actoken
                },
                body: JSON.stringify({ id: id_draft, review: inputValue })
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        if (result) {
                            type(indexChoice, "2", inputValue)
                            setIsEvaluate(false)
                            handleEvaluateSuccess()
                        }

                    }
                )
        }
        catch (error) {
            console.log("error: ", error)
        }
        finally {
        }
    }

    React.useEffect(() => {
        setInputValue("")
        setInputValue(content[indexChoice].review)
    }, [indexChoice])


    if (indexChoice == null)
        return (
            <div>
                Chọn một bài để xem chi tiết
            </div>

        )
    else
        return (

            <div style={{ height: "70vh", overflowY: "auto", backgroundColor: "#EEEEEE", padding: "20px", borderRadius: "5px" }}>
                <div style={{}}>
                    <div style={{ fontWeight: 450, fontSize: "14px",marginTop:"-10px" }}>
                        Nội dung
                    </div>
                    <div style={{ paddingTop: "0px" }}>
                        <pre style={{ display: "block", whiteSpace: "pre-line", fontWeight: 400, fontSize: "14px", fontFamily: "Arial" }}>
                            {content[indexChoice].content ? content[indexChoice].content : "Không có"}
                        </pre>
                    </div>
                    <div style={{ paddingTop: "0px", fontWeight: 450, fontSize: "14px" }}>
                        Phương tiện
                    </div>
                    <div style={{ paddingTop: "10px" }}>
                        {content[indexChoice].url_image ?
                            <img src={content[indexChoice].url_image} style={{ borderRadius: "5px" }}
                                width="100%" height="auto" />
                            :
                            <div>
                                {content[indexChoice].url_video ?
                                    <video src={content[indexChoice].url_video} style={{ borderRadius: "5px" }}
                                        width="100%" height="auto" controls="controls" autoPlay={false} />
                                    :
                                    <span style={{ fontSize: "14px", fontFamily: "Arial" }}>Không có</span>
                                }

                            </div>}
                    </div>
                    <div style={{ paddingTop: "20px", fontWeight: 450, fontSize: "14px" }}>
                        Nhận xét:
                    </div>
                    <div style={{ paddingTop: "10px" }} >
                        <div style={{
                            padding: "20px", paddingTop: "10px", border: '0.1em solid gray',
                            borderRadius: "5px", backgroundColor: "white"
                        }}>
                            <div>
                                <div style={{ fontWeight: "450", fontSize: "14px" }}>
                                    Nội dung
                                </div>
                                <div style={{ paddingTop: "5px" }}>

                                    <FormStyled style={{ border: inputValue ? "1px solid #00B14F" : "1px solid #c4c4c4" }}>
                                        <InputBase
                                            sx={{ ml: "15px", flex: 1, fontSize: "15px", }}
                                            placeholder="Nhập nội dung nhận xét ..."
                                            multiline
                                            maxRows={6}
                                            rows="4"
                                            value={inputValue}
                                            onChange={(event) => {
                                                setInputValue(event.target.value);
                                            }}
                                        />
                                    </FormStyled>

                                </div>

                                {showSuccessEvaluate ?
                                    <div style={{ color: "#00B14F", fontSize: "14px" }}>
                                        Đã nhận xét
                                    </div> : ""}

                                {isEvaluate ?
                                    <div>
                                        <div style={{ textAlign: "center", paddingBottom: "30px" }}>
                                            <div style={{ marginTop: "20px" }}>
                                                <CircularProgress size="2rem" />
                                                <span style={{ paddingLeft: "20px", paddingBottom: "5px" }}>Đang xử lí ...</span>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-between"
                                            style={{ paddingTop: "20px", paddingLeft: "30px", paddingRight: "30px" }}>
                                            <div >
                                                <Button fullWidth variant="contained"
                                                    sx={{
                                                        width: "150px", fontWeight: 450,
                                                        textTransform: 'none', backgroundColor: "gray",
                                                        fontFamily: "Arial", fontSize: "15px", boxShadow: "none", color: "black",
                                                        cursor: "not-allowed"
                                                    }}
                                                >
                                                    Chấp nhận
                                                </Button>
                                            </div>
                                            <div>
                                                <Button fullWidth variant="contained"
                                                    sx={{
                                                        width: "150px", fontWeight: 450,
                                                        textTransform: 'none', backgroundColor: "gray",
                                                        fontFamily: "Arial", fontSize: "15px", boxShadow: "none", color: "black",
                                                        cursor: "not-allowed"
                                                    }}
                                                >
                                                    Cần chỉnh sửa
                                                </Button>
                                            </div>
                                        </div>


                                    </div>
                                    :
                                    <div className="d-flex justify-content-between"
                                        style={{ paddingTop: "20px", paddingLeft: "30px", paddingRight: "30px" }}>

                                        <div style={{ marginBottom: "0px" }}>
                                            <Button fullWidth variant="contained"
                                                sx={{
                                                    width: "150px", fontWeight: 450,
                                                    textTransform: 'none', backgroundColor: "#00b14f",
                                                    fontFamily: "Arial", fontSize: "15px", boxShadow: "none",
                                                    "&:hover": { bgcolor: "green" }
                                                }}
                                                onClick={AcceptDraftPost}
                                            >
                                                Chấp nhận
                                            </Button>
                                        </div>

                                        <div style={{ marginBottom: "0px" }}>
                                            <Button fullWidth variant="contained"
                                                sx={{
                                                    width: "150px",
                                                    textTransform: 'none', backgroundColor: "#FF0000",
                                                    fontFamily: "Arial", fontSize: "15px", boxShadow: "none",
                                                    "&:hover": { bgcolor: "#EE0000" }
                                                }}
                                                onClick={RejectDraftPost}
                                            >
                                                Cần chỉnh sửa
                                            </Button>
                                        </div>

                                    </div>
                                }

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
}
