const toSnakeCase = (str: string) => {
    const strMatch = str.match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
    );
    return strMatch && strMatch.map((x) => x.toLowerCase()).join('_');
};

export default toSnakeCase;
