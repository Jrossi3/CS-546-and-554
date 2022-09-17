const arrayUtils = require('./arrayUtils')
const stringUtils = require('./stringUtils')
const objUtils = require('./objUtils')

// Mean Tests
try {
    // Should Pass
    const meanOne = arrayUtils.mean([2, 3, 4]);
    console.log('mean passed successfully');
} catch (e) {
    console.error('mean failed test case');
}
try {
    // Should Fail
    const meanTwo = arrayUtils.mean('[]');
    console.error('mean did not error');
} catch (e) {
    console.log('mean failed successfully');
}

try {
    // Should Pass
    const medianOne = arrayUtils.medianSquared([2, 3, 4]);
    console.log('mean passed successfully');
} catch (e) {
    console.error('mean failed test case');
}
try {
    // Should Fail
    const medianTwo = arrayUtils.medianSquared('[]');
    console.error('mean did not error');
} catch (e) {
    console.log('mean failed successfully');
}

try {
    // Should Pass
    const maxOne = arrayUtils.maxElement([2, 3, 4]);
    console.log('mean passed successfully');
} catch (e) {
    console.error('mean failed test case');
}
try {
    // Should Fail
    const maxTwo = arrayUtils.maxElement('[]');
    console.error('mean did not error');
} catch (e) {
    console.log('mean failed successfully');
}

try {
    // Should Pass
    const fillOne = arrayUtils.fill(6);
    console.log('mean passed successfully');
} catch (e) {
    console.error('mean failed test case');
}
try {
    // Should Fail
    const fillTwo = arrayUtils.fill('6');
    console.error('mean did not error');
} catch (e) {
    console.log('mean failed successfully');
}

try {
    // Should Pass
    const countOne = arrayUtils.countRepeating([2, 3, 4, 4, 4]);
    console.log('mean passed successfully');
} catch (e) {
    console.error('mean failed test case');
}
try {
    // Should Fail
    const countTwo = arrayUtils.countRepeating('[]');
    console.error('mean did not error');
} catch (e) {
    console.log('mean failed successfully');
}

try {
    // Should Pass
    const isEqualOne = arrayUtils.isEqual([2, 3, 4], [1, 2, 3]);
    console.log('mean passed successfully');
} catch (e) {
    console.error('mean failed test case');
}
try {
    // Should Fail
    const isEqualTwo = arrayUtils.isEqual('[]');
    console.error('mean did not error');
} catch (e) {
    console.log('mean failed successfully');
}

try {
    // Should Pass
    const camelOne = stringUtils.camelCase("FOO BAR");
    console.log('mean passed successfully');
} catch (e) {
    console.error('mean failed test case');
}
try {
    // Should Fail
    const camelTwo = stringUtils.camelCase(123);
    console.error('mean did not error');
} catch (e) {
    console.log('mean failed successfully');
}

try {
    // Should Pass
    const replaceOne = stringUtils.replaceChar("Daddy");
    console.log('mean passed successfully');
} catch (e) {
    console.error('mean failed test case');
}
try {
    // Should Fail
    const replaceTwo = stringUtils.replaceChar(123);
    console.error('mean did not error');
} catch (e) {
    console.log('mean failed successfully');
}

try {
    // Should Pass
    const mashOne = stringUtils.mashUp("Patrick", "Hill");
    console.log('mean passed successfully');
} catch (e) {
    console.error('mean failed test case');
}
try {
    // Should Fail
    const mashTwo = stringUtils.mashUp();
    console.error('mean did not error');
} catch (e) {
    console.log('mean failed successfully');
}

try {
    // Should Pass
    const mashOne = objUtils.makeArrays("Patrick", "Hill");
    console.log('mean passed successfully');
} catch (e) {
    console.error('mean failed test case');
}
try {
    // Should Fail
    const mashTwo = objUtils.makeArrays();
    console.error('mean did not error');
} catch (e) {
    console.log('mean failed successfully');
}

try {
    // Should Pass
    const first = {a: 2, b: 3};
    const second = {a: 2, b: 4};
    const mashOne = objUtils.isDeepEqual((first, second));
    console.log('mean passed successfully');
} catch (e) {
    console.error('mean failed test case');
}
try {
    // Should Fail
    const mashTwo = objUtils.isDeepEqual();
    console.error('mean did not error');
} catch (e) {
    console.log('mean failed successfully');
}

try {
    // Should Pass
    const mashOne = objUtils.computeObject({ a: 3, b: 7, c: 5 }, n => n * 2);
    console.log('mean passed successfully');
} catch (e) {
    console.error('mean failed test case');
}
try {
    // Should Fail
    const mashTwo = objUtils.computeObject("");
    console.error('mean did not error');
} catch (e) {
    console.log('mean failed successfully');
}