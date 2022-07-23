import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./Register.css"
import * as React from 'react';
import { useState } from "react";
import { Navigate, Link } from 'react-router-dom';
import { DOMAIN_API } from '../../../config/const';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

export default function Login({ socket, setIsLogined, navigate }) {
    const [name, setFullname] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [brandname, setBrandname] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [emailErrorFormat, setEmailErrorFormat] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorFullname, setErrorFullname] = useState('');
    const [canRegister, setCanRegister] = useState('');
    const [canLogin, setCanLogin] = useState(false);

    const [provinces, setProvince] = useState([]);

    async function getAllProvince() {
        try {
          let url1 = "";
          url1 = DOMAIN_API + `list-province-vn`;
          await fetch(url1, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then(res => res.json())
            .then(
              (result) => {
                setProvince(result);
              }
            )
        }
        catch (error) {
          console.log("error: ", error)
        }
        finally {
        }
      }

    function handleChangeBrandname(event) {
        setBrandname(event.target.value)
    }
    function handleChangePassword(event) {
        setPassword(event.target.value)
    }
    function handleChangeFullname(event) {
        setFullname(event.target.value);
    }
    function handleChangeEmail(event) {
        setEmail(event.target.value);
    }
    function handleChangeGender(event) {
        setGender(event.target.value);
    }
    function handleChangeAddress(event) {
        setAddress(event.target.value);
    }
    function handleChangePhone(event) {
        setPhone(event.target.value);
    }
    function invalidEmail(email) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(email.match(mailformat)){
            let flag = true;
            fetch(DOMAIN_API+`is-available-email`,{
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            })
            .then(res => res.json())
            .then(
                (result)=>{
                    if(result == true) {
                        setEmailErrorFormat('');
                    }else{
                        setEmailErrorFormat('Email không hợp lệ!');
                        setCanRegister('Đăng ký không thành công');
                        return false;
                    }
                }
            )
        }else{
            return false;
        }
    }
    function invalidPassword(password) {
        if(password === ''){
            window.alert("Bạn chưa nhập Mật khẩu!")
            setErrorPassword("Bạn chưa nhập password");
            setCanRegister('Đăng ký không thành công');
            return 0;
        }
        else{
            if(password.length < 8 || password.length > 25){
                window.alert("Mật khẩu chưa đúng yêu cầu. Mật khẩu phải dài 8 đến 25 kí tự!")
                setErrorPassword("Mật khẩu phải dài 8 đến 25 kí tự");
                setCanRegister('Đăng ký không thành công');
                return 0;
            }
        }
        return 1;
    }
    function invalidFullname(fullname) {
        if(fullname === ''){
            window.alert("Chưa nhập Họ và tên!")
            setErrorFullname("Bạn chưa nhập họ tên");
            setCanRegister('Đăng ký không thành công');
            return 0;
        }
        else{
        }
        return 1;
    }
    async function handleSubmit(event) {
        event.preventDefault();
        setCanRegister('');
        let flag_mail  = await invalidEmail(email);
        if (flag_mail === false) {
            window.alert("Email không hợp lệ!")
            setEmailErrorFormat('Email không hợp lệ!');
            setCanRegister('Đăng ký không thành công');
        }
        let flag_password = invalidPassword(password);
        if (flag_password == 1){
            setErrorPassword('')
        }
        let flag_name = invalidFullname(name);
        if (flag_name == 1){
            setErrorFullname('');
        }
        let fullname = name;
        if(brandname =='' )
        window.alert("Chưa nhập tên nhãn hàng!")
        if(gender =='' )
        window.alert("Chưa chọn giới tính!")
        if(address =='' )
        window.alert("Chưa chọn địa chỉ Tỉnh/ Thành phố!")

        fetch(DOMAIN_API+`is-available`,{
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullname, email, password, phone, address, gender, brandname })
        })
        .then(res => res.json())
        .then(
            (result)=>{
                if(result == true){
                    
                    if (fullname !== '' && password !== '' &&  email!=='' ) {
                        const url = DOMAIN_API + "register-brands";
                        const requestOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({fullname, email, password, phone, address, gender, brandname })
                        };
                        fetch(url, requestOptions)
                        .then(res => res.json())
                        .then((result) => {
                            if(result == true){
                                window.alert("Đăng kí thành công!")
                                setCanLogin(true);
                            }
                        })
                        .catch(error => console.log('Form submit error', error))
                    }
                    
                }
                else{
                   setCanRegister('Đăng kí không thành công')
                }
            }
        )
            
        
    };

    React.useEffect(() => {
        getAllProvince();
      }, [])

    if(canLogin){
        return (
            <Navigate to="/brand-login"/>
        )
    }
    if (localStorage.access_token){
        socket?.disconnect();
        localStorage.removeItem("access_token");
        return (
            <Navigate to="/brand-register"/>
        );
    }
    return (
        <div>
            <div className='back-ground'></div>
            <div className='back' >
            <Link to="/brand-login" style={{ fontSize: "16px", color: "white",
            textDecoration: "none", cursor:"pointer"  }}> 
            Quay lại</Link>
            </div>
            <div className='title'  style={{fontWeight:"600", fontSize: "30px", color: "white" }} >
                Đăng ký tài khoản
            </div>
            <div className='paper'>
                <div className='regulation'>
                    <div style={{ paddingTop: "20px", paddingBottom: "20px", paddingLeft: "40px", paddingRight: "40px" }}>
                        <div style={{ fontSize: "18px", fontWeight: "bold" }} >
                            Quy định
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            Để đảm bảo chất lượng dịch vụ, KOLsMarketing không cho phép một người dùng tạo nhiều tài khoản khác nhau.
                            <br />
                            Nếu phát hiện vi phạm, KOLsMarketing sẽ ngừng cung cấp dịch vụ tới tất cả các tài khoản trùng lặp hoặc chặn toàn bộ truy cập tới hệ thống website của KOLsMarketing.
                            <br />
                            Đối với trường hợp khách hàng đã sử dụng hết 3 tin tuyển dụng miễn phí, KOLsMarketing hỗ trợ kích hoạt đăng tin tuyển dụng không giới hạn sau khi quý doanh nghiệp cung cấp thông tin giấy phép kinh doanh.
                        </div>
                        <div style={{ paddingTop: "20px" }}>
                            <p > <span> Bạn đã có tài khoản?</span>
                                <Link to="/brand-login" style={{ color: "#00B14F", textDecoration: "none" }}> Đăng nhập ngay</Link>
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <form>
                        <div style={{ paddingTop: "20px", paddingBottom: "20px", paddingLeft: "40px", paddingRight: "40px" }}>
                            <div style={{ fontSize: "18px", fontWeight: "bold" }} >
                                TÀI KHOẢN
                            </div>
                            <br />
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    Email đăng nhập *
                                </Grid>
                                <Grid item xs={8} className="center-parent">
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        id="email" 
                                        aria-describedby="emailHelp" 
                                        placeholder="Email"
                                        value={email}
                                        onChange = {handleChangeEmail} />
                                </Grid>
                                <Grid item xs={4}>
                                    Số điện thoại *
                                </Grid>
                                <Grid item xs={8} className="center-parent">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="phone" 
                                        aria-describedby="emailHelp" 
                                        placeholder="Số điện thoại" 
                                        value={phone}
                                        onChange = {handleChangePhone}/>
                                </Grid>
                                <Grid item xs={4}>
                                    Mật khẩu *
                                </Grid>
                                <Grid item xs={8} className="center-parent">
                                    <input 
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="form-control"
                                        placeholder="Mật khẩu (Từ 8 đến 25 ký tự)"
                                        value={password}
                                        onChange = {handleChangePassword}
                                    />
                                </Grid>
                            </Grid>
                            <div style={{ paddingTop: "30px" }}>
                                <div style={{ fontSize: "18px", fontWeight: "bold" }} >
                                    THÔNG TIN NHÃN HÀNG, NHÀ TUYỂN DỤNG
                                </div>
                                <br />
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        Họ và tên *
                                    </Grid>
                                    <Grid item xs={8} className="center-parent">
                                        <input 
                                        type="text" 
                                        className="form-control" 
                                        id="fullname" 
                                        aria-describedby="emailHelp" 
                                        placeholder="Họ tên" 
                                        value={name}
                                        onChange = {handleChangeFullname}
                                    />
                                    </Grid>
                                    <Grid item xs={4}>
                                        Giới tính *
                                    </Grid>
                                    <Grid item xs={8} className="center-parent">
                                        <div className="form-group">
                                            <select className="form-control" id="gender_select" onChange={handleChangeGender} value={gender}>
                                                <option value="1">Nam</option>
                                                <option value="2">Nữ</option>
                                                <option value="3">Khác</option>
                                            </select>
                                            <small id="gender_help" className="form-text text-muted">* Nhấn để chọn.</small>
                                        </div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        Tên nhãn hàng *
                                    </Grid>
                                    <Grid item xs={8} className="center-parent">
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="brandname" 
                                            aria-describedby="emailHelp" 
                                            placeholder="Tên nhãn hàng" 
                                            value={brandname}
                                            onChange = {handleChangeBrandname}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        Tỉnh/ Thành phố *
                                    </Grid>
                                    <Grid item xs={8} className="center-parent">
                                        <div className="form-group">
                                            <select className="form-control" id="province_select" onChange={handleChangeAddress} value={address}>
                                                {/* <option value="79">TP Hồ Chí Minh</option>
                                                <option value="01">Hà Nội</option>
                                                <option value="48">Đà Nẵng</option>
                                                <option value="22">Quảng Ninh</option>
                                                <option value="92">Cần Thơ</option>
                                                <option value="77">Vũng Tàu</option> */}
                                                {provinces.length>0 && provinces.map((list)=>(
                                                    <option key={list.id} value={list.id}>{list.name}</option>
                                                ))}

                                            </select>
                                            <small id="address" className="form-text text-muted">* Nhấn để chọn.</small>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                            <br />
                            <p className="forgot-password text-right"> <span>  Bằng việc đăng ký tài khoản, bạn đã đồng ý với</span>
                                <Link to="/register" style={{ color: "#00B14F", textDecoration: "none" }}> Điều khoản dịch vụ</Link>
                                <span> và</span> <Link to="/register" style={{ color: "#00B14F", textDecoration: "none" }}>  Chính sách bảo mật </Link>
                                <span>của chúng tôi</span>
                            </p>
                            <div style={{textAlign:"center"}}>
                                <Button type="submit" fullWidth
                                    name="signin" id="signin" value="Đăng nhập" variant="contained"
                                    style={{ backgroundColor: "#00B14F", width: "auto" }}
                                    onClick={handleSubmit}>Đăng ký
                                </Button>
                            </div>


                        </div>
                    </form>
                </div>
            </div>


        </div>
    )
}
