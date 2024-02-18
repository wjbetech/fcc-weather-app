// simple kelvin to celsius func from chatgpt

export function convertTemp(kTemp: number): number {
    const cTemp = kTemp - 273.15
    return Math.floor(cTemp);
}

