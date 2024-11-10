import { KEY, URL } from '@/config';

export const endConversation = async (conversationId: string) => {
  try {
    const response = await fetch(
      `${URL}/${conversationId}/end`,
      {
        method: 'POST',
        headers: {
          'x-api-key': KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to end conversation');
    }

    return null;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
