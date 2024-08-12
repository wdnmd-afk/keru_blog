import React from "react";
import {Http} from '../../utils'

const Login: React.FC = () => {
    const testApi = async () => {
        const {data} = await Http.post('/user/create', {})
        console.log(data)
    }

    return (
        <div onClick={testApi}>
            Login
        </div>
    );
};

export default Login;