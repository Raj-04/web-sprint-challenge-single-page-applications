import React from 'react';
import styled from  'styled-components';


const Image = styled.img `
border: 1px solid black;
margin: 3% ;
height: 60vh; `

export default function Pic(props){
    const {pic} = props;

    return (

        <div>
            <Image src={pic} alt="Pizza Photo"/>
        </div>

    )
} 