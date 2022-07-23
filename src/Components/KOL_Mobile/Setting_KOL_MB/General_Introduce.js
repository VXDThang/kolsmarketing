import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';


export default function General_Introduce({ introduce }) {

    return (
        <div>
            <div className='d-flex justify-content-between'>
                <div style={{ fontWeight: "bold", }}>
                    Mô tả
                </div>
            </div>
            <div>
                <pre style={{ display: "block", whiteSpace: "pre-line", fontWeight: 500, fontSize: "14px", fontFamily: "Arial" }}>
                    {introduce ? introduce : "Chưa có thông tin"}
                </pre>
            </div>
        </div>

    );
}
