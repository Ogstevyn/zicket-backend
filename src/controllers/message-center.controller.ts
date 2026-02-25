import { RequestHandler } from 'express';
import { MessageCenterService } from '../services/message-center.service';

const parsePage = (rawPage: unknown): number | null => {
  if (rawPage === undefined) {
    return 1;
  }

  if (typeof rawPage !== 'string' || !/^\d+$/.test(rawPage)) {
    return null;
  }

  const page = parseInt(rawPage, 10);
  return page > 0 ? page : null;
};

export const getPastMessages: RequestHandler = async (req, res) => {
  try {
    const page = parsePage(req.query.page);

    if (page === null) {
      return res.status(400).json({
        error: 'Invalid page number',
        message: 'Page must be a positive integer',
      });
    }

    const result = await MessageCenterService.getPastMessages(page);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching past message-center messages:', error);

    return res.status(500).json({
      error: 'Internal server error',
      message:
        error instanceof Error
          ? error.message
          : 'Failed to fetch past message-center messages',
    });
  }
};

export const getScheduledMessages: RequestHandler = async (req, res) => {
  try {
    const page = parsePage(req.query.page);

    if (page === null) {
      return res.status(400).json({
        error: 'Invalid page number',
        message: 'Page must be a positive integer',
      });
    }

    const result = await MessageCenterService.getScheduledMessages(page);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching scheduled message-center messages:', error);

    return res.status(500).json({
      error: 'Internal server error',
      message:
        error instanceof Error
          ? error.message
          : 'Failed to fetch scheduled message-center messages',
    });
  }
};
