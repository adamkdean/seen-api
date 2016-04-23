# api

Build using Babel/ES6-infused Hapi, tested using gulp/mocha/chai.

## Test results

I have no CI setup so I'll just paste the results from the lab. Doctor says we're all clear.

    > gulp test

    [00:25:13] Using gulpfile ~/Bitbucket/seenproject/api/gulpfile.js
    [00:25:13] Starting 'clean'...
    [00:25:13] Finished 'clean' after 3.05 ms
    [00:25:13] Starting 'transpile'...
    [00:25:14] Finished 'transpile' after 670 ms
    [00:25:14] Starting 'test'...


      GET /
        ✓ should return http 200
        ✓ should return status OK in JSON

      GET /films
        ✓ should return http 200
        ✓ should return an array
        ✓ should contain objects with property slug
        ✓ should contain objects with property title
        ✓ should contain objects with property director
        ✓ should contain objects with property score
        ✓ should contain objects with property overview
        ✓ should contain objects with property poster_path
        ✓ should contain objects with property length

      GET /films?when=last_week
        ✓ should return http 200
        ✓ should return an array
        ✓ should contain objects with property slug
        ✓ should contain objects with property title
        ✓ should contain objects with property director
        ✓ should contain objects with property score
        ✓ should contain objects with property overview
        ✓ should contain objects with property poster_path
        ✓ should contain objects with property length

      GET /films?when=last_month
        ✓ should return http 200
        ✓ should return an array
        ✓ should contain objects with property slug
        ✓ should contain objects with property title
        ✓ should contain objects with property director
        ✓ should contain objects with property score
        ✓ should contain objects with property overview
        ✓ should contain objects with property poster_path
        ✓ should contain objects with property length

      GET /films?when=last_year
        ✓ should return http 200
        ✓ should return an array
        ✓ should contain objects with property slug
        ✓ should contain objects with property title
        ✓ should contain objects with property director
        ✓ should contain objects with property score
        ✓ should contain objects with property overview
        ✓ should contain objects with property poster_path
        ✓ should contain objects with property length

      GET /films?when=all_time
        ✓ should return http 200
        ✓ should return an array
        ✓ should contain objects with property slug
        ✓ should contain objects with property title
        ✓ should contain objects with property director
        ✓ should contain objects with property score
        ✓ should contain objects with property overview
        ✓ should contain objects with property poster_path
        ✓ should contain objects with property length

      GET /film/interstellar
        ✓ should return http 200
        ✓ should return an object
        ✓ should have property slug
        ✓ should have property title
        ✓ should have property director
        ✓ should have property score
        ✓ should have property overview
        ✓ should have property poster_path
        ✓ should have property length

      GET /reviews
        ✓ should return http 200
        ✓ should return an array
        ✓ should contain objects with property id
        ✓ should contain objects with property film_slug
        ✓ should contain objects with property film_title
        ✓ should contain objects with property poster_path
        ✓ should contain objects with property author
        ✓ should contain objects with property content
        ✓ should contain objects with property summary

      GET /reviews?when=last_week
        ✓ should return http 200
        ✓ should return an array
        ✓ should contain objects with property id
        ✓ should contain objects with property film_slug
        ✓ should contain objects with property film_title
        ✓ should contain objects with property poster_path
        ✓ should contain objects with property author
        ✓ should contain objects with property content
        ✓ should contain objects with property summary

      GET /reviews?when=last_month
        ✓ should return http 200
        ✓ should return an array
        ✓ should contain objects with property id
        ✓ should contain objects with property film_slug
        ✓ should contain objects with property film_title
        ✓ should contain objects with property poster_path
        ✓ should contain objects with property author
        ✓ should contain objects with property content
        ✓ should contain objects with property summary

      GET /reviews?when=last_year
        ✓ should return http 200
        ✓ should return an array
        ✓ should contain objects with property id
        ✓ should contain objects with property film_slug
        ✓ should contain objects with property film_title
        ✓ should contain objects with property poster_path
        ✓ should contain objects with property author
        ✓ should contain objects with property content
        ✓ should contain objects with property summary

      GET /reviews?when=all_time
        ✓ should return http 200
        ✓ should return an array
        ✓ should contain objects with property id
        ✓ should contain objects with property film_slug
        ✓ should contain objects with property film_title
        ✓ should contain objects with property poster_path
        ✓ should contain objects with property author
        ✓ should contain objects with property content
        ✓ should contain objects with property summary

      GET /reviews/interstellar
        ✓ should return http 200
        ✓ should return an array
        ✓ should have property id
        ✓ should have property film_slug
        ✓ should have property film_title
        ✓ should have property poster_path
        ✓ should have property author
        ✓ should have property content
        ✓ should have property summary


      110 passing (2s)

    [00:25:16] Finished 'test' after 2.78 s
