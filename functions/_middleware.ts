import countryRegion from '../libs/amesh.json';

export async function onRequest(context: any) {
    let res, country, mesh;

    try {
        const { request } = context;
        const url = new URL(request.url)
        if (url.pathname != "/") {
            return context.next()
        }
        country = request?.cf?.country;
        console.log(country)
        // mesh = getMeshID(country)
        mesh = "fra.x.yomo.dev"
        res = await context.next();
        res.headers.set('x-yomo-country', country);
        res.headers.set('x-yomo-mesh', mesh);
        res.headers.append('Set-Cookie', `country=${country}; Path='/';`);
        res.headers.append('Set-Cookie', `region=${mesh}; Path='/';`);
        return res;
    } catch (err) {
        res = new Response('Oops!', { status: 500 });
    }
}

// get mesh ID by country
function getMeshID(country: string | undefined): string {
    if (country == undefined) {
        return 'us.x.yomo.dev'
    }

    //if (country === 'CN') {
    //    return 'cn1.x.yomo.dev'
    //}

    const res = countryRegion.find((item: { name: string; region: string }) => {
        if (item.name === country) {
            return item.region
        }
    })

    if (!res) {
        return 'us.x.yomo.dev'
    }

    switch (res.region) {
        case 'Asia':
            return 'kr.x.yomo.dev'
        case 'Europe':
            return 'fra.x.yomo.dev'
        default:
            return 'us.x.yomo.dev'
    }
}
