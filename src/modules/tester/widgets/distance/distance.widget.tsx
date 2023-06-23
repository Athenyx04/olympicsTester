import React, { useEffect, useState } from 'react'
import styles from './distance.module.css'
import { Track, TrackPoint } from '@/tester/api/track'
import { MqttClient, connect } from 'mqtt'

export type DistanceWidgetProps = {}

const inputTrackPoints = [
    [2.3514347, 48.8567341, 0],
    [2.3510377, 48.8568435, 0],
    [2.3477547, 48.8577259, 0],
    [2.3471968, 48.8578812, 0],
    [2.3474221, 48.8587847, 0],
    [2.3408286, 48.8609308, 0],
    [2.3438687, 48.8667675, 0],
    [2.3439974, 48.8673674, 0],
    [2.3436219, 48.8681931, 0],
    [2.3332364, 48.8702185, 0],
    [2.3326785, 48.8703455, 0],
    [2.3325605, 48.8707195, 0],
    [2.3323566, 48.8711853, 0],
    [2.332818, 48.8722015, 0],
    [2.3315305, 48.8729354, 0],
    [2.3312623, 48.8728931, 0],
    [2.3310799, 48.8728154, 0],
    [2.3306186, 48.8718063, 0],
    [2.3318417, 48.8711077, 0],
    [2.3320562, 48.8706772, 0],
    [2.3323137, 48.8702185, 0],
    [2.3273046, 48.8653226, 0],
    [2.3323993, 48.8636345, 0],
    [2.3351674, 48.8627663, 0],
    [2.33447, 48.8620111, 0],
    [2.3341159, 48.8617711, 0],
    [2.3338048, 48.8617288, 0],
    [2.3336761, 48.8615311, 0],
    [2.3337297, 48.8613335, 0],
    [2.333837, 48.8611571, 0],
    [2.3332469, 48.8601548, 0],
    [2.3308544, 48.8606983, 0],
    [2.3275821, 48.8616935, 0],
    [2.3238699, 48.8628934, 0],
    [2.3206292, 48.8639247, 0],
    [2.318816, 48.8647152, 0],
    [2.317711, 48.8648987, 0],
    [2.3107479, 48.8647716, 0],
    [2.3067032, 48.8646869, 0],
    [2.3031197, 48.8645317, 0],
    [2.3007603, 48.8642317, 0],
    [2.2992582, 48.8640094, 0],
    [2.2964687, 48.8633812, 0],
    [2.2939367, 48.8625342, 0],
    [2.2929976, 48.8619787, 0],
    [2.2910933, 48.8604506, 0],
    [2.2885881, 48.8583859, 0],
    [2.2851656, 48.8557247, 0],
    [2.2833417, 48.8542141, 0],
    [2.2808097, 48.8526469, 0],
    [2.2787497, 48.8515173, 0],
    [2.2766522, 48.8502738, 0],
    [2.2748498, 48.8485512, 0],
    [2.269395, 48.8430926, 0],
    [2.2669917, 48.8417086, 0],
    [2.2635585, 48.8399857, 0],
    [2.2625929, 48.839562, 0],
    [2.2577006, 48.838065, 0],
    [2.2574538, 48.8382203, 0],
    [2.2569925, 48.8384039, 0],
    [2.2565848, 48.8383051, 0],
    [2.256456, 48.8382345, 0],
    [2.2563767, 48.8379063, 0],
    [2.2565806, 48.8376379, 0],
    [2.2566449, 48.8373696, 0],
    [2.2563982, 48.8370271, 0],
    [2.2560817, 48.8367728, 0],
    [2.2560012, 48.8365822, 0],
    [2.2557115, 48.8365539, 0],
    [2.2545796, 48.8367375, 0],
    [2.2538394, 48.8368505, 0],
    [2.2477025, 48.834965, 0],
    [2.2386715, 48.8321111, 0],
    [2.2312042, 48.8298228, 0],
    [2.2250851, 48.8279648, 0],
    [2.2236153, 48.8273786, 0],
    [2.2222849, 48.8271596, 0],
    [2.2203537, 48.8268347, 0],
    [2.2191413, 48.8265593, 0],
    [2.2178753, 48.8260154, 0],
    [2.2155043, 48.8253302, 0],
    [2.2138156, 48.8247472, 0],
    [2.2121366, 48.8242351, 0],
    [2.2119381, 48.8243693, 0],
    [2.2111656, 48.8242951, 0],
    [2.2088428, 48.8237583, 0],
    [2.2083386, 48.8240973, 0],
    [2.2072972, 48.8248874, 0],
    [2.2070397, 48.8252971, 0],
    [2.2068251, 48.8256714, 0],
    [2.2057093, 48.8258056, 0],
    [2.2025551, 48.8258339, 0],
    [2.1998299, 48.8259257, 0],
    [2.1971263, 48.826067, 0],
    [2.1940364, 48.8261659, 0],
    [2.192191, 48.8262436, 0],
    [2.1910323, 48.8264413, 0],
    [2.1898843, 48.8266956, 0],
    [2.1889187, 48.8269499, 0],
    [2.1887578, 48.8270629, 0],
    [2.1885539, 48.8270488, 0],
    [2.1884681, 48.8269216, 0],
    [2.1884896, 48.8268016, 0],
    [2.1883072, 48.8264555, 0],
    [2.1878029, 48.8261376, 0],
    [2.1875991, 48.825841, 0],
    [2.1873523, 48.8253395, 0],
    [2.1865047, 48.8247532, 0],
    [2.1853353, 48.8236583, 0],
    [2.1840586, 48.822514, 0],
    [2.1836509, 48.8222668, 0],
    [2.1821703, 48.8218359, 0],
    [2.1797885, 48.8213132, 0],
    [2.1785868, 48.8213555, 0],
    [2.1772457, 48.8212143, 0],
    [2.1760441, 48.8211719, 0],
    [2.1751644, 48.8211366, 0],
    [2.1742309, 48.8210518, 0],
    [2.1734907, 48.820854, 0],
    [2.172289, 48.8205714, 0],
    [2.1709372, 48.8200911, 0],
    [2.1700252, 48.8197308, 0],
    [2.1683194, 48.8192151, 0],
    [2.1669461, 48.8187277, 0],
    [2.1660234, 48.8184098, 0],
    [2.1637381, 48.8176539, 0],
    [2.1623648, 48.8171311, 0],
    [2.1596826, 48.8158736, 0],
    [2.1584019, 48.8151189, 0],
    [2.1547541, 48.8131125, 0],
    [2.1418748, 48.8059822, 0],
    [2.1412867, 48.8057677, 0],
    [2.1402782, 48.8055981, 0],
    [2.1269583, 48.8046406, 0],
    [2.1268188, 48.8043897, 0],
    [2.126843, 48.8039693, 0],
    [2.1265238, 48.8031814, 0],
    [2.1451705, 48.7982063, 0],
    [2.1578949, 48.798489, 0],
    [2.1583455, 48.7985597, 0],
    [2.1671646, 48.8037043, 0],
    [2.1680487, 48.8038972, 0],
    [2.1694863, 48.8041092, 0],
    [2.1726621, 48.8040386, 0],
    [2.1757305, 48.8039962, 0],
    [2.1840132, 48.8054518, 0],
    [2.1855313, 48.8057239, 0],
    [2.1867195, 48.8068562, 0],
    [2.1885729, 48.8075646, 0],
    [2.190826, 48.807607, 0],
    [2.1927233, 48.8080224, 0],
    [2.1958552, 48.8085158, 0],
    [2.1992455, 48.8090104, 0],
    [2.200533, 48.8089821, 0],
    [2.2018633, 48.808643, 0],
    [2.2032581, 48.8086147, 0],
    [2.2057472, 48.809293, 0],
    [2.2109185, 48.8114409, 0],
    [2.2125922, 48.8117235, 0],
    [2.2143302, 48.8119638, 0],
    [2.2153173, 48.8124442, 0],
    [2.2189436, 48.8142952, 0],
    [2.2203294, 48.8150925, 0],
    [2.2212521, 48.8152479, 0],
    [2.2229901, 48.8152055, 0],
    [2.2241703, 48.8154175, 0],
    [2.2285262, 48.817226, 0],
    [2.2298634, 48.8176606, 0],
    [2.2307753, 48.8182823, 0],
    [2.2317409, 48.8187768, 0],
    [2.232492, 48.8189887, 0],
    [2.2335005, 48.8190593, 0],
    [2.2342729, 48.818911, 0],
    [2.2348094, 48.8188333, 0],
    [2.2363758, 48.8189392, 0],
    [2.2378564, 48.8188403, 0],
    [2.2388971, 48.8188333, 0],
    [2.2406137, 48.8187626, 0],
    [2.2418153, 48.8188403, 0],
    [2.2426522, 48.8190169, 0],
    [2.2428453, 48.8198293, 0],
    [2.243253, 48.8200342, 0],
    [2.2445619, 48.8201613, 0],
    [2.2499424, 48.8213799, 0],
    [2.250511, 48.8215353, 0],
    [2.2506398, 48.8218037, 0],
    [2.2526353, 48.8224677, 0],
    [2.254352, 48.8230187, 0],
    [2.2557574, 48.8236403, 0],
    [2.2580963, 48.8251943, 0],
    [2.2600382, 48.8268259, 0],
    [2.2606391, 48.8280125, 0],
    [2.2610253, 48.8300466, 0],
    [2.2620553, 48.8312897, 0],
    [2.2646087, 48.8338039, 0],
    [2.270869, 48.8403219, 0],
    [2.271958, 48.8405054, 0],
    [2.2724622, 48.8406537, 0],
    [2.2753054, 48.8441348, 0],
    [2.2763997, 48.8455469, 0],
    [2.2773975, 48.8464013, 0],
    [2.2779071, 48.8466695, 0],
    [2.2812545, 48.8490912, 0],
    [2.28266, 48.8501502, 0],
    [2.2867077, 48.8529655, 0],
    [2.2889607, 48.8545186, 0],
    [2.2895615, 48.8552951, 0],
    [2.2904628, 48.8570316, 0],
    [2.2935312, 48.859361, 0],
    [2.2955268, 48.8606104, 0],
    [2.2972434, 48.8595516, 0],
    [2.300505, 48.8574128, 0],
    [2.3054114, 48.8543368, 0],
    [2.3117092, 48.8506164, 0],
    [2.3113337, 48.8475594, 0],
    [2.3117736, 48.8475594, 0],
    [2.3121384, 48.847404, 0],
    [2.3130074, 48.8476017, 0],
    [2.3157862, 48.8482654, 0],
    [2.3141773, 48.8511827, 0],
    [2.3144455, 48.8514722, 0],
    [2.3152126, 48.8580161, 0],
    [2.3139895, 48.8583973, 0],
    [2.3134745, 48.8584396, 0],
    [2.3132385, 48.8588208, 0],
    [2.3129917, 48.8589196, 0],
    [2.3131098, 48.8598937, 0],
]

