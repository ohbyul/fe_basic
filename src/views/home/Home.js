import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";// 슬라이드 임포트
import { Autoplay, Pagination, Navigation } from "swiper";// 슬라이드 임포트
import "swiper/css";// 슬라이드 임포트
import "swiper/css/pagination";// 슬라이드 임포트
import { actionGetHello } from '../../modules/action/CommonAction';
import axios from 'axios';

const Home = (props) => {
    const [hello , setHello]=useState() 

    useEffect(()=>{
        const server = process.env.SERVER
        actionGetHello().then(res=>{
            setHello(res)
        }).catch(err => {
            console.log(err);
        })
    },[])

    return (
        <div className="section-wrap">
            <div className="main-header-bg"></div>
            <div className="main">
                <div>{hello}</div>
                 
                <Swiper className="con-header mySwiper"
                    modules={[Autoplay, Pagination, Navigation]}
                    pagination={{
                        clickable: true, //네비클릭유무
                    }}
                    autoplay={{
                        delay: 3000, //움직이는 속도
                        disableOnInteraction: false,
                    }}
                >
                    <SwiperSlide className="swiper-slide">
                        <div>1</div>
                        <div className="cursor" onClick={() => props.history.push('/project')}><img src="../images/main_slide1.jpg" /></div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                        <div>2</div>
                        <div className="cursor" onClick={() => props.history.push('/dtx/info')}><img src="../images/main_slide2.jpg" /></div>
                    </SwiperSlide>
                </Swiper>
                <button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-warning">Warning</button>
<button type="button" class="btn btn-info">Info</button>
<button type="button" class="btn btn-light">Light</button>
<button type="button" class="btn btn-dark">Dark</button>
                <div className="con-body"></div>
                <div className="con-footer"></div>
            </div>
        </div>
    )
}

export default Home;
