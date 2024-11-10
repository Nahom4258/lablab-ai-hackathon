import { PERSONA_ID, REPLICA_ID, KEY, URL } from '@/config';
import { IConversation } from '@/types';

export const createConversation = async (): Promise<IConversation> => {
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': KEY,
      },
      body: JSON.stringify({
        persona_id: PERSONA_ID,
        replica_id: REPLICA_ID
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
