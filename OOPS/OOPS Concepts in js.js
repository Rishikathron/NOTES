
OOPS in JS:

=>Objects, in JavaScript, are the most important data type and form the building blocks for modern JavaScript. 
=>These objects are quite different from JavaScript’s primitive data types (Number, String, Boolean, null, undefined, and symbol)
	in the sense that these primitive data types all store a single value each (depending on their types).
 
SYNTAX : 
	new Object(value)
	Object(value)
	let object_name = {
		key_name : value,
		...
	}
Note:-
	Object()  can be called with or without new. Both create a new object.
	
var obj = {
    Name : "rishwanth",
    printName : function (){
        console.log(this.Name);
    },
    40 : "Number",
    "Pin Code" : 631003
}

obj.printName();
let prop = 40
console.log(obj[prop])

delete obj[40]
console.log(obj)
-------------------------------	
	
We should know unlike other Object Oriented languages there are no classes in JavaScript we have only Object. 
 To be more precise, JavaScript is a prototype-based Object Oriented Language, which means it doesn’t have classes, 
 rather it defines behaviors using a constructor function and then reuses it using the prototype. 
 
Note: Even the classes provided by ECMA2015 are objects.

// Defining class using es6
	class Vehicle {
		constructor(name, maker, engine) {
			this.name = name;
			this.maker = maker;
			this.engine = engine;
		}
		getDetails() {
			return (`The name of the bike is ${this.name}.`)
		}
	}
	// Making object with the help of the constructor
	let bike1 = new Vehicle('Hayabusa', 'Suzuki', '1340cc');
	let bike2 = new Vehicle('Ninja', 'Kawasaki', '998cc');
	 
	console.log(bike1.name);    // Hayabusa
	console.log(bike2.maker);   // Kawasaki
	console.log(bike1.getDetails());

-----------------------------------------------------
// Defining class in a Traditional Way.
	function Vehicle(name, maker, engine) {
		this.name = name,
		this.maker = maker,
		this.engine = engine
	};

	Vehicle.prototype.getDetails = function () {
		console.log('The name of the bike is ' + this.name);
	}

	let bike1 = new Vehicle('Hayabusa', 'Suzuki', '1340cc');
	let bike2 = new Vehicle('Ninja', 'Kawasaki', '998cc');

	console.log(bike1.name);
	console.log(bike2.maker);
	console.log(bike1.getDetails());

--------------------------
Abstraction: Abstraction means displaying only essential information and hiding the details. 
	Data abstraction refers to providing only essential information about the data to the outside world, 
	hiding the background details or implementation. 


example for Abstraction: 

	function person(fname, lname) {
		let firstname = fname;
		let lastname = lname;

		// Local variable, not accessible outside the constructor
		let getDetails_noaccess = function () {
			return (`First name is: ${firstname} Last name is: ${lastname}`);
		}

		// Accessible as a property of the object created by the constructor
		this.getDetails_access = function () {
			return (`First name is: ${firstname}, Last name is: ${lastname}`);
		}
	}

	let person1 = new person('Mukul', 'Latiyan');

	// Accessing properties of person1
	console.log(person1.firstname); // undefined, as firstname is not a direct property
	console.log(person1.getDetails_noaccess); // undefined, as getDetails_noaccess is not a property

	// Accessing the accessible method
	console.log(person1.getDetails_access());

	Explanation : 
	In the code, firstname and lastname are local variables within the person constructor and are not directly accessible as properties 
		of the person1 object. On the other hand, the getDetails_access method is assigned as a property (this.getDetails_access) and 
		is accessible through person1.getDetails_access().

	If you want to make firstname and lastname accessible as properties, you can modify the constructor to assign them using this:

		function person(fname, lname) {
			this.firstname = fname;
			this.lastname = lname;

			this.getDetails_noaccess = function () {
				return (`First name is: ${this.firstname} Last name is: ${this.lastname}`);
			}
		}

		let person1 = new person('Mukul', 'Latiyan');

		// Now these properties are accessible
		console.log(person1.firstname);
		console.log(person1.getDetails_noaccess());
----------------------------------------------------------
Encapsulation: The process of wrapping properties and functions within a single unit is known as encapsulation.
	// Encapsulation example
	class person {
		constructor(name, id) {
			this.name = name;
			this.id = id;
		}
		this.add_Address(add) {
			this.add = add;
		}
		this.getDetails() {
			console.log(`Name is ${this.name},
			Address is: ${this.add}`);
		}
	}

	let person1 = new person('Mukul', 21);
	person1.add_Address('Delhi');
	person1.getDetails();
	
	In this example, we simply create a person Object using the constructor, Initialize its properties and use its functions. 
	We are not bothered by the implementation details. We are working with an Object’s interface without considering the implementation details. 