const parisTrackPoints: TrackPoint[] = inputTrackPoints.map(
    ([longitude, latitude, elevation]) => {
        return {
            latitude: latitude,
            longitude: longitude,
            elevation: elevation,
        }
    }
)

const parisTrack: Track = {
    trackId: 1,
    name: 'Paris 2024 Olympics Marathon Track',
    distance: 42195,
    location: 'Paris',
    trackPoints: parisTrackPoints,
}

function calculateTotalDistance(trackPoints: TrackPoint[]) {
    let totalDistance = 0

    for (let i = 0; i < trackPoints.length - 1; i++) {
        const point1 = trackPoints[i]
        const point2 = trackPoints[i + 1]

        const distance = calculateDistance(point1, point2)
        totalDistance += distance
    }
    return totalDistance
}

function degreesToRadians(degrees: number) {
    return degrees * (Math.PI / 180)
}

function calculateDistance(point1: TrackPoint, point2: TrackPoint) {
    const earthRadius = 6371e3 // Radius of the Earth in meters

    const lat1 = degreesToRadians(point1.latitude)
    const lon1 = degreesToRadians(point1.longitude)
    const lat2 = degreesToRadians(point2.latitude)
    const lon2 = degreesToRadians(point2.longitude)

    const deltaLat = lat2 - lat1
    const deltaLon = lon2 - lon1

    const a =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1) *
            Math.cos(lat2) *
            Math.sin(deltaLon / 2) *
            Math.sin(deltaLon / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return earthRadius * c
}

