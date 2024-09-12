export const handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    
    let body;
    try {
        body = event.body ? JSON.parse(event.body) : event;
    } catch (error) {
        console.error('Failed to parse event body:', error);
        return {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ error: 'Invalid request body' }),
        };
    }

    console.log('Parsed body:', body);

    const { operation, num1, num2 } = body;

    if (!operation || num1 === undefined) {
        return {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ error: 'Missing required parameters' }),
        };
    }

    const toRadians = (degrees) => degrees * (Math.PI / 180);

    let result;
    switch (operation) {
        case '+':
            result = parseFloat(num1) + parseFloat(num2);
            break;
        case '-':
            result = parseFloat(num1) - parseFloat(num2);
            break;
        case '*':
            result = parseFloat(num1) * parseFloat(num2);
            break;
        case '/':
        case '%':
        case '÷':
            if (parseFloat(num2) === 0) {
                return {
                    statusCode: 400,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': true,
                    },
                    body: JSON.stringify({ error: 'Division by zero' }),
                };
            }
            result = parseFloat(num1) / parseFloat(num2);
            break;
        case '^':
            result = Math.pow(parseFloat(num1), parseFloat(num2));
            break;
        case 'root':
            result = Math.sqrt(parseFloat(num1));
            break;
        case 'sin':
            result = Math.sin(toRadians(parseFloat(num1)));
            break;
        case 'cos':
            result = Math.cos(toRadians(parseFloat(num1)));
            break;
        case 'tan':
            result = Math.tan(toRadians(parseFloat(num1)));
            break;
        default:
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                body: JSON.stringify({ error: 'Invalid operation' }),
            };
    }

    console.log('Operation result:', result);

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ result: result }),
    };
};