Stored Procedures with JSON:
===========================

1. Introduction to JSON Types in PostgreSQL:
	In PostgreSQL, there are two primary JSON types: json and jsonb:

	json: Stores JSON data as plain text. It validates JSON data but does not enforce a specific order for object keys.

	jsonb: Stores JSON data in a binary format, offering better performance. It also enforces a specific order for object keys.
		
	Use json When:
		The exact text representation of JSON data is important.
		Storage space is not a primary concern.
		You need to preserve the original formatting and whitespace of the JSON data.
		
	Use jsonb When:
		Space efficiency and faster querying are critical.
		You want to take advantage of efficient indexing for JSON data.
		You have large datasets with frequent queries and updates.
		In many cases, jsonb is preferred due to its better performance characteristics and more efficient storage. However, if the exact text representation of JSON data is crucial or space efficiency is not a primary concern, then json might be more suitable.

2. Creating Tables with JSON Columns:
	You can create tables with JSON columns:
	
		CREATE TABLE your_table (
		id SERIAL PRIMARY KEY,
		data jsonb --it can also work in json  the ->> arrow notation works if column is in jsonb
		);
		
3. Inserting JSON Data:
	You can insert JSON data into tables:
		3.1 INSERT INTO your_table (data)
				VALUES ('{"name": "John", "age": 30}');
			
		3.2	INSERT INTO your_table (data)
				VALUES ('{
				"BucketName" : "Amazon",
				"S3Environment" : "Local"			
				}');
			
4. Querying JSON Data:
	Accessing JSON Fields:
		4.1 SELECT data->>'name' AS name, data->>'age' AS age FROM your_table;
		4.2 SELECT data->>'BucketName' AS name FROM your_table ;
		
		
		Note : data ->> this arrow mark notation works only if the column is of type JSON / JSONB

	Filtering by JSON Field:
		SELECT data->'address'->>'city' AS city FROM your_table;
		
	Querying Nested JSON:
		SELECT data->'address'->>'city' AS city FROM your_table;
		
5. Modifying JSON Data:

	Updating JSON Fields:
		UPDATE your_table SET data = data || '{"status": "active"}'::jsonb WHERE id = 1;
		
	Adding JSON Fields:
		UPDATE your_table SET data = data || '{"country": "USA"}'::jsonb WHERE id = 1;
		
6. Aggregating JSON Data:
	Aggregating JSON Arrays:
		SELECT jsonb_agg(data) AS all_data FROM your_table;
		
7. Removing JSON Data:
	Deleting JSON Fields:
		UPDATE your_table SET data = data - 'age' WHERE id = 1;

8. Indexing JSON Data:
	Indexing JSONB Data:

		CREATE INDEX idx_data ON your_table USING gin(data);

9. Functions for JSON Manipulation:
	jsonb_pretty: Formats JSON for readability.
		SELECT jsonb_pretty(data) FROM your_table;
		
	jsonb_strip_nulls: Removes null values from JSON.
		SELECT jsonb_strip_nulls(data) FROM your_table;
		
	jsonb_array_elements: Expands a JSON array into a set of rows.
		SELECT jsonb_array_elements(data->'hobbies') AS hobby FROM your_table;
		
10. Handling JSON in PL/pgSQL:
	You can work with JSON data in PL/pgSQL functions and stored procedures:
	
		CREATE OR REPLACE FUNCTION get_json_field(json_data jsonb, field_name text)
		RETURNS text AS $$
		DECLARE
			field_value text;
		BEGIN
			SELECT json_data->>field_name INTO field_value;
			RETURN field_value;
		END;
		$$ LANGUAGE plpgsql;

================================================================================================

Accessing and iterating List of Json Values:
--------------------------------------------

1. A way for iterating the Json Array in postgres using "json_array_elements":

	json_array_elements is a PostgreSQL function used to expand a JSON array into a set of individual elements.
	
		SELECT json_array_elements('[{ "type": false }, { "type": "photo" }, {"type": "comment" }]'::json) ;
		
		o/p: 
			{ "type": false }
			{ "type": "photo"}
			{"type": "comment"}
		
	An example : 
		DO
		$BODY$
		DECLARE
			omgjson json := '[{ "type": false }, { "type": "photo" }, {"type": "comment" }]';
			i json;
		BEGIN
		  FOR i IN SELECT * FROM json_array_elements(omgjson)
		  LOOP
			RAISE NOTICE 'output from space %', i->>'type';
		  END LOOP;
		END;
		$BODY$ language plpgsql
		
		
		o/p : 
			NOTICE:  output from space false
			NOTICE:  output from space photo
			NOTICE:  output from space comment
			
			
