import GoogleLogin from "react-google-login";
import {googleClientID, DOMAIN_API} from '../../../../config/const';

export default function LoginByGoogle({reload, navigate}){
    function  onGoogleLoginSuccess(googleAuth){
        const profile = googleAuth.profileObj;
        const accountGoogle = {
            email: profile.email,
            fullname: profile.name,
            password: profile.googleId
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(accountGoogle)
        };
        fetch(DOMAIN_API+'google-login',requestOptions)
            .then(res => res.json())
            .then((result) => {
                localStorage.setItem('access_token', result.access_token);
                // navigate('/');
                // reload('');
                window.location.href = '/';
            })
            .catch(error => console.log('Google login error', error))
    }

    function onGoogleLoginFailure(error){
        
    }

    return (<GoogleLogin
        clientId={googleClientID}
        buttonText='Google'
        onSuccess={onGoogleLoginSuccess}
        onFailure={onGoogleLoginFailure}
    />)
}

