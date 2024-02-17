What Is Jest?
============
	Jest is a popular test framework for JavaScript. It claims to provide “delightful JavaScript testing” and, after our tutorial, I bet you might agree with this  claim! Jest prides itself in offering a complete and hassle-free experience.

Advantages of Jest:
==================

	Offers a CLI tool to control your tests easily.
	Comes with an interactive mode that automatically runs all affected tests for the code changes you’ve made in your last commit.
	Provides syntax to test a single test or skip tests with .only and .skip. This feature is useful when debugging individual tests.
	Brings easy mocking to developers as it’s one of the most painful things to do for testing engineers. We explain further in this post how Jest mocking works
	Jest offers code coverage out of the box through its CLI—just use the –coverage option or the collectCoverage property in the Jest configuration file.
	
Jest Characteristics:
====================

	Zero config:
		“Jest aims to work out of the box, config free, on most JavaScript projects.” This means you can simply install Jest as a dependency for your project, and with no or minimal adjustments, you can start writing your first test.
	Isolated: 
		Isolation is a very important property when running tests. It ensures that different tests don’t influence each other’s results. For Jest, tests are executed in parallel, each running in their own process. This means they can’t interfere with other tests, and Jest acts as the orchestrator that collects the results from all the test processes.
	Snapshots: 
		Snapshots are a key feature for front-end testing because they allow you to verify the integrity of large objects. This means you don’t have to write large tests full of assertions to check if every property is present on an object and has the right type. You can simply create a snapshot and Jest will do the magic. Later, we’ll discuss in detail how snapshot testing works.
	Rich API:
		Jest is known for having a rich API offering a lot of specific assertion types for very specific needs. Besides that, its great documentation should help you get started quickly.

1. Install Jest Globally:
   ---------------------
	npm install -g jest
	
2. Create a Sample Project:
   -----------------------
	Start by creating a folder and accessing it:
		mkdir learning-jest
		cd learning-jest
		
	Then, run npm init -y to create a project. As a result, you should have a package.json file inside your folder, with this content:

		{
		  "name": "learning-jest",
		  "version": "1.0.0",
		  "description": "",
		  "main": "index.js",
		  "scripts": {
			"test": "echo \"Error: no test specified\" && exit 1"
		  },
		  "keywords": [],
		  "author": "",
		  "license": "ISC"
		}
	
3. 	Add Jest to the Project:
	------------------------
	You’ll now add Jest as a dev dependency to the project. Run the following command:

	npm install --save-dev jest
	
	Then, go to your package.json file and change this part:

		"scripts": {
			"test": "echo \"Error: no test specified\" && exit 1"
		  },
	To this:

		"scripts": {
			"test": "jest"
		  },

4. Create a simple function:
   ------------------------

	// mathFunctions.js

	function add(a, b) {
	  return a + b;
	}

	module.exports = { add };
	
5. Jest test case for this function:
   ---------------------------------
   //Syntax:
   
	describe('group description', () => {
	  // Test cases go here
	  test('test case 1', () => {
		// Test logic
	  });

	  test('test case 2', () => {
		// Test logic
	  });

	  // Add more test cases as needed
	});

   -------------------------------------
   
   // mathFunctions.test.js

	const { add } = require('./mathFunctions');

	// Test case using Jest
	describe('add function', () => {
	  test('adds 1 + 2 to equal 3', () => {
		expect(add(1, 2)).toBe(3);
	  });

	  test('adds -1 + 1 to equal 0', () => {
		expect(add(-1, 1)).toBe(0);
	  });

	  test('adds 0 + 0 to equal 0', () => {
		expect(add(0, 0)).toBe(0);
	  });

	  test('adds negative numbers', () => {
		expect(add(-5, -10)).toBe(-15);
	  });

	  // Add more test cases as needed
	});
	
	In this example:

		The describe function is used to group related test cases under the same category (in this case, the 'add function').
		The test function is used to define individual test cases.
		The expect function is used to make assertions about the code being tested.
		The toBe matcher checks if the result of the add function matches the expected value.
		To run the tests, you can use the jest command in your terminal. Jest will discover and execute all test files that match the pattern *.test.js or *.spec.js. Make sure to install Jest in your project by running npm install --save-dev jest if you haven't already.

		Remember to adapt the test cases based on the functions and logic you want to test in your own application.
	
	In Jest, describe is a function used to group together related test cases. It helps in organizing and structuring your test suites by creating a block of tests under a common heading. The primary purpose of describe is to improve the readability and maintainability of your test code.

	Here's a brief explanation of how describe works:
	------------------------------------------------
	
	describe('group description', () => {
	  // Test cases go here
	  test('test case 1', () => {
		// Test logic
	  });

	  test('test case 2', () => {
		// Test logic
	  });

	  // Add more test cases as needed
	});
	
	The first argument to describe is a string that describes the group of test cases. It is typically a brief summary of what the tests in this block are intended to cover.

	The second argument is a callback function where you place your individual test cases using the test function.

	By using describe, you can create a hierarchy of test suites, making it easier to understand the structure of your tests and locate specific tests when reviewing or debugging.