function calculateDistanceHandler(track: Track) {
    const result = calculateTotalDistance(track.trackPoints)
    console.log(result)
}

function calculateIntermediatePoints(
    origin: TrackPoint,
    dest: TrackPoint,
    speed: number,
    interval: number
) {
    // Calculate the distance between the two points
    const d = calculateDistance(origin, dest)

    // Calculate the total time for the run
    const totalTime = d / speed

    // Calculate the number of intermediate points based on the specified interval
    const numPoints = Math.ceil(totalTime / interval)

    // Calculate the intermediate points
    const intermediatePoints = []

    for (let i = 1; i <= numPoints; i++) {
        const t = (i * interval) / totalTime
        const lat = (1 - t) * origin.latitude + t * dest.latitude
        const lon = (1 - t) * origin.longitude + t * dest.longitude
        intermediatePoints.push({
            UserId: '1',
            Name: 'U. Bolt',
            RaceId: 1687505521789,
            Status: 1,
            AppVersion: '0.0.1',
            Model: 'Olympia',
            Brand: 'Human Telemetrics',
            OSVersion: '1.0.0',
            AndroidVersion: '12.3.4',
            Coordinates: [
                {
                    Latitude: lat,
                    Longitude: lon,
                    Altitude: 0,
                    Pace: '0',
                    PaceTotal: 0,
                    Distance: 0,
                    DistanceGps: 0,
                    DistancePodo: 0,
                    HeartRate: 0,
                    Interval: 0,
                    ReadDate: 1647510514529,
                    Chrono: '0',
                    PaceGroup: 0,
                    Difference: 0,
                    WatchDistance: 0,
                    Battery: 100,
                },
            ],
            Bodycap: [
                {
                    BodyCapId: '1',
                    Temperature: 20,
                    PillTemperature: 37,
                    PillTemperatureSlot2: 0,
                    PillTemperatureSlot3: 0,
                },
            ],
            Polar: [
                {
                    PolarId: '1',
                    PolarHeartRate: 70,
                },
            ],
            Gaitup: [
                {
                    GaitupId: '1',
                    CadenceG: -1,
                    ContactTimeLeftG: 0,
                    StrikeAngleLeftG: 0,
                    VariabilityLeftG: 0,
                    ContactTimeRightG: 0,
                    StrikeAngleRightG: 0,
                    VariabilityRightG: 0,
                    VerticalOscillationG: 0,
                },
            ],
            Orphe: [
                {
                    OrpheRightId: '1',
                    DistanceRight: 0,
                    CadenceRight: 0,
                    StrideRight: 0,
                    StrikeAngleRight: 0,
                    LandingForceRight: 0,
                    PronationRight: 0,
                    DurationRight: 0,
                    SwingPhaseRight: 0,
                    StandingPhaseRight: 0,
                    OrpheLeftId: '1',
                    DistanceLeft: 0,
                    CadenceLeft: 0,
                    StrideLeft: 0,
                    StrikeAngleLeft: 0,
                    LandingForceLeft: 0,
                    PronationLeft: 0,
                    DurationLeft: 0,
                    SwingPhaseLeft: 0,
                    StandingPhaseLeft: 0,
                },
            ],
            RunScribe: [
                {
                    RunScribeRightId: '1',
                    FootStrikeTypeRight: 0,
                    ImpactGsRight: 0,
                    BrakingGsRight: 0,
                    StrideRateRight: 0,
                    StrideLengthRight: 0,
                    StridePaceRight: 0,
                    ContactTimeRight: 0,
                    FlightRatioRight: 0,
                    PowerRight: 0,
                    PronationExcursionRight: 0,
                    PronationVelocityRight: 0,
                    FootStepNumberRight: 0,
                    RunScribeLeftId: '1',
                    FootStrikeTypeLeft: 0,
                    ImpactGsLeft: 0,
                    BrakingGsLeft: 0,
                    StrideRateLeft: 0,
                    StrideLengthLeft: 0,
                    StridePaceLeft: 0,
                    ContactTimeLeft: 0,
                    FlightRatioLeft: 0,
                    PowerLeft: 0,
                    PronationExcursionLeft: 0,
                    PronationVelocityLeft: 0,
                    FootStepNumberLeft: 0,
                },
            ],
            Flowbio: [
                {
                    FlowbioId: '1',
                    TimestampFlowbio: 0,
                    SodiumConcentrationFlowbio: 0,
                    StandardDeviationFlowbio: 0,
                    TemperatureFlowbio: 0,
                },
            ],
            Actions: [],
        })
    }

    return intermediatePoints
}

