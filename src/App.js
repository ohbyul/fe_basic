import React, { Component, useEffect, useState, useRef } from 'react'
import { HashRouter, Route, Redirect, Switch, BrowserRouter } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios';
import { hot } from 'react-hot-loader'
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

import "@reach/dialog/styles.css";
import 'jquery-ui-bundle'

import '../src/assets/css/index.css';
import '../src/assets/css/common.css';
import '../src/assets/css/style.css';

import 'bootstrap/dist/css/bootstrap.css';    //부트스트랩
import { DarkThemeToggle, Flowbite, } from 'flowbite-react';

import Loading from "./views/components/Loading";                             // loding-spiner
import ScrollToTop from './utiles/scroll';                                    //scroll
import AlertDialogComponent from "./views/components/AlertDialogComponent";   // alert
import { toast , ToastContainer } from "react-toastify"                       // toast
import { getCookie, setCookie, removeCookie } from "./utiles/cookie";



const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))      // Main Containers

function App() {
  const dispatch = useDispatch()
  const initialMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  //--------------- alert ---------------
  const cancelRef = React.useRef();
  const [showAlertDialog, setShowAlertDialog] = useState(false)
  const [alertDialogObject, setAlertDialogObject] = useState({description: '', close: null})

  const funcAlertMsg = (msg) => {
    setAlertDialogObject({
        description: [msg],
        close: alertDialogClose
    })
    setShowAlertDialog(true)
  }
  const alertDialogClose = () => {
    setShowAlertDialog(false)
  }
  //--------------- alert ---------------
  //toast
  const toastSuccess = (msg) => {
    toast.success( msg, {position: toast.POSITION.BOTTOM_CENTER} )
  }
  //loading spiner
  const [loading, setLoading] = useState(false)
  
  useEffect(()=>{
    //axios 호출시 인터셉트
    axios.interceptors.request.use(function (config) {
      return config
    }, function (error) {
      return Promise.reject(error);
    });

    //axios 호출 종료시 인터셉트
    axios.interceptors.response.use(function (response) { 
      return response;
    }, function (error) {
      if (error.response.status == 401) {
        redirectHome();
      }
      return Promise.reject(error);
    });
  },[]);

  const redirectHome = () => {
    window.location.replace("/")
  }

  return (
    <>
      <BrowserRouter>
        <ScrollToTop/>
        <React.Suspense fallback={<Loading loading={loading}/>}>
          <Switch>
            {
              <Route path="/" name="Home" render={(props) =>{
                  return (
                    <Flowbite theme={{ dark: initialMode }}>
                      <DefaultLayout {...props} funcAlertMsg={funcAlertMsg} toastSuccess={toastSuccess} DarkThemeToggle={DarkThemeToggle} isDark={initialMode}/> 
                    </Flowbite>
                  )
                }}
              />
            }
          </Switch>
        </React.Suspense>
      </BrowserRouter>

      <Loading loading={loading}/>
      <ToastContainer />
      {showAlertDialog && <AlertDialogComponent cancelRef={cancelRef} description={alertDialogObject.description} close={alertDialogObject.close}/>} 
    </>
  )

}

export default hot(module)(App)
