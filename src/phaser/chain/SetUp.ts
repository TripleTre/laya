export default function (proptype, attribut) {
    for (let key in attribut) {
        if (attribut.hasOwnProperty(key)) {
            Object.defineProperty(proptype, key, {
                set: attribut[key]
            });
        }
    }
}