--------------------------------------------------------------------------------------------

Example 2:
==========
filename : fixxbuzz.js
		   -----------

	function fizz_buzz(numbers) {
		let result = []
		
		for (number of numbers) {
			if (number % 15 === 0) {
				result.push('fizzbuzz')
			} else if (number % 3 === 0) {
				result.push('fizz')
			} else if (number % 5 === 0) {
				result.push('buzz')
			} else {
				result.push(number)
			}
		}		
		return result.join(', ')
	}

	module.exports = fizz_buzz;

TestCase file Name: fizzbuzz.test.js
					----------------
	const fizz_buzz = require('./index');

	describe("FizzBuzz", () => {
		test('[3] should result in "fizz"', () => {
		  expect(fizz_buzz([3])).toBe('fizz');
		});

		test('[5] should result in "buzz"', () => {
		  expect(fizz_buzz([5])).toBe('buzz');
		});

		test('[15] should result in "fizzbuzz"', () => {
		  expect(fizz_buzz([15])).toBe('fizzbuzz');
		});

		test('[1,2,3] should result in "1, 2, fizz"', () => {
		  expect(fizz_buzz([3])).toBe('fizz');
		});

	});

	We’ll explain Jest’s syntax in more detail later. For now, understand we’re verifying that:

	passing an array containing 3 should result in “fizz”
	an array containing 5 should result in “buzz”
	an array containing 15 should result in “fizzbuzz”
	passing an array with 1, 2, and 3 should result in “1, 2, fizz”
	
===============================================================================================================

Matchers:
=========
Jest uses "matchers" to let you test values in different ways.
This document will introduce some commonly used matchers. For the full list, see the expect API doc.

Common Matchers:
---------------
	The simplest way to test a value is with exact equality.

		test('two plus two is four', () => {
		  expect(2 + 2).toBe(4);
		});


	In this code, expect(2 + 2) returns an "expectation" object. You typically won't do much with these expectation objects except call matchers on them. In this code, .toBe(4) is the matcher. When Jest runs, it tracks all the failing matchers so that it can print out nice error messages for you.

	toBe uses Object.is to test exact equality. If you want to check the value of an object, use toEqual:

		test('object assignment', () => {
		  const data = {one: 1};
		  data['two'] = 2;
		  expect(data).toEqual({one: 1, two: 2});
		});

	toEqual recursively checks every field of an object or array.


Note:
----
	toEqual ignores object keys with undefined properties, undefined array items, array sparseness, or object type mismatch. To take these into account use toStrictEqual instead.
	
You can also test for the opposite of a matcher using not:

	test('adding positive numbers is not zero', () => {
	  for (let a = 1; a < 10; a++) {
		for (let b = 1; b < 10; b++) {
		  expect(a + b).not.toBe(0);
		}
	  }
	});
			
Truthiness:
-----------
In tests, you sometimes need to distinguish between undefined, null, and false, but you sometimes do not want to treat these differently. Jest contains helpers that let you be explicit about what you want.

	toBeNull matches only null
	toBeUndefined matches only undefined
	toBeDefined is the opposite of toBeUndefined
	toBeTruthy matches anything that an if statement treats as true
	toBeFalsy matches anything that an if statement treats as false
	For example:

	test('null', () => {
	  const n = null;
	  expect(n).toBeNull();
	  expect(n).toBeDefined();
	  expect(n).not.toBeUndefined();
	  expect(n).not.toBeTruthy();
	  expect(n).toBeFalsy();
	});

	test('zero', () => {
	  const z = 0;
	  expect(z).not.toBeNull();
	  expect(z).toBeDefined();
	  expect(z).not.toBeUndefined();
	  expect(z).not.toBeTruthy();
	  expect(z).toBeFalsy();
	});

