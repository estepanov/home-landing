import { APIGatewayEvent, Context } from "aws-lambda";

export default function handler(lambda: (event: APIGatewayEvent, context: Context) => Promise<any>) {
    return async function (event: APIGatewayEvent, context: Context) {
      let body, statusCode;
  
      try {
        // Run the Lambda
        body = await lambda(event, context);
        statusCode = 200;
      } catch (e: any) {
        console.error(e);
        body = { error: e.message };
        statusCode = 500;
      }
  
      // Return HTTP response
      return {
        statusCode,
        body: JSON.stringify(body),
      };
    };
  }