import { Spin } from 'antd';
import { Content } from 'antd/es/layout/layout';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import loading from "./images/giphy.gif"
import { useNavigate } from 'react-router-dom';

function Waitting(props) {
    const navigate = useNavigate();
    const [hasCheckedPaypal, setHasCheckedPaypal] = useState(false);

    useEffect(() => {
        if (!hasCheckedPaypal) {
            const timeoutId = setTimeout(function () {
                CheckPaypal();
                setHasCheckedPaypal(true); // Đánh dấu rằng đã kiểm tra Paypal
            }, 3000);

            return () => clearTimeout(timeoutId); // Hủy bỏ timeout nếu component unmount trước khi nó kết thúc
        }
    }, [hasCheckedPaypal]);

    function CheckPaypal() {
        axios.post("https://localhost:7177/api/Payment/capture-order/" + localStorage.getItem("id_DH"))
            .then((res) => {
                const data = res.status
                if (res.status === 200) {
                    navigate("/respone", { state: { data } });
                    console.log(data);
                } else {
                    navigate("/respone", { state: { data } });
                    console.log(data);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div>
              <img src={loading} alt='waiting' height={"744px"} width={"1520px"}/>
        </div>
    );
}

export default Waitting;