---------------------------------------------------------
Inheritance: It is a concept in which some properties and methods of an Object are being used by another Object. 
	Unlike most of the OOP languages where classes inherit classes, JavaScript Objects inherit Objects 
	i.e. certain features (property and methods) of one object can be reused by other Objects. 
	
	// Inheritance example
	class person {
		constructor(name) {
			this.name = name;
		}
		// method to return the string
		toString() {
			return (`Name of person: ${this.name}`);
		}
	}
	class student extends person {
		constructor(name, id) {
			// super keyword for calling the above 
			// class constructor
			super(name);
			this.id = id;
		}
		toString() {
			return (`${super.toString()},
			Student ID: ${this.id}`);
		}
	}
	let student1 = new student('Mukul', 22);
	console.log(student1.toString());

Note: The Person and Student objects both have the same method (i.e toString()), this is called Method Overriding. 
Method Overriding allows a method in a child class to have the same name(polymorphism) and method signature as that of a parent class. 

In the above code, the super keyword is used to refer to the immediate parent class’s instance variable. 
----------------------------------------------------------------------------------------
Polymorphism: 
	Polymorphism is one of the core concepts of object-oriented programming languages. 
	poly means many and morphism means transforming one form into another.
	Polymorphism means the same function with different signatures is called many times. In real life, 
		for example, a boy at the same time may be a student, a class monitor, etc. So a boy can perform different operations at the same time. 
	Polymorphism can be achieved by method overriding and method overloading

example:

	class firstClass {
		add() {
			console.log("First Method")
		}
	}
	class secondClass extends firstClass {
		add() {
			console.log(30 + 40);
		}
	}
	class thirdClass extends secondClass {
		add() {
			console.log("Last Method")
		}
	}
	let ob = new firstClass();
	let ob2 = new secondClass();
	let ob3 = new thirdClass();
	ob.add();
	ob2.add();
	ob3.add();
	
output : 
	First Method
	70
	Last Method
	
Explanation:

	The Code above shows how to implement inheritance polymorphism in JavaScript. In this code, we have a class and in this class, 
	we have the “add” method, and we inherit this class in the Second Class. We create different classes with the same method name and different 
		definitions of methods. 
	This example shows us the same method will perform different operations depending on the object upon which it is called.
	
Polymorphism with Functions and Objects:

	class A {
		area(x, y) {
			console.log(x * y);
		}
	}
	class B extends A {
		area(a, b) {
			super.area(a, b);
			console.log('Class B')
		}
	}
	let ob = new B();
	let output = ob.area(100, 200);

Output:

	20000
	Class B


----------------------------------------------------  JavaScript Objects  ---------------------------------------------------------------
Creating Objects:

In JavaScript, Objects can be created using two different methodologies namely Literal Form and Constructed Form.

Literal Form: 
	The literal form uses the construction of object literals that can be said as a collection of key-value pairs enclosed 
		within a pair of curly braces. The syntaxial form is shown below.
	
	let obj = {
		key1: value1,
		key2: value2,
		...
	};

Constructed Form: 
The Constructed form uses either an object constructor function or the new keyword to create an empty object ad then adds properties to the object 
one by one. 
The syntaxial forms are shown below.

	Object Constructor Function: 
		In this methodology, the user creates an explicit function to take required values as parameters and assign them as the properties 
			of the desired object.
			
		function obj(value1, value2, ...) {
			this.key1 = value1;
			this.key2 = value2;
			...
		}
	Using New Keyword: 
		This methodology uses the New keyword in front of any constructor method or any built-in constructor method 
			( such as Object, Date, String, etc) and creates a new instance of the following object by mounting it on memory.
		let obj = new Object();
		obj.key1 = value1;
		obj.key2 = value2;
		...
		
Differences between using Object Literals and the Constructed Form:
	Both the constructed form and literal form result in creating exactly the same sort of object 
		i.e. the end result is the same for both methodologies. 
	The only difference between the both is that object literals can take care of several key-value pairs at once and thus is more convenient 
		while on the other hand with the constructed-form objects, we must add the properties one-by-one in separate statements. 

Note: It is highly uncommon to use the Constructed Form over the Object Literals for creating objects, hence for any further illustrations we
 will be using the object literals on most occasions.
 
Important Points:

	Date values can only be created with their constructed object form, as they have no literal form.
	Objects, Arrays, Functions, and RegExps (regular expressions) are all objects regardless of their creation methodologies 
		i.e. whether the literal or constructed form was used to create them.
	The constructed form may offer more customization while creating an object, this is the sole advantage over using the literal form.

