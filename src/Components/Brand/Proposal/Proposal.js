import React, {useState} from 'react';
import styled from 'styled-components';

//file
import News from './News';
import './Proposal.css';

const divPage = styled.div`
  background: #f0f2f5;
  min-height:calc(100vh - 65px);
`;

export default function Proposal({idBrand}) {

    return (
        <div className="page">
            <News idBrand={idBrand}/>            
        </div>
    );
}