Json Array Functions:
--------------------
		These functions and operators provide flexibility when working with JSON arrays, allowing you to extract elements, get their lengths, and iterate through 
	them in various ways. 

	1. 	json_array_length and jsonb_array_length Functions:
	
		Returns the number of elements in a JSON array.
		
			SELECT json_array_length('[1, 2, 3]'::json);
				-- Results in: 3
				
			SELECT jsonb_array_length( '[]'::jsonb ); output is 0
			
		To see if it is empty,
			SELECT jsonb_array_length( '[]'::jsonb ) = 0;
			
		Warning, this just counts those elements, they may be null,
			SELECT jsonb_array_length( '[null]'::jsonb ); output is 1
				
				
	2. json_array_elements_text Function:

		Similar to json_array_elements, but it returns the elements as text.	
			SELECT json_array_elements_text('["apple", "orange", "banana"]'::json);
				-- Results in:
				-- apple
				-- orange
				-- banana
				
				
	3. "->" Operator with Index:
	
		Use the -> operator with an index to extract a specific element from a JSON array.
			SELECT '["apple", "orange", "banana"]'::json->1;
				-- Results in: "orange"
				
	4. jsonb_array_elements and jsonb_array_elements_text for jsonb Type:

		Similar to their json counterparts but specifically designed for the jsonb data TYPE
			SELECT jsonb_array_elements('[1, 2, 3]'::jsonb);
				-- Results in:
				-- 1
				-- 2
				-- 3
				
	5. jsonb_array_elements_text for jsonb Type:

		Similar to json_array_elements_text but for the jsonb data type.
			SELECT jsonb_array_elements_text('["apple", "orange", "banana"]'::jsonb);
				-- Results in:
				-- apple
				-- orange
				-- banana
	
	6. json_array_elements with LATERAL Keyword:

		Use LATERAL to reference columns from the left side within the right side, allowing you to work with JSON arrays in a more dynamic way.
		
			SELECT id, json_element
			FROM your_table
			CROSS JOIN LATERAL json_array_elements(your_column) AS json_element;

	7. To convert JSON value to record and record to json in Postgres:

		1. JSON value to record : 
		
			SELECT * FROM jsonb_to_recordset('[
				{"name": "John", "age": 30, "city": "New York"},
				{"name": "Alice", "age": 25, "city": "London"}
			]'::jsonb)
			AS (name VARCHAR, age INTEGER, city VARCHAR);

			SELECT * FROM json_to_recordset('[
				{"name": "John", "age": 30, "city": "New York"},
				{"name": "Alice", "age": 25, "city": "London"}
			]'::json)
			AS (name VARCHAR, age INTEGER, city VARCHAR);

		you can use the jsonb_to_recordset function to convert JSON data into a set of records. 
		This function is handy when dealing with JSONB or JSON data that needs to be transformed into a more tabular format. 

		2. row to JSON:
			the row_to_json function is used to convert a row (or a set of rows) into a JSON object.
				
				Assuming you have a table named example_table with columns id, name, age, and city:
				
				CREATE TABLE example_table (
				id SERIAL PRIMARY KEY,
				name VARCHAR,
				age INTEGER,
				city VARCHAR
				);

			INSERT INTO example_table (name, age, city) VALUES
				('John', 30, 'New York'),
				('Alice', 25, 'London');
			
			Now, you can use row_to_json to convert a row into a JSON object:
			
			SELECT row_to_json(example_table) AS json_data
				FROM example_table
				WHERE id = 1;
			
			In this example, row_to_json(example_table) converts the selected row into a JSON object, and the result will be something like:
				{
				  "id": 1,
				  "name": "John",
				  "age": 30,
				  "city": "New York"
				}
			
			SELECT json_agg(row_to_json(example_table)) AS json_array
			FROM example_table;
			
			Note : In this case, json_agg is used to aggregate the JSON objects into a JSON array.
			
	8. jsonb_build_object / json_build_object: 
	
			These functions are used to build a JSON object. You can specify key-value pairs as arguments.
				SELECT jsonb_build_object('name', 'John', 'age', 30) AS person;
				
	9. jsonb_object_agg / json_object_agg: 
	
			These functions aggregate values into a JSON object. It is often used with grouping.
				SELECT jsonb_object_agg(city, population) AS city_population FROM cities;

	10. jsonb_each / json_each:
	
			These functions expand a JSON object into a set of key-value pairs.			
				SELECT jsonb_each('{"name": "John", "age": 30}'::jsonb) AS kv;
			
	11. jsonb_typeof / json_typeof: 
	
			These functions return the type of a JSON value.
				SELECT jsonb_typeof('{"key": "value"}'::jsonb) AS type;
	
	12. jsonb_strip_nulls / json_strip_nulls: 
			These functions remove all null values from a JSON object.
				SELECT jsonb_strip_nulls('{"name": "John", "age": null}'::jsonb) AS cleaned_json;

=================================================


In PostgreSQL, -> and ->> are operators used for extracting values from JSON objects.

	CREATE OR REPLACE FUNCTION display_json_records(input_json jsonb) RETURNS TABLE (
		name text,
		age integer,
		is_active boolean
	) AS $$
	BEGIN
		-- Use a CTE to expand the JSON array into rows
		WITH json_cte AS (
			SELECT
				(jsonb_array_elements(input_json->'people')->>'name')::text AS name, -- note there is -> and ->>  there is a diff to it  -> represents key and ->> represents value
				(jsonb_array_elements(input_json->'people')->>'age')::integer AS age,
				(jsonb_array_elements(input_json->'people')->>'is_active')::boolean AS is_active
		)
		
		-- Display the records from the CTE
		SELECT * FROM json_cte;

	END;
	$$ LANGUAGE plpgsql;


-> (Arrow Operator):

	It extracts the value of a specified key as JSON. The result is of type json or jsonb, depending on the JSON type.
	Example: input_json->'people' would extract the value associated with the key 'people' as JSON.
	
->> (Arrow-Double Greater-Than Operator):

	It extracts the value of a specified key as text.
	Example: input_json->>'people' would extract the value associated with the key 'people' as text.
	So, in the given example:


	(jsonb_array_elements(input_json->'people')->>'name')::text AS name,
	
	input_json->'people' extracts the value associated with the key 'people' as JSON.
	jsonb_array_elements(...) is then used to treat that value as a JSON array and expand it into rows.
	->>'name' extracts the value of the key 'name' from each element of the JSON array as text.
	
	In summary, -> extracts values as JSON, while ->> extracts values as text.
				


			






					
			
