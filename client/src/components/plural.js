export default function plural(num, text) {
    if (num <= 1) {
        return num + " " + text
    } else {
        return num + " " + text + 's'
    }
}