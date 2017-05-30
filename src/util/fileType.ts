export const types = [
    {
        regex: /m4a$/,
        type: 'audio/mp4'
    },
    {
        regex: /ogg$/,
        type: 'audio/ogg'
    },
    {
        regex: /mp3$/,
        type: 'audio/mpeg'
    },
    {
        regex: /wav$/,
        type: 'audio/wav'
    },
    {
        regex: /png$/,
        type: 'image/png'
    }
]

export const getType = (filename: string) => {
    const mime = types.find(t => t.regex.test(filename));
    return mime
        ? mime.type
        : '';
};
