// simple m to km converted from chatgpt

export function metersToKilometers(visibilityInMeters: number): string {
    const visibilityInKilometers = visibilityInMeters / 1000;
    return `${visibilityInKilometers.toFixed(0)}km`
}

export function humidityPercent(humidity: number): string {
    return `${humidity}%`;
}

export function windSpeedInKms(windSpeed: number): string {
    return `${windSpeed} km/h`;
}

export function airPressureBar(airPressure: number): string {
    return `${airPressure} hPa`;
}