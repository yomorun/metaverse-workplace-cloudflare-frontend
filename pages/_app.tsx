import '../styles/global.css'

import { useEffect } from 'react'

import { RecoilRoot, useSetRecoilState } from 'recoil'
import { meState, scaleState, smallDeviceState } from '../store/atom'

import GA from '../components/minor/ga'

import { checkMobileDevice, getSceneScale } from '../libs/helper'

import type { Page, Scale } from '../types'

export default function MyApp({
    Component,
    pageProps: { session, ...pageProps },
}: {
    Component: Page<any>
    pageProps: any
}) {

    return (
        <>
            <RecoilRoot>
                <Adapter scale={Component.scale}>
                    <Component {...pageProps} />
                </Adapter>
            </RecoilRoot>
            <GA />
        </>
    )
}

function Adapter({
    scale = { sceneWidth: 0, sceneHeight: 0 },
    children,
}: {
    scale?: Scale
    children: JSX.Element
}) {
    const setSmallDeviceState = useSetRecoilState(smallDeviceState)
    const setScaleState = useSetRecoilState(scaleState)

    useEffect(() => {
        setSmallDeviceState(checkMobileDevice())
    }, [setSmallDeviceState])

    useEffect(() => {
        const isMobile = checkMobileDevice()
        const { sceneWidth, sceneHeight } = scale
        if (!isMobile && sceneWidth && sceneHeight) {
            setScaleState(getSceneScale(sceneWidth, sceneHeight))
        }
    }, [scale])


    const setMeState = useSetRecoilState(meState)

    useEffect(() => {
        // try get uid from localStorage, if not, generate and set
        var uid = localStorage.getItem('uid') as string
        if (!uid) {
            uid = Math.random().toString(36).slice(2, 10)
            console.log('>> generate new uid', uid)
            localStorage.setItem('uid', uid)
        }
        setMeState({
            name: uid
            , image: '/avatar.png'
        })
    }, [])

    return children
}
