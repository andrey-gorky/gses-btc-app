const {
  describe,
  test,
  expect,
  afterEach,
} = require('@jest/globals');

const Subscription = require('../src/models/Subscription');
const { isEmailAddressExists, saveEmailAddress } = require('../src/managers/subscriptions');

jest.mock('../src/models/Subscription');

describe('Subscription Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('isEmailAddressExists', () => {
    test('should return true if the email address exists', async () => {
      const email = "test@example.com";
      Subscription.findOne.mockResolvedValue({ email });

      const result = await isEmailAddressExists(email);

      expect(result).toBe(true);
      expect(Subscription.findOne).toHaveBeenCalledWith({ email });
    });

    test('should return false if the email address does not exist', async () => {
      const email = "test@example.com";
      Subscription.findOne.mockResolvedValue(null);

      const result = await isEmailAddressExists(email);

      expect(result).toBe(false);
      expect(Subscription.findOne).toHaveBeenCalledWith({ email });
    });

    test('should throw an error if there is an issue with the database', async () => {
      const email = "test@example.com";
      Subscription.findOne.mockRejectedValue(new Error("Database Error"));

      await expect(isEmailAddressExists(email)).rejects.toThrow("Error :: isEmailAddressExists :: Database Error");
    });
  });

  describe('saveEmailAddress', () => {
    test('should save the email address successfully', async () => {
      const email = "test@example.com";
      const savedSubscription = { email, save: jest.fn().mockResolvedValue({ email }) };
      Subscription.mockImplementation(() => savedSubscription);

      const result = await saveEmailAddress(email);

      expect(result).toEqual({ email });
      expect(savedSubscription.save).toHaveBeenCalled();
    });

    test('should throw an error if there is an issue with saving the email address', async () => {
      const email = "test@example.com";
      const savedSubscription = { email, save: jest.fn().mockRejectedValue(new Error("Save Error")) };
      Subscription.mockImplementation(() => savedSubscription);

      await expect(saveEmailAddress(email)).rejects.toThrow("Error :: saveEmailAddress :: Save Error");
    });
  });
});
