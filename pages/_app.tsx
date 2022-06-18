import '../styles/global.css'

import { useEffect, useState } from 'react'

import { RecoilRoot, useSetRecoilState } from 'recoil'
import { meState, scaleState, smallDeviceState } from '../store/atom'

import GA from '../components/minor/ga'
import Spin from '../components/minor/spin'

import { checkMobileDevice, getSceneScale } from '../libs/helper'

import type { Page, Scale, User } from '../types'

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
                {/* <Adapter scale={Component.scale}> */}
                <Component {...pageProps} />
                {/* </Adapter> */}
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

    return children
}

function Auth({ children }: { children: JSX.Element }) {
    const [developer, setDeveloper] = useState<User | null>(null)
    const setMeState = useSetRecoilState(meState)

    useEffect(() => {
        if (process.env.NODE_ENV == 'development') {
            setDeveloper({
                name: `developer${new Date().getSeconds() % 9}`,
                image: `./avatar.png`,
            })
        }
    }, [])

    useEffect(() => {
        if (developer) {
            setMeState(developer)
            return
        }

        const { user } = {
            user: {
                name: "Random_Name_Later",
                image: "/avatar.png",
            }
        }
        setMeState((old: any) => {
            if (old.name === user?.name) {
                return old
            }
            return {
                name: user.name,
                image: user.image,
            }
        })
    }, [developer])

    // Session is being fetched, or no user.
    // If no user, useEffect() will redirect.
    return (
        <div className='z-50 fixed top-0 left-0 right-0 bottom-0 bg-gray-100 flex justify-center items-center'>
            <Spin />
            <span className='ml-2.5 text-base'>loading...</span>
        </div>
    )
}
