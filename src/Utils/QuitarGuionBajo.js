function capitalizeWordsWithUnderscore(str) {
    return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function quitarGuionBajo(str) {
    return str.replace(/_/g, ' ');
}

export { capitalizeWordsWithUnderscore, quitarGuionBajo };