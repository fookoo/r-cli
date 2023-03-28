export const camelCaseToArr = (input = 'FooBar') => {
    let x = input[0].toLowerCase() + input.slice(1);

    return x.replace(/([A-Z])/g, ' $1').split(" ").map((part) => part.toLowerCase())
}
