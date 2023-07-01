class NumberGenerator {
    static generatePhoneNumbers() {
        const phoneNumbers = [];
        for (let i = 0; i < 1000; i++) {
          const phoneNumber = this.generatePhoneNumber();
          phoneNumbers.push(phoneNumber);
        }
        return phoneNumbers;
      }

      static generatePhoneNumber() {
        const areaCode = '+852'; // Hong Kong's country code
        const number = Math.floor(Math.random() * 90000000) + 10000000; // Random 8-digit number
        return areaCode + number;
      }
}

export default NumberGenerator