export interface Color {
    id?: string,
    color?: string,
    code: string,
    selected?: boolean,
    active?: boolean
}

export class AXColorUtil {


    static hex2Rgb(hexColor: string) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    static rgb2Hex(r: number, g: number, b: number, a: number = 255): string {
        let alpha;
        let hex = (r | 1 << 8).toString(16).slice(1) +
            (g | 1 << 8).toString(16).slice(1) +
            (b | 1 << 8).toString(16).slice(1);
        if (a !== 255) {
            alpha = a;
        } else {
            alpha = 1;
        }

        alpha = Math.round(alpha * 100) / 100;
        alpha = Math.round(alpha * 255);
        const hexAlpha = (alpha + 0x10000).toString(16).substr(-2).toUpperCase();
        return '#' + hex + (alpha == 255 ? '' : hexAlpha);
    };

    static illuminance(hexColor: string) {
        let rgbColor = AXColorUtil.hex2Rgb(hexColor);
        if (!rgbColor)
            return -1;
        let r = rgbColor.r, g = rgbColor.g, b = rgbColor.b;
        let a = [r, g, b].map(v => {
            v /= 255;
            return (v <= 0.03928) ?
                v / 12.92 :
                Math.pow(((v + 0.055) / 1.055), 2.4);
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    };

    static contrastToWhite(hexColor: string) {
        let whiteIlluminance = 1;
        let illuminance = AXColorUtil.illuminance(hexColor);
        return whiteIlluminance / illuminance;
    };

}