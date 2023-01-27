import { ReceiverEvent } from '@slack/bolt';

export function parseRequestBody(
  stringBody: string | null,
  contentType: string | undefined
): any | undefined {
  try {
    if (!stringBody) {
      return '';
    }

    let result: any = {};

    if (contentType && contentType === 'application/json') {
      return JSON.parse(stringBody);
    }

    let keyValuePairs: string[] = stringBody.split('&');
    keyValuePairs.forEach(function (pair: string): void {
      let individualKeyValuePair: string[] = pair.split('=');
      result[individualKeyValuePair[0]] = decodeURIComponent(
        individualKeyValuePair[1] || ''
      );
    });
    return JSON.parse(JSON.stringify(result));
  } catch {
    return '';
  }
}

export function isUrlVerificationRequest(payload: any): boolean {
  if (payload && payload.type && payload.type === 'url_verification') {
    return true;
  }
  return false;
}

export function generateReceiverEvent(payload: any): ReceiverEvent {
  return {
    body: payload,
    ack: async (response: Response): Promise<any> => {
      return {
        statusCode: 200,
        body: response ?? '',
      };
    },
  };
}
