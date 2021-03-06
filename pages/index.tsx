import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect } from 'react';

import FloorLinks from '../components/minor/floor-links';
import Guide from '../components/minor/guide';
import IframePage from '../components/minor/iframe-page';
import Sidebar from '../components/minor/sidebar';

import { useSetRecoilState } from 'recoil';
import { iframePageState, locationState } from '../store/atom';

import type { Area, Location, Page } from '../types';

const Scene = dynamic(() => import('../components/scene'), { ssr: false })

// export const getServerSideProps = ({ query }: { query: { country: string; region: string } }) => {
//   return {
//     props: {
//       ...query,
//     },
//   }
// }

const Home: Page<Location> = () => {
  const country = Cookies.get('country') || "Local"
  const region = Cookies.get('region') || "us.x.yomo.dev"
  const setLocationState = useSetRecoilState(locationState)
  const setIframePageState = useSetRecoilState(iframePageState)

  useEffect(() => {
    setLocationState({ country, region })
  }, [])

  return (
    <>
      <Head>
        <title>
          Open-source Metaverse Workplace with Geo-distributed System Tech Stacks
        </title>
      </Head>
      <div className='w-screen h-screen flex justify-center items-center bg-color-newyear'>
        <Sidebar />
        <Scene
          className='w-1800px min-w-1800px h-900px'
          floor='home'
          backgroundImage='/bg-home-1024stars.png'
          boundary={{ top: 0, left: 0, bottom: 900, right: 1800 }}
          playerInitialPosition={{ x: 30, y: 60 }}
          checkAreaList={[
            {
              id: 'area-1',
              position: {
                x: 820,
                y: 550,
              },
              rectangle: {
                width: 300,
                height: 200,
              },
              iframeSrc: 'https://github.com/yomorun/yomo',
            },
            {
              id: 'area-2',
              position: {
                x: 1330,
                y: 340,
              },
              round: {
                diameter: 100,
              },
              iframeSrc: 'https://yomo.run',
            },
          ]}
          onEnterCheckArea={(area: Area) => {
            console.log('[Enter Area]:', area)
          }}
          onLeaveCheckArea={() => {
            console.log('[Leave Area]')
          }}
        />
        <FloorLinks currentPath='/' />
        <Guide />
        <IframePage />
      </div>
    </>
  )
}

Home.auth = true
Home.scale = {
  sceneWidth: 1800,
  sceneHeight: 900,
}

export default Home