Creating objects in JavaScript (4 Different Ways):
	Creating object with a constructor
	Using object literals
	Creating object with Object.create() method
	Using es6 classes
--------------------------------------------------------------------------------------------------------------------
JavaScript Object Methods: JavaScript methods are actions that can be performed on objects. 

	Static Methods: If the method is called using the Object class itself then it is called a static method of Object.
		example : 
			Object.create();
			Object.keys(obj);
			Object.values(obj);
	Instance Methods: If the method is called on an instance of a date object then it is called an instance method.
		example : 
			object.hasOwnProperty( prop );
			obj.propertyIsEnumerable(prop)
--------------------------------------------------------------------------------------------------------------------
Difference between Methods and Functions in JavaScript:

A function is a block of code written to perform some specific set of tasks. We can define a function using the function keyword, followed by Name and optional parameters.
 The body of the function is enclosed in Curly braces.

	Syntax: 
	function functionName(parameters) {
		// Content
	}
	
	example:
		function func(a, b) {
			let sum = a + b;
			return sum;
		}
		console.log(func(1, 2));
		
JavaScript Methods:

	A JavaScript method is a property of an object that contains a function definition. 
	Methods are functions stored as object properties. Object method can be accessed with the following syntax:
	Syntax : 
	object = {
		methodName: function() {
			// Content
		}
	};
	object.methodName()
	
	
Function

Method

A JavaScript function is a block of code designed to perform a particular task.	The javascript method is an object property that has a function value.
Syntax of Function is:

	function functionName(parameters) {
	   // Content
	}

Syntax of Method is:

	object = {
	   methodName: function() {
		   // Content
	   }
	};


												Difference Between Function and Method
			Function 																				Method

A JavaScript function is a block of code designed to perform a 				The javascript method is an object property that has a function value.
	particular task.
A function can pass the data that is operated and may return the data. 		The method operates the data contained in a Class.
Data passed to a function is explicit.										A method implicitly passes the object on which it was called.
A function lives on its own.												A method is a function associated with an object property.
A function can be called directly by its name	 							A method consists of a code that can be called by the name of its object and its
																				method name using dot notation or square bracket notation.
Functions are helpful because it increases the reusability of the code.		Javascript includes some in-built methods also for example: parseInt() Method
The () Operator is used to Invoke the Function								We can access object method by the following the syntax:
																			objectName.methodName()
----------------------------------------------------------------------------------------------------------------------------------------------------
Difference between Regular functions and Arrow functions:
	
	
	Arrow functions – a new feature introduced in ES6 – enable writing concise functions in JavaScript. 
	While both regular and arrow functions work in a similar manner, there are certain interesting differences between them, as discussed below.
	
	Syntax: Regular function.

		let x = function function_name(parameters){
		   // body of the function
		};
	Example: In this example, we will use a regular function.
		
		let square = function(x){
			return (x*x);
		};
		console.log(square(9));
		
	 Syntax: Arrow function.

		let x = (parameters) => {
			// body of the function
		};
	Example: In this example, we will use an arrow function.

		var square = (x) => {
			return (x*x);
		};
		console.log(square(9));
		
	Use of this keyword: Unlike regular functions, arrow functions do not have their own this. 

		Example: In this example, we will try to use this keyword with the arrow functions.

			let user = {
				name: "GFG",
				gfg1:() => {
					console.log("hello " + this.name); // no 'this' binding here
				},
				gfg2(){ 
					console.log("Welcome to " + this.name); // 'this' binding works here
				}
			};
			user.gfg1();
			user.gfg2();
			
			
Availability of arguments objects: 
	Arguments objects are not available in arrow functions, but are available in regular functions. Example using regular (): 
		let user = {    
			show(){
				console.log(arguments);
			}
		};
		user.show(1, 2, 3);
		Output:  will provide an object and it has a property Arguments and has 1,2,3 values inside it
		
	Example using arrow():
	  let user = {    
				show_ar : () => {
				console.log(...arguments);
			}
		};
		user.show_ar(1, 2, 3);
		
		Output : Referance Error  : Aruguments is not defined.
		

Using new keyword: Regular functions created using function declarations or expressions are ‘constructible’ and ‘callable’. 
Since regular functions are constructible, they can be called using the ‘new’ keyword.
However, the arrow functions are only ‘callable’ and not constructible. 
Thus, we will get a run-time error on trying to construct a non-constructible arrow function using the new keyword.

-------------------------------------------------------------------------------------------------------------
	

			
	