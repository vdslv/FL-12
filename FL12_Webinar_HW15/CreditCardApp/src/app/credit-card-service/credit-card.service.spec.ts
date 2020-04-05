import {TestBed} from '@angular/core/testing';

import {CreditCardService} from './credit-card.service';

describe('CreditCardService', () => {
  let service: CreditCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditCardService);
  });
  it('should return a scam attempt', async () => {
    expect(service.testCreditCard('5490997771092064', 'MasterCard'))
      .toEqual({isValid: false, message: 'Warning! This credit card number is associated with a scam attempt'})
  });
  it('should return credit card is invalid', async () => {
    expect(service.testCreditCard('6304100000000008', 'MasterCard'))
      .toEqual({isValid: false, message: 'Credit card number is invalid'})
  });
  it('should return a invalid card number', async () => {
    expect(service.testCreditCard('shasha', 'Switch'))
      .toEqual({isValid: false, message: 'Credit card number is in invalid format'})
  });
  it('should return false', async () => {
    expect(service.testCreditCard('5111000000000004', 'Other'))
      .toEqual({isValid: false, message: 'Unknown card type'});
  });
  it('Card number length is invalid', async () => {
    expect(service.testCreditCard('3755 1279 1456 4127', 'AmEx'))
      .toEqual({isValid: false, message: 'Credit card number has an inappropriate number of digits'});
  });
  it('should return card number is valid', async () => {
    expect(service.testCreditCard('3530 111333300000', 'JCB'))
      .toEqual({isValid: true, message: 'Credit card has a valid format'});
  });
});
