const {
  describe,
  test,
  expect,
  afterEach,
} = require('@jest/globals');

const axios = require('axios');

jest.mock('axios');


const getExchangeRateTest = require('../src/managers/getExchangeRate');

describe('Test getRate manager', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should return 8', async () => {
    const mockResponse = {
      data: {
        rates: {
          UAH: 8
        }
      }
    };
    axios.get.mockResolvedValue(mockResponse);

    const response = await getExchangeRateTest();
    expect(response).toEqual(8);
  });

  test('Should return null if received empty object', async () => {
    const mockResponse = {};
    axios.get.mockResolvedValue(mockResponse);

    const response = await getExchangeRateTest();
    expect(response).toBeNull();
  });

  test('Should return null if there is no UAH in the response', async () => {
    const mockResponse = {
      data: {
        rates: {
          EUR: 0.88
        }
      }
    };
    axios.get.mockResolvedValue(mockResponse);

    const response = await getExchangeRateTest();
    expect(response).toBeNull();
  });

  test("should handle errors gracefully", async () => {
    axios.get.mockRejectedValue(new Error("Network Error"));

    try {
      await getExchangeRateTest();
    } catch (e) {
      expect(e.message).toBe('Error :: getExchangeRate :: Network Error');
    }
  });
});