You should use the matcher that most precisely corresponds to what you want your code to be doing.			
-----------------------
Numbers:
-------
Most ways of comparing numbers have matcher equivalents.

	test('two plus two', () => {
	  const value = 2 + 2;
	  expect(value).toBeGreaterThan(3);
	  expect(value).toBeGreaterThanOrEqual(3.5);
	  expect(value).toBeLessThan(5);
	  expect(value).toBeLessThanOrEqual(4.5);

	  // toBe and toEqual are equivalent for numbers
	  expect(value).toBe(4);
	  expect(value).toEqual(4);
	});

For floating point equality, use toBeCloseTo instead of toEqual, because you don't want a test to depend on a tiny rounding error.

	test('adding floating point numbers', () => {
	  const value = 0.1 + 0.2;
	  //expect(value).toBe(0.3);           This won't work because of rounding error
	  expect(value).toBeCloseTo(0.3); // This works.
	});
---------------------------------

Strings:
-------
	You can check strings against regular expressions with toMatch:

	test('there is no I in team', () => {
	  expect('team').not.toMatch(/I/);
	});

	test('but there is a "stop" in Christoph', () => {
	  expect('Christoph').toMatch(/stop/);
	});
	
---------------------------------
Arrays and iterables:
---------------------
You can check if an array or iterable contains a particular item using toContain:

	const shoppingList = [
	  'diapers',
	  'kleenex',
	  'trash bags',
	  'paper towels',
	  'milk',
	];

	test('the shopping list has milk on it', () => {
	  expect(shoppingList).toContain('milk');
	  expect(new Set(shoppingList)).toContain('milk');
	});

Exceptions:
----------
If you want to test whether a particular function throws an error when it's called, use toThrow.

	function compileAndroidCode() {
	  throw new Error('you are using the wrong JDK!');
	}

	test('compiling android goes as expected', () => {
	  expect(() => compileAndroidCode()).toThrow();
	  expect(() => compileAndroidCode()).toThrow(Error);

	  // You can also use a string that must be contained in the error message or a regexp
	  expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
	  expect(() => compileAndroidCode()).toThrow(/JDK/);

	  // Or you can match an exact error message using a regexp like below
	  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK$/); // Test fails
	  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK!$/); // Test pass
	});

TIP:
---
The function that throws an exception needs to be invoked within a wrapping function otherwise the toThrow assertion will fail.
===============================================================================================================================================

SETUP AND TEAR-DOWN IN JEST:
---------------------------
In Jest, setup and teardown can be achieved using beforeAll, beforeEach, afterAll, and afterEach functions. These functions help you set up and tear down the testing environment before and after your tests or test suites.

Here's a basic overview:

	beforeAll and afterAll:
	----------------------
	These functions allow you to run setup and teardown code once for the entire test suite.

		beforeAll(() => {
		  // Setup code - runs once before all tests in the suite
		  console.log('Before all tests');
		});

		afterAll(() => {
		  // Teardown code - runs once after all tests in the suite
		  console.log('After all tests');
		});

	beforeEach and afterEach:
	------------------------
	These functions allow you to run setup and teardown code before and after each test in the suite.
		beforeEach(() => {
		  // Setup code - runs before each test
		  console.log('Before each test');
		});

		afterEach(() => {
		  // Teardown code - runs after each test
		  console.log('After each test');
		});

Example:
Let's say you have a simple function to add two numbers:

	function add(a, b) {
	  return a + b;
	}

And you want to test it using Jest with setup and teardown:
		
	// Import the function to test
	const { add } = require('./math'); // Replace with your actual module path

	// Setup and teardown for the entire test suite
	beforeAll(() => {
	  console.log('Setting up the test suite');
	});

	afterAll(() => {
	  console.log('Tearing down the test suite');
	});

	// Setup and teardown for each test
	beforeEach(() => {
	  console.log('Setting up for a test');
	});

	afterEach(() => {
	  console.log('Tearing down after a test');
	});

	// Test cases
	test('adds 1 + 2 to equal 3', () => {
	  expect(add(1, 2)).toBe(3);
	});

	test('adds 5 + 5 to equal 10', () => {
	  expect(add(5, 5)).toBe(10);
	});

	In this example, you can observe how the setup and teardown functions are used. The beforeAll and afterAll functions run once for the entire test suite, while beforeEach and afterEach run before and after each individual test.

	These functions can be useful for tasks like setting up test data, connecting to databases, mocking resources, etc. Adjust the setup and teardown code based on your specific testing needs.