function calculateAllPoints(
    trackPoints: TrackPoint[],
    speed: number,
    interval: number
) {
    const intermediatePoints = []

    for (let i = 0; i < trackPoints.length - 1; i++) {
        const origin = trackPoints[i]
        const destination = trackPoints[i + 1]

        // Calculate intermediate points for the current track segment
        const segmentIntermediatePoints = calculateIntermediatePoints(
            origin,
            destination,
            speed,
            interval
        )

        // Add the origin point, intermediate points, and destination point to the result array
        intermediatePoints.push(
            {
                UserId: '1',
                Name: 'U. Bolt',
                RaceId: 1687505521789,
                Status: 1,
                AppVersion: '0.0.1',
                Model: 'Olympia',
                Brand: 'Human Telemetrics',
                OSVersion: '1.0.0',
                AndroidVersion: '12.3.4',
                Coordinates: [
                    {
                        Latitude: origin.latitude,
                        Longitude: origin.longitude,
                        Altitude: 0,
                        Pace: '0',
                        PaceTotal: 0,
                        Distance: 0,
                        DistanceGps: 0,
                        DistancePodo: 0,
                        HeartRate: 0,
                        Interval: 0,
                        ReadDate: 1647510514529,
                        Chrono: '0',
                        PaceGroup: 0,
                        Difference: 0,
                        WatchDistance: 0,
                        Battery: 100,
                    },
                ],
                Bodycap: [
                    {
                        BodyCapId: '1',
                        Temperature: 20,
                        PillTemperature: 37,
                        PillTemperatureSlot2: 0,
                        PillTemperatureSlot3: 0,
                    },
                ],
                Polar: [
                    {
                        PolarId: '1',
                        PolarHeartRate: 70,
                    },
                ],
                Gaitup: [
                    {
                        GaitupId: '1',
                        CadenceG: -1,
                        ContactTimeLeftG: 0,
                        StrikeAngleLeftG: 0,
                        VariabilityLeftG: 0,
                        ContactTimeRightG: 0,
                        StrikeAngleRightG: 0,
                        VariabilityRightG: 0,
                        VerticalOscillationG: 0,
                    },
                ],
                Orphe: [
                    {
                        OrpheRightId: '1',
                        DistanceRight: 0,
                        CadenceRight: 0,
                        StrideRight: 0,
                        StrikeAngleRight: 0,
                        LandingForceRight: 0,
                        PronationRight: 0,
                        DurationRight: 0,
                        SwingPhaseRight: 0,
                        StandingPhaseRight: 0,
                        OrpheLeftId: '1',
                        DistanceLeft: 0,
                        CadenceLeft: 0,
                        StrideLeft: 0,
                        StrikeAngleLeft: 0,
                        LandingForceLeft: 0,
                        PronationLeft: 0,
                        DurationLeft: 0,
                        SwingPhaseLeft: 0,
                        StandingPhaseLeft: 0,
                    },
                ],
                RunScribe: [
                    {
                        RunScribeRightId: '1',
                        FootStrikeTypeRight: 0,
                        ImpactGsRight: 0,
                        BrakingGsRight: 0,
                        StrideRateRight: 0,
                        StrideLengthRight: 0,
                        StridePaceRight: 0,
                        ContactTimeRight: 0,
                        FlightRatioRight: 0,
                        PowerRight: 0,
                        PronationExcursionRight: 0,
                        PronationVelocityRight: 0,
                        FootStepNumberRight: 0,
                        RunScribeLeftId: '1',
                        FootStrikeTypeLeft: 0,
                        ImpactGsLeft: 0,
                        BrakingGsLeft: 0,
                        StrideRateLeft: 0,
                        StrideLengthLeft: 0,
                        StridePaceLeft: 0,
                        ContactTimeLeft: 0,
                        FlightRatioLeft: 0,
                        PowerLeft: 0,
                        PronationExcursionLeft: 0,
                        PronationVelocityLeft: 0,
                        FootStepNumberLeft: 0,
                    },
                ],
                Flowbio: [
                    {
                        FlowbioId: '1',
                        TimestampFlowbio: 0,
                        SodiumConcentrationFlowbio: 0,
                        StandardDeviationFlowbio: 0,
                        TemperatureFlowbio: 0,
                    },
                ],
                Actions: [],
            },
            ...segmentIntermediatePoints
        )
    }

    // // Add the last destination point to the result array
    // intermediatePoints.push(trackPoints[trackPoints.length - 1])

    return intermediatePoints
}

