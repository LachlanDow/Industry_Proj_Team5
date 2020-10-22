const { cryptPin } = require("../generateID");

test('should be defined', () => {
    expect(cryptPin).toBeDefined()

})

test('ids are 6 chars long', () => {
    expect(cryptPin()).toHaveLength(6)
})