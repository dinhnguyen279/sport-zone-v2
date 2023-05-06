import React from 'react';
function LogoutLink() {
    return (
        <>
            <li style={{ fontWeight: "600" }}>
                <a className="nav-link" href={`/signin`} >
                    Đăng nhập
                </a>
            </li>
            <li className='d-none d-lg-block'>
                {"|"}
            </li>
            <li style={{ fontWeight: "600" }}>
                <a className="nav-link" href={`/signup`} >
                    Đăng ký
                </a>
            </li>
        </>
    );
}

export default LogoutLink;