export function DistanceWidget(props: DistanceWidgetProps) {
    const [client, setClient] = useState<MqttClient>()
    const interval = 1000
    let promise = Promise.resolve()

    useEffect(() => {
        const connection = connect('ws://130.162.36.245:8084/mqtt', {
            clientId: 'client1',
            clean: true,
            reconnectPeriod: 100000000,
            connectTimeout: 100000000,
        })
        setClient(connection)
        connection.on('connect', () => console.log('connected'))
    }, [])

    function calculateIntermediateHandler(track: Track) {
        const result = calculateIntermediatePoints(
            track.trackPoints[0],
            track.trackPoints[1],
            2.7,
            1
        )
        console.log(result)
    }

    function calculateAllHandler(track: Track) {
        const result = calculateAllPoints(track.trackPoints, 10, 1)
        result.forEach(function (el) {
            promise = promise.then(function () {
                console.log(el)
                client?.publish('sub2/device/status/1', JSON.stringify(el))
                return new Promise(function (resolve) {
                    setTimeout(resolve, interval)
                })
            })
        })
        console.log(result)
    }

    return (
        <div data-testid="distance-widget" className={styles.container}>
            <div>
                <button onClick={() => calculateDistanceHandler(parisTrack)}>
                    Run total distance!
                </button>
            </div>
            <div>
                <button
                    onClick={() => calculateIntermediateHandler(parisTrack)}
                >
                    Run intermediate points first stint!
                </button>
            </div>
            <div>
                <button onClick={() => calculateAllHandler(parisTrack)}>
                    Run all points!
                </button>
            </div>
        </div>
    )
